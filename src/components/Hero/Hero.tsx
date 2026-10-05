import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Check, Copy, Sparkles, MapPin, Radio, ShieldCheck } from 'lucide-react';
import { resume } from '../../data/resume';
import { GithubIcon, LinkedinIcon, WhatsAppIcon, GoogleIcon } from '../Icons';
import styles from './Hero.module.css';

const dynamicTitles = [
  'Field IoT Systems Engineer',
  'LoRaWAN & Edge Gateway Architect',
  'Google Open Source Contributor',
  'Embedded C++ & Python Developer',
  'Real-Time SCADA HMI Builder',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % dynamicTitles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resume.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.container}>
        {/* Main 2-column layout */}
        <div className={styles.heroGrid}>
          {/* Left Column: Text & CTAs */}
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Pill */}
            <div className={styles.availabilityPill}>
              <span className={styles.pulseDot} />
              <span className={styles.availabilityText}>
                Active Field IoT Engineer &bull; Amazon GRE F Deployments
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              Hi, I&apos;m <span className={styles.nameHighlight}>{resume.name}</span>
            </h1>

            {/* Animated Title Flipper */}
            <div className={styles.titleWrapper}>
              <span className={styles.titlePrefix}>Specializing in</span>
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={styles.dynamicTitle}
              >
                {dynamicTitles[titleIndex]}
              </motion.span>
            </div>

            {/* Conversational Narrative */}
            <p className={styles.description}>
              I architect end-to-end telemetry pipelines bridging physical hardware (RS-485 Modbus, LoRaWAN IN865, pulse meters) with enterprise cloud platforms like AWS IoT Core. Engineered Python automation that cut gateway commissioning time from 15 minutes to 45 seconds while sustaining 99%+ field uptime.
            </p>

            {/* Quick Context Highlights */}
            <div className={styles.quickHighlights}>
              <div className={styles.highlightTag}>
                <MapPin size={13} className={styles.tagIcon} />
                <span>Hyderabad, India</span>
              </div>
              <div className={styles.highlightTag}>
                <Radio size={13} className={styles.tagIcon} />
                <span>LoRaWAN &bull; Modbus &bull; MQTT</span>
              </div>
              <div className={styles.highlightTag}>
                <ShieldCheck size={13} className={styles.tagIcon} />
                <span>X.509 Mutual TLS</span>
              </div>
            </div>

            {/* CTAs */}
            <div className={styles.ctaRow}>
              <button
                className={styles.primaryBtn}
                onClick={() => scrollTo('projects')}
              >
                <span>View Projects</span>
                <ArrowDown size={15} />
              </button>

              <a
                href={resume.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
                download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
              >
                <Download size={15} />
                <span>Resume (PDF)</span>
              </a>

              <button
                className={styles.copyEmailBtn}
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className={styles.copiedIcon} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Links Row */}
            <div className={styles.socialBar}>
              <span className={styles.socialLabel}>Direct Connect:</span>
              <div className={styles.socialIcons}>
                <a
                  href={resume.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={resume.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={resume.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="WhatsApp Chat"
                >
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Portrait & Floating Floating Glass Badges */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.photoContainer}>
              {/* Outer soft radiant aura */}
              <div className={styles.photoGlow} />

              {/* Glossy Photo Frame */}
              <div className={styles.photoCard}>
                <img
                  src={resume.photo}
                  alt={resume.name}
                  className={styles.photoImg}
                />
              </div>

              {/* Floating Badge 1: Google Contributor */}
              <motion.div
                className={`${styles.floatingBadge} ${styles.badgeTopRight}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <div className={styles.badgeIcon}>
                  <GoogleIcon size={18} />
                </div>
                <div>
                  <span className={styles.badgeTitle}>Google Contributor</span>
                  <span className={styles.badgeSub}>fhir-data-pipes (JUnit 5)</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Industrial IoT */}
              <motion.div
                className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                whileHover={{ y: -3 }}
              >
                <div className={`${styles.badgeIcon} ${styles.iotIconBadge}`}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className={styles.badgeTitle}>Industrial Edge Gateways</span>
                  <span className={styles.badgeSub}>MultiTech &bull; ESP32 &bull; Modbus</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 4 Real Metrics Banner below Hero */}
        <motion.div
          className={styles.metricsGrid}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {resume.metrics.map((metric, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricSub}>{metric.sublabel}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
