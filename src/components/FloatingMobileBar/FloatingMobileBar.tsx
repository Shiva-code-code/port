import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Cpu, MessageSquare } from 'lucide-react';
import styles from './FloatingMobileBar.module.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navTabs: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

export default function FloatingMobileBar() {
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = navTabs.length - 1; i >= 0; i--) {
        const sectionId = navTabs[i].id;
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.barContainer}>
      <nav className={styles.floatingBar} aria-label="Mobile Bottom Navigation">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
              whileTap={{ scale: 0.88 }}
              aria-label={tab.label}
              type="button"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActivePill"
                  className={styles.activePill}
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              <div className={styles.iconWrapper}>
                <Icon size={20} className={styles.tabIcon} />
                {isActive && <span className={styles.activeDot} />}
              </div>
              <span className={styles.tabLabel}>{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
