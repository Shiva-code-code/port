import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { resume } from '../../data/resume';
import type { Project } from '../../data/resume';
import { GithubIcon } from '../Icons';
import styles from './Projects.module.css';

type CategoryFilter = 'All' | 'Industrial IoT' | 'Full-Stack Software' | 'Embedded & Edge';

const categories: CategoryFilter[] = ['All', 'Industrial IoT', 'Full-Stack Software', 'Embedded & Edge'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects = resume.projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Flagship Systems</div>
          <h2 className={styles.sectionTitle}>Engineered Projects &amp; Software</h2>
          <p className={styles.sectionSubtitle}>
            From embedded C++ microcontrollers and multi-threaded Python edge relays to enterprise cloud SCADA web engines.
          </p>

          {/* Category Filter Pills */}
          <div className={styles.filtersWrapper}>
            {categories.map((cat) => {
              const count = cat === 'All' ? resume.projects.length : resume.projects.filter(p => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className={styles.filterCount}>{count}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectCategory"
                      className={styles.filterActiveBackground}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => {
              const isExpanded = expandedId === project.id;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`${styles.projectCard} ${project.featured ? styles.featuredCard : ''}`}
                >
                  {/* Card Header Bar */}
                  <div className={styles.cardHeader}>
                    <div className={styles.badgeRow}>
                      <span className={styles.categoryBadge}>{project.category}</span>
                      {project.featured && (
                        <span className={styles.featuredBadge}>Flagship</span>
                      )}
                    </div>
                    <div className={styles.cardPeriod}>{project.period}</div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  {/* Highlights Bar */}
                  <div className={styles.highlightsContainer}>
                    {project.highlights.map((hl, i) => (
                      <motion.span 
                        key={i} 
                        className={styles.highlightPill}
                        whileHover={{ scale: 1.04, y: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle size={11} className={styles.highlightIcon} />
                        {hl}
                      </motion.span>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className={styles.techStack}>
                    {project.tech.map((t, i) => (
                      <motion.span 
                        key={i} 
                        className={styles.techTag}
                        whileHover={{ scale: 1.05, y: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  {/* Expandable Technical Bullet Points */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className={styles.expandedContent}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h4 className={styles.expandedHeading}>Architectural Contributions:</h4>
                        <ul className={styles.pointsList}>
                          {project.points.map((pt, i) => (
                            <li key={i} className={styles.pointItem}>
                              <span className={styles.pointBullet} />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Bottom Action Bar */}
                  <div className={styles.cardFooter}>
                    <button
                      className={styles.toggleBtn}
                      onClick={() => toggleExpand(project.id)}
                    >
                      <span>{isExpanded ? 'Less Details' : 'Deep Dive Architecture'}</span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ display: 'inline-flex' }}
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    </button>

                    <div className={styles.footerLinks}>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinkBtn}
                        aria-label="View on GitHub"
                        title="View repository on GitHub"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <GithubIcon size={16} />
                        <span>GitHub</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
