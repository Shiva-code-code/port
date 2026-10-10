import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Cpu, MessageSquare, Download } from 'lucide-react';
import { resume } from '../../data/resume';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
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
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleScroll = () => {
      // Threshold for desktop scroll behavior: 80px
      const isPastTop = window.scrollY > 80;
      setScrolled(isPastTop);

      // Section spy mapping
      const scrollPos = window.scrollY + 200;
      const sectionOrder = ['hero', 'about', 'projects', 'experience', 'skills', 'certificates', 'achievements', 'education', 'contact'];
      
      const tabMap: Record<string, string> = {
        hero: 'hero',
        about: 'about',
        projects: 'projects',
        experience: 'projects',
        skills: 'skills',
        certificates: 'skills',
        achievements: 'about',
        education: 'about',
        contact: 'contact',
      };

      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const id = sectionOrder[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(tabMap[id] || 'hero');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // On desktop screen: appears when scrolling down, disappears when at the complete top (scrollY <= 80px)
  // On mobile screen: remains visible as the floating bottom bar
  const isVisible = !isDesktop || scrolled;

  return (
    <div className={styles.barContainer}>
      <motion.nav
        className={styles.floatingBar}
        aria-label="Floating Navigation Bar"
        initial={false}
        animate={{
          y: isVisible ? 0 : 90,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.94,
        }}
        transition={{
          type: 'spring',
          stiffness: 360,
          damping: 30,
        }}
        style={{
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              aria-label={tab.label}
              type="button"
            >
              {isActive && (
                <motion.div
                  layoutId="dockActivePill"
                  className={styles.activePill}
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              <div className={styles.iconWrapper}>
                <Icon size={19} className={styles.tabIcon} />
                {isActive && <span className={styles.activeDot} />}
              </div>
              <span className={styles.tabLabel}>{tab.label}</span>
            </motion.button>
          );
        })}

        {/* Theme Toggle & Quick Actions */}
        <div className={styles.dockDivider} />
        <ThemeToggle className={styles.dockThemeBtn} size={15} />

        {/* Desktop-only quick Resume download button */}
        <motion.a
          href={resume.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.dockResumeBtn}
          download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
          title="Download Resume (PDF)"
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Download size={14} />
          <span>Resume</span>
        </motion.a>
      </motion.nav>
    </div>
  );
}
