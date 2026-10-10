import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import { resume } from '../../data/resume';
import { GoogleIcon } from '../Icons';
import styles from './Experience.module.css';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Work Experience</div>
          <h2 className={styles.sectionTitle}>Where I&apos;ve Made an Impact</h2>
          <p className={styles.sectionSubtitle}>
            Proven record of architecting telemetry pipelines on-site and contributing to global open-source ecosystems.
          </p>
        </div>

        {/* Timeline List */}
        <div className={styles.timelineList}>
          {resume.experience.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <motion.div
                key={idx}
                className={styles.timelineCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top Info Bar */}
                <div className={styles.cardTopBar}>
                  <div className={styles.companyIdentity}>
                    <div className={styles.companyAvatar}>
                      {exp.company === 'Google' ? (
                        <GoogleIcon size={24} />
                      ) : (
                        <span className={styles.milvianInitial}>M</span>
                      )}
                    </div>
                    <div>
                      <div className={styles.companyNameRow}>
                        <h3 className={styles.companyName}>{exp.company}</h3>
                        <span className={styles.jobTypeBadge}>{exp.type}</span>
                      </div>
                      <div className={styles.roleTitle}>{exp.role}</div>
                    </div>
                  </div>

                  <div className={styles.metaColumn}>
                    <div className={styles.metaItem}>
                      <Calendar size={13} className={styles.metaIcon} />
                      <span>{exp.period}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <MapPin size={13} className={styles.metaIcon} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className={styles.experienceDesc}>{exp.description}</p>

                {/* Skills Cloud */}
                <div className={styles.skillsCloud}>
                  {exp.skillsUsed.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx} 
                      className={styles.skillPill}
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Detailed Accomplishments */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className={styles.bulletsWrapper}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h4 className={styles.bulletsHeading}>Core Deliverables &amp; Achievements:</h4>
                      <ul className={styles.bulletsList}>
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx} className={styles.bulletItem}>
                            <CheckCircle2 size={16} className={styles.bulletCheck} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.expandBtn}
                    onClick={() => toggleExpand(idx)}
                  >
                    <span>{isExpanded ? 'Hide Deliverables' : 'View Full Deliverables & Outcomes'}</span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ display: 'inline-flex' }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
