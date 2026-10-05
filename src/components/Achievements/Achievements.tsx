import { motion } from 'framer-motion';
import { resume } from '../../data/resume';
import type { Achievement } from '../../data/resume';
import styles from './Achievements.module.css';

export default function Achievements() {
  return (
    <section id="achievements" className={styles.achievementsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Honors &amp; Milestones</div>
          <h2 className={styles.sectionTitle}>Key Achievements &amp; Contests</h2>
          <p className={styles.sectionSubtitle}>
            Recognitions in national hackathons, global competitive programming platforms, and college innovation circuits.
          </p>
        </div>

        {/* 4-card grid */}
        <div className={styles.achievementsGrid}>
          {resume.achievements.map((ach: Achievement, idx: number) => (
            <motion.div
              key={idx}
              className={styles.achievementCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconCircle}>{ach.icon}</div>
                <span className={styles.tagBadge}>{ach.tag}</span>
              </div>

              <h3 className={styles.cardTitle}>{ach.title}</h3>
              <div className={styles.organizationRow}>
                <span className={styles.orgName}>{ach.organization}</span>
                <span className={styles.orgYear}>{ach.year}</span>
              </div>

              <p className={styles.cardDesc}>{ach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
