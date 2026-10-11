import { useState, useEffect, useRef } from 'react';
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const resetIdleTimer = () => {
      setIsReading(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      // When user is paused reading for 2.8s without scroll/touch, smoothly glide bottom bar away
      idleTimerRef.current = setTimeout(() => {
        setIsReading(true);
      }, 2800);
    };

    const handleScroll = () => {
      resetIdleTimer();

      // Don't override active tab while programmatic smooth scroll is animating to destination
      if (isProgrammaticScrollRef.current) {
        return;
      }

      // If at the very top of the page -> Home
      if (window.scrollY < 60) {
        setActiveTab('hero');
        return;
      }

      // If scrolled to bottom of page -> Contact
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveTab('contact');
        return;
      }

      // Section spy mapping in strict sequential order from top to bottom
      const scrollPos = window.scrollY + Math.min(window.innerHeight * 0.35, 260);
      const sectionOrder = [
        'hero',
        'about',
        'projects',
        'experience',
        'skills',
        'certificates',
        'achievements',
        'education',
        'contact',
      ];
      
      const tabMap: Record<string, string> = {
        hero: 'hero',
        about: 'about',
        projects: 'projects',
        experience: 'projects',
        skills: 'skills',
        certificates: 'skills',
        achievements: 'skills',
        education: 'skills',
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

    const handleTouchOrActivity = () => {
      // If user physically touches or drags screen, release programmatic scroll lock immediately
      isProgrammaticScrollRef.current = false;
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
      resetIdleTimer();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchOrActivity, { passive: true });
    window.addEventListener('touchmove', handleTouchOrActivity, { passive: true });
    window.addEventListener('wheel', handleTouchOrActivity, { passive: true });
    handleScroll();

    // On initial load: bottom bar appears immediately, then idle timer engages after 3.8s
    idleTimerRef.current = setTimeout(() => {
      setIsReading(true);
    }, 3800);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchOrActivity);
      window.removeEventListener('touchmove', handleTouchOrActivity);
      window.removeEventListener('wheel', handleTouchOrActivity);
    };
  }, []);

  const scrollTo = (id: string) => {
    setIsReading(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Set destination tab immediately for instant, responsive tactile feedback
    setActiveTab(id);

    // Lock scroll-spying during smooth-scroll so intermediate sections don't cause jitter
    isProgrammaticScrollRef.current = true;
    if (scrollLockTimeoutRef.current) {
      clearTimeout(scrollLockTimeoutRef.current);
    }
    scrollLockTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 750);

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // On desktop: top bar floats with full navigation; dock stays tucked so screen is clean and uncluttered
  // On mobile: dock appears immediately, reappears on touch/scroll, glides away when reading with slow iPhone spring
  const isVisible = !isDesktop && !isReading;

  return (
    <div className={styles.barContainer}>
      <motion.nav
        className={styles.floatingBar}
        aria-label="Floating Navigation Bar"
        initial={false}
        onPointerDown={() => setIsReading(false)}
        onTouchStart={() => setIsReading(false)}
        animate={{
          y: isVisible ? 0 : 88,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.89,
          filter: isVisible ? 'blur(0px)' : 'blur(12px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 110, // Slow, fluid, floaty iPhone-grade spring
          damping: 18,   // Cushioned settling without harsh bounce
          mass: 1.25,    // Premium tactile weight
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
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              aria-label={tab.label}
              type="button"
            >
              {isActive && (
                <motion.div
                  layoutId="dockActivePill"
                  className={styles.activePill}
                  style={{ borderRadius: isDesktop ? 9999 : 14 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380, // Crisp, snappy, predictable spring identical to desktop
                    damping: 30,
                  }}
                />
              )}

              <div className={styles.iconWrapper}>
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                  }}
                >
                  <Icon size={18} className={styles.tabIcon} />
                </motion.div>
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
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          <Download size={14} />
          <span>Resume</span>
        </motion.a>
      </motion.nav>
    </div>
  );
}
