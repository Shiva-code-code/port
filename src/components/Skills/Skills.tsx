import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { resume } from '../../data/resume';
import styles from './Skills.module.css';

export default function Skills() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = resume.skills[selectedCategoryIndex];

  // Filter skills across all categories if search is active
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const results: { category: string; skill: string; icon: string }[] = [];

    resume.skills.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.toLowerCase().includes(query)) {
          results.push({ category: cat.category, skill: item, icon: cat.icon });
        }
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <section id="skills" className={styles.skillsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Technical Arsenal</div>
          <h2 className={styles.sectionTitle}>Protocols, Hardware &amp; Tooling</h2>
          <p className={styles.sectionSubtitle}>
            Engineered with strict hardware constraints, secure cloud handoffs, and production automation.
          </p>

          {/* Search bar */}
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search protocols, microcontrollers, libraries (e.g., Modbus, LoRaWAN, FastAPI, AWS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Display Search Results OR Categorized Tabs */}
        {searchResults !== null ? (
          <div className={styles.searchResultsPanel}>
            <div className={styles.searchResultsHeader}>
              <Sparkles size={16} className={styles.searchHeaderIcon} />
              <span>
                Found <strong>{searchResults.length}</strong> matching technologies for &ldquo;{searchQuery}&rdquo;
              </span>
            </div>
            <div className={styles.chipsGrid}>
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <motion.div
                    key={i}
                    className={styles.searchResultChip}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <span className={styles.chipIcon}>{res.icon}</span>
                    <span className={styles.chipText}>{res.skill}</span>
                    <span className={styles.chipCategoryBadge}>{res.category}</span>
                  </motion.div>
                ))
              ) : (
                <div className={styles.noResultsText}>
                  No technologies match your search. Try searching for &ldquo;Modbus&rdquo;, &ldquo;AWS&rdquo;, &ldquo;Python&rdquo;, or &ldquo;ESP32&rdquo;.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.skillsLayout}>
            {/* Left Category Tabs */}
            <div className={styles.categoryTabs}>
              {resume.skills.map((cat, idx) => {
                const isActive = selectedCategoryIndex === idx;
                return (
                  <motion.button
                    key={idx}
                    className={`${styles.categoryTabBtn} ${isActive ? styles.categoryTabBtnActive : ''}`}
                    onClick={() => setSelectedCategoryIndex(idx)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span className={styles.tabIcon}>{cat.icon}</span>
                    <div className={styles.tabInfo}>
                      <span className={styles.tabTitle}>{cat.category}</span>
                      <span className={styles.tabCount}>{cat.items.length} technologies</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillTabBackground"
                        className={styles.tabActiveIndicator}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Right Display Panel */}
            <div className={styles.categoryPanel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategoryIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className={styles.panelContent}
                >
                  <div className={styles.panelHeader}>
                    <div className={styles.panelIcon}>{activeCategory.icon}</div>
                    <div>
                      <h3 className={styles.panelCategoryTitle}>{activeCategory.category}</h3>
                      <p className={styles.panelCategoryDesc}>{activeCategory.description}</p>
                    </div>
                  </div>

                  <div className={styles.panelChipsGrid}>
                    {activeCategory.items.map((item, itemIdx) => (
                      <motion.div
                        key={itemIdx}
                        className={styles.skillChip}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: itemIdx * 0.035 }}
                        whileHover={{ y: -3, scale: 1.04 }}
                      >
                        <span className={styles.chipBullet} />
                        <span className={styles.chipLabel}>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
