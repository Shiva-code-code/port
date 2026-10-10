import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Wifi, RefreshCw, Zap } from 'lucide-react';
import styles from './TelemetryWidget.module.css';

export default function TelemetryWidget() {
  const [power, setPower] = useState(2.41);
  const [voltage, setVoltage] = useState(231.2);
  const [pressure, setPressure] = useState(4.85);
  const [packetCount, setPacketCount] = useState(14890);
  const [isSimulatingAnomaly, setIsSimulatingAnomaly] = useState(false);
  const [connectedTime, setConnectedTime] = useState(0);
  const [powerHistory, setPowerHistory] = useState<number[]>([2.38, 2.40, 2.39, 2.42, 2.41, 2.40, 2.43, 2.41, 2.42, 2.41]);

  useEffect(() => {
    const timer = setInterval(() => {
      setConnectedTime((prev) => prev + 1);

      let nextPower = power;
      if (!isSimulatingAnomaly) {
        nextPower = +(2.35 + Math.random() * 0.15).toFixed(2);
        setVoltage(+(230 + (Math.random() * 2.5 - 1.25)).toFixed(1));
        setPressure(+(4.8 + (Math.random() * 0.12 - 0.06)).toFixed(2));
      } else {
        nextPower = +(3.8 + Math.random() * 1.2).toFixed(2);
        setPressure(+(6.4 + (Math.random() * 0.4)).toFixed(2));
      }

      setPower(nextPower);
      setPowerHistory((prev) => [...prev.slice(-12), nextPower]);
      setPacketCount((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(timer);
  }, [isSimulatingAnomaly, power]);

  const toggleAnomaly = () => {
    if (isSimulatingAnomaly) {
      setIsSimulatingAnomaly(false);
      setPower(2.41);
      setPressure(4.85);
      setPowerHistory([2.38, 2.40, 2.39, 2.42, 2.41, 2.40, 2.43, 2.41, 2.42, 2.41]);
    } else {
      setIsSimulatingAnomaly(true);
    }
  };

  // Generate SVG Sparkline coordinates
  const svgWidth = 500;
  const svgHeight = 44;
  const minVal = 2.0;
  const maxVal = isSimulatingAnomaly ? 5.5 : 3.0;

  const points = powerHistory.map((val, idx) => {
    const x = (idx / (powerHistory.length - 1)) * svgWidth;
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const y = svgHeight - ((clamped - minVal) / (maxVal - minVal)) * (svgHeight - 12) - 6;
    return { x, y };
  });

  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x || svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;
  const lastPoint = points[points.length - 1] || { x: svgWidth, y: svgHeight / 2 };

  return (
    <div className={styles.widgetWrapper}>
      <motion.div 
        className={styles.widgetCard}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header bar */}
        <div className={styles.headerBar}>
          <div className={styles.nodeIdentity}>
            <div className={styles.nodeLivePulse} />
            <div>
              <div className={styles.nodeName}>ESP32-EDGE-NODE-01</div>
              <div className={styles.nodeSub}>Dual-Broker Relay &bull; Linux RPi Gateway</div>
            </div>
          </div>

          <div className={styles.statusPills}>
            <div className={styles.securePill}>
              <ShieldCheck size={12} className={styles.shieldIcon} />
              <span>mTLS X.509</span>
            </div>
            <div className={styles.brokerPill}>
              <Wifi size={12} />
              <span>AWS IoT Core</span>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Sparkline Stream */}
        <div className={`${styles.streamChartWrapper} ${isSimulatingAnomaly ? styles.streamChartWrapperAnomaly : ''}`}>
          <div className={styles.streamChartHeader}>
            <div className={styles.streamLiveIndicator}>
              <span className={`${styles.streamPingDot} ${isSimulatingAnomaly ? styles.streamPingDotAlert : ''}`} />
              <span>{isSimulatingAnomaly ? 'ANOMALOUS TELEMETRY SURGE' : 'RS-485 TELEMETRY STREAM (REAL-TIME)'}</span>
            </div>
            <span className={styles.streamFps}>MQTT QoS 1 &bull; {packetCount.toLocaleString()} pkts</span>
          </div>

          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={styles.sparklineSvg} preserveAspectRatio="none">
            <defs>
              <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isSimulatingAnomaly ? '#ef4444' : 'var(--primary)'} stopOpacity="0.35" />
                <stop offset="100%" stopColor={isSimulatingAnomaly ? '#ef4444' : 'var(--primary)'} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#streamGradient)" />
            <path 
              d={pathD} 
              fill="none" 
              stroke={isSimulatingAnomaly ? '#ef4444' : 'var(--primary)'} 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            {/* Live pulsating dot at latest point */}
            <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={isSimulatingAnomaly ? '#ef4444' : 'var(--primary)'} />
            <circle cx={lastPoint.x} cy={lastPoint.y} r="8" fill={isSimulatingAnomaly ? '#ef4444' : 'var(--primary)'} opacity="0.3" />
          </svg>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className={styles.metricsGrid}>
          {/* Active Power */}
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <Zap size={14} className={styles.metricIconPower} />
              <span className={styles.metricTitle}>Active Power</span>
            </div>
            <div className={styles.metricValue}>
              {power} <span className={styles.metricUnit}>kW</span>
            </div>
            <div className={styles.metricStatus}>
              {isSimulatingAnomaly ? (
                <span className={styles.statusWarning}>⚠️ HIGH DRAW</span>
              ) : (
                <span className={styles.statusNormal}>● Optimal Range</span>
              )}
            </div>
          </div>

          {/* Line Voltage */}
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <Cpu size={14} className={styles.metricIcon} />
              <span className={styles.metricTitle}>Grid Voltage</span>
            </div>
            <div className={styles.metricValue}>
              {voltage} <span className={styles.metricUnit}>VAC</span>
            </div>
            <div className={styles.metricStatus}>
              <span className={styles.statusNormal}>● 50 Hz Synchronized</span>
            </div>
          </div>

          {/* Line Pressure */}
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <Activity size={14} className={styles.metricIcon} />
              <span className={styles.metricTitle}>Line Pressure</span>
            </div>
            <div className={styles.metricValue}>
              {pressure} <span className={styles.metricUnit}>bar</span>
            </div>
            <div className={styles.metricStatus}>
              {isSimulatingAnomaly ? (
                <span className={styles.statusCritical}>🚨 SPIKE DETECTED</span>
              ) : (
                <span className={styles.statusNormal}>● Within Threshold</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Status & Controls */}
        <div className={styles.footerBar}>
          <div className={styles.footerStats}>
            <span>Streamed: <strong>{packetCount.toLocaleString()} pkts</strong></span>
            <span className={styles.footerDivider}>&bull;</span>
            <span>Latency: <strong>38ms</strong> (QoS 1)</span>
            <span className={styles.footerDivider}>&bull;</span>
            <span>Uptime: <strong>{Math.floor(connectedTime / 60)}m {connectedTime % 60}s</strong></span>
          </div>

          <button
            className={`${styles.simBtn} ${isSimulatingAnomaly ? styles.simBtnActive : ''}`}
            onClick={toggleAnomaly}
          >
            <RefreshCw size={12} className={isSimulatingAnomaly ? styles.spinning : ''} />
            <span>{isSimulatingAnomaly ? 'Reset Baseline' : 'Inject Anomaly'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
