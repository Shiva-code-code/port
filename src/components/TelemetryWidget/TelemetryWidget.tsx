import { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, Wifi, RefreshCw, Zap } from 'lucide-react';
import styles from './TelemetryWidget.module.css';

export default function TelemetryWidget() {
  const [power, setPower] = useState(2.41);
  const [voltage, setVoltage] = useState(231.2);
  const [pressure, setPressure] = useState(4.85);
  const [packetCount, setPacketCount] = useState(14890);
  const [isSimulatingAnomaly, setIsSimulatingAnomaly] = useState(false);
  const [connectedTime, setConnectedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setConnectedTime((prev) => prev + 1);

      if (!isSimulatingAnomaly) {
        setPower((prev) => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
        setVoltage(+(230 + (Math.random() * 2.5 - 1.25)).toFixed(1));
        setPressure(+(4.8 + (Math.random() * 0.12 - 0.06)).toFixed(2));
      } else {
        setPower((prev) => +(prev + (Math.random() * 0.3 + 0.1)).toFixed(2));
        setPressure(+(6.4 + (Math.random() * 0.4)).toFixed(2));
      }

      setPacketCount((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(timer);
  }, [isSimulatingAnomaly]);

  const toggleAnomaly = () => {
    if (isSimulatingAnomaly) {
      setIsSimulatingAnomaly(false);
      setPower(2.41);
      setPressure(4.85);
    } else {
      setIsSimulatingAnomaly(true);
    }
  };

  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.widgetCard}>
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
      </div>
    </div>
  );
}
