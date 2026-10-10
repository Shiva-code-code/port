import { motion } from 'framer-motion';
import { Cpu, Server, Cloud, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { resume } from '../../data/resume';
import { GithubIcon } from '../Icons';
import styles from './About.module.css';

const pillars = [
  {
    icon: <Cpu size={20} className={styles.pillarIconBlue} />,
    title: 'Physical Instrumentation',
    subtitle: 'Sensors, Meters & Field Buses',
    desc: 'Hands-on hardware reverse-engineering of legacy utility meters, RS-485 Modbus RTU integration, and high-precision pulse counting across complex logistics facilities.',
  },
  {
    icon: <Server size={20} className={styles.pillarIconIndigo} />,
    title: 'Edge Gateways & Automation',
    subtitle: 'Linux, Python & Orchestration',
    desc: 'Engineering asynchronous Python automation on Raspberry Pi and MultiTech Linux gateways, slashing commissioning times by 95% with offline buffering and auto-reconnection state machines.',
  },
  {
    icon: <Cloud size={20} className={styles.pillarIconEmerald} />,
    title: 'Enterprise Cloud & Security',
    subtitle: 'AWS IoT Core & Mutual TLS',
    desc: 'Architecting zero-trust telemetry pipelines leveraging X.509 cryptographic certificate trust chains, AWS IoT Core ATS endpoints, and real-time SCADA dashboards.',
  },
];

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>About Shiva</div>
          <h2 className={styles.sectionTitle}>
            Engineering IoT Systems That Survive the Real World
          </h2>
          <p className={styles.sectionSubtitle}>
            From dusty warehouse distribution centers to enterprise cloud brokers — here is how I approach modern edge telemetry.
          </p>
        </div>

        {/* 2-Column Story + Cards */}
        <div className={styles.aboutGrid}>
          {/* Narrative Column */}
          <motion.div
            className={styles.storyCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <h3 className={styles.storyHeadline}>The Journey from Hardware to High-Scale Telemetry</h3>
            <p className={styles.storyParagraph}>
              My foundation in <strong>Electronics and Communication Engineering (ECE)</strong> gave me a deep respect for physical signals, microvolt measurements, and RF noise. When I transitioned into <strong>Internet of Things (B.Tech IoT)</strong> at MRCET, I realized the biggest bottleneck in the industry wasn&apos;t sensor hardware — it was the brittle bridge between the physical edge and cloud databases.
            </p>
            <p className={styles.storyParagraph}>
              At <strong>Milvian Group</strong>, I deployed telemetry systems directly inside Amazon GRE F logistics operations. In environments full of structural steel and RF interference, standard wireless setups drop packets constantly. By reverse-engineering legacy utility meters on-site, configuring LoRaWAN IN865 channel plans, and writing asynchronous Python provisioning scripts, I reduced setup times from 15 minutes to 4 minutes per unit with 99%+ reliability.
            </p>

            {/* Quick Principles */}
            <div className={styles.principlesList}>
              <div className={styles.principleItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Zero-trust cryptographic security (mTLS X.509 PKI) for every connected device</span>
              </div>
              <div className={styles.principleItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Offline disk caching & QoS 1 delivery so zero telemetry packets are lost</span>
              </div>
              <div className={styles.principleItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Automated CLI & web provisioning pipelines to eliminate error-prone manual setup</span>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className={styles.contactDetailsGrid}>
              <div className={styles.contactDetailItem}>
                <MapPin size={15} className={styles.detailIcon} />
                <div>
                  <div className={styles.detailLabel}>Location</div>
                  <div className={styles.detailValue}>Medak, Hyderabad, India</div>
                </div>
              </div>
              <div className={styles.contactDetailItem}>
                <Mail size={15} className={styles.detailIcon} />
                <div>
                  <div className={styles.detailLabel}>Email</div>
                  <a href={`mailto:${resume.email}`} className={styles.detailLink}>
                    {resume.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactDetailItem}>
                <Phone size={15} className={styles.detailIcon} />
                <div>
                  <div className={styles.detailLabel}>Phone</div>
                  <div className={styles.detailValue}>{resume.phone}</div>
                </div>
              </div>
              <div className={styles.contactDetailItem}>
                <GithubIcon size={15} className={styles.detailIcon} />
                <div>
                  <div className={styles.detailLabel}>GitHub &amp; Repos</div>
                  <a href={resume.github} target="_blank" rel="noopener noreferrer" className={styles.detailLink}>
                    Shiva-code-code (33+ repos)
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pillars Column */}
          <div className={styles.pillarsColumn}>
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className={styles.pillarCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className={styles.pillarHeader}>
                  <motion.div 
                    className={styles.pillarIconWrapper}
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    {pillar.icon}
                  </motion.div>
                  <div>
                    <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                    <span className={styles.pillarSubtitle}>{pillar.subtitle}</span>
                  </div>
                </div>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </motion.div>
            ))}

            {/* Google Open Source Spotlight Card */}
            <motion.div
              className={styles.googleSpotlightCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.spotlightTop}>
                <span className={styles.spotlightTag}>Google Open Source</span>
                <span className={styles.spotlightIssue}>GitHub Issue #1103</span>
              </div>
              <h4 className={styles.spotlightTitle}>fhir-data-pipes (JUnit 5 Migration)</h4>
              <p className={styles.spotlightText}>
                Active contributor to Google&apos;s enterprise healthcare pipeline repository, refactoring legacy test modules to modern JUnit 5 standards and collaborating via peer reviews.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
