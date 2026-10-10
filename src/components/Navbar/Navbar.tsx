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
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolling down past 80px, the top navbar disappears smoothly
      // When scrolling to the complete top (scrollY <= 80px), the top navbar reappears
      const isPastTop = window.scrollY > 80;
      setScrolled(isPastTop);

      if (isPastTop && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }

      // Section spy
      const sections = ['hero', ...navItems.map(item => item.id)];
      const scrollPos = window.scrollY + 120;

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
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`${styles.header} ${scrolled ? styles.headerHidden : ''}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: scrolled ? -100 : 0,
        opacity: scrolled ? 0 : 1,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        pointerEvents: scrolled ? 'none' : 'auto',
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
          <a
            href={resume.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
          >
            <Download size={14} />
            <span>Resume</span>
          </a>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          <button
            className={styles.contactBtn}
            onClick={() => scrollTo('contact')}
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={14} />
          </button>

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
                <div className={styles.mobileThemeRow}>
                  <span className={styles.mobileThemeLabel}>Appearance</span>
                  <ThemeToggle />
                </div>
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
