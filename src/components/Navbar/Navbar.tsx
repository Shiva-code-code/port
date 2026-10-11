import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { resume } from '../../data/resume';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const isMobileView = window.innerWidth <= 768;
      // On mobile: morph into curved floating glossy capsule past 25px
      // On desktop: disappear smoothly past 80px (letting bottom dock appear)
      const currentScroll = window.scrollY;
      const isPastThreshold = currentScroll > (isMobileView ? 25 : 80);
      setScrolled(isPastThreshold);

      if (isPastThreshold && mobileMenuOpen && !isMobileView) {
        setMobileMenuOpen(false);
      }

      // Section spy
      const sections = ['hero', ...navItems.map(item => item.id)];
      const scrollPos = currentScroll + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`
        ${styles.header}
        ${scrolled ? styles.scrolled : ''}
        ${(!isMobile && scrolled) ? styles.headerHidden : ''}
        ${(isMobile && scrolled) ? styles.mobileFloating : ''}
      `}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: (!isMobile && scrolled) ? -100 : 0,
        opacity: (!isMobile && scrolled) ? 0 : 1,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        pointerEvents: (!isMobile && scrolled) ? 'none' : 'auto',
      }}
    >
      <div className={styles.container}>
        {/* Brand / Logo */}
        <button className={styles.logoBtn} onClick={() => scrollTo('hero')}>
          <div className={styles.logoAvatar}>
            <span className={styles.logoInitial}>S</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Shiva Hazari</span>
            <span className={styles.statusPill}>
              <span className={styles.statusDot} />
              IoT Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <div className={styles.navPill}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className={styles.activeIndicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right CTA / Theme / Resume */}
        <div className={styles.navActions}>
          <motion.a
            href={resume.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Download size={14} />
            <span>Resume</span>
          </motion.a>

          {/* Theme Switcher Toggle (Desktop only; on mobile, FloatingMobileBar has the theme toggle) */}
          <div className={styles.topThemeWrapper}>
            <ThemeToggle />
          </div>

          <motion.button
            className={styles.contactBtn}
            onClick={() => scrollTo('contact')}
            whileHover={{ y: -1, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={14} />
          </motion.button>

          {/* Mobile Menu Trigger */}
          <button
            className={styles.menuTrigger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileNavList}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.mobileNavLinkActive : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <div className={styles.mobileActions}>
                <a
                  href={resume.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileResumeBtn}
                  download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
                >
                  <Download size={15} />
                  Download Resume (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
