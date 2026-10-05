import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { resume } from '../../data/resume';
import type { Certificate } from '../../data/resume';
import styles from './Certificates.module.css';

type IssuerFilter = 'All' | 'HackerRank' | 'Infosys Springboard';

export default function Certificates() {
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerFilter>('All');

  const filteredCerts = resume.certifications.filter((c) => {
    if (selectedIssuer === 'All') return true;
    return c.issuer === selectedIssuer;
  });

  return (
    <section id="certificates" className={styles.certsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Verified Credentials</div>
          <h2 className={styles.sectionTitle}>Certificates &amp; Specializations</h2>
          <p className={styles.sectionSubtitle}>
            Verified competencies spanning algorithmic problem solving, relational database systems, and agile delivery.
          </p>

          {/* Issuer Filters */}
          <div className={styles.filterBar}>
            {(['All', 'HackerRank', 'Infosys Springboard'] as IssuerFilter[]).map((issuer) => {
              const count = issuer === 'All'
                ? resume.certifications.length
                : resume.certifications.filter(c => c.issuer === issuer).length;
              const isActive = selectedIssuer === issuer;
              return (
                <button
                  key={issuer}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                  onClick={() => setSelectedIssuer(issuer)}
                >
                  <span>{issuer}</span>
                  <span className={styles.filterCount}>{count}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCertFilter"
                      className={styles.filterActiveBg}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certs Grid */}
        <div className={styles.certsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert: Certificate, idx: number) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className={styles.certCard}
              >
                <div className={styles.cardTop}>
                  <div className={styles.issuerBadgeRow}>
                    <span
                      className={styles.issuerTag}
                      style={{
                        background: cert.issuer === 'HackerRank' ? '#f0fdf4' : '#eff6ff',
                        color: cert.issuer === 'HackerRank' ? '#166534' : '#1e40af',
                        borderColor: cert.issuer === 'HackerRank' ? '#bbf7d0' : '#bfdbfe',
                      }}
                    >
                      {cert.badge}
                    </span>
                    <span className={styles.categoryTag}>{cert.category}</span>
                  </div>
                  <span className={styles.certYear}>{cert.year}</span>
                </div>

                <h3 className={styles.certName}>{cert.name}</h3>
                <p className={styles.certDesc}>{cert.description}</p>

                <div className={styles.cardBottom}>
                  <div className={styles.issuerOrg}>
                    <Award size={14} className={styles.awardIcon} />
                    <span>{cert.issuer}</span>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.verifyLink}
                    >
                      <span>Verify</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
