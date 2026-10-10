import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { resume } from '../../data/resume';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={styles.educationSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Academic Path</div>
          <h2 className={styles.sectionTitle}>Education &amp; Core Disciplines</h2>
          <p className={styles.sectionSubtitle}>
            A rigorous technical journey transitioning from fundamental electronics and circuits to modern connected edge computing.
          </p>
        </div>

        {/* 3-column cards */}
        <div className={styles.educationGrid}>
          {resume.education.map((edu, idx) => (
            <motion.div
              key={idx}
              className={styles.educationCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.eduIcon}>{edu.icon}</span>
                <span className={styles.gradeBadge}>{edu.grade}</span>
              </div>

              <h3 className={styles.degreeTitle}>{edu.degree}</h3>
              <div className={styles.institutionName}>{edu.institution}</div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <Calendar size={13} className={styles.metaIcon} />
                  <span>{edu.period}</span>
                </div>
                <div className={styles.metaItem}>
                  <MapPin size={13} className={styles.metaIcon} />
                  <span>{edu.location}</span>
                </div>
              </div>

              {edu.coursework && (
                <div className={styles.courseworkWrapper}>
                  <span className={styles.courseworkLabel}>Key Disciplines:</span>
                  <div className={styles.courseworkChips}>
                    {edu.coursework.map((course, cIdx) => (
                      <motion.span 
                        key={cIdx} 
                        className={styles.courseChip}
                        whileHover={{ scale: 1.05, y: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
