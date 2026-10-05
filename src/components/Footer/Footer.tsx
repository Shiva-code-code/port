import { ArrowUp } from 'lucide-react';
import { resume } from '../../data/resume';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../Icons';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <div className={styles.logoAvatar}>S</div>
              <span className={styles.logoName}>Shiva Kumar Hazari</span>
            </div>
            <p className={styles.brandTagline}>
              Field IoT Engineer specializing in physical instrumentation, edge automation, and cloud telemetry.
            </p>
          </div>

          <div className={styles.linksRow}>
            <div className={styles.navLinksCol}>
              <span className={styles.colTitle}>Navigation</span>
              <div className={styles.linksList}>
                <a href="#about" className={styles.footerLink}>About</a>
                <a href="#projects" className={styles.footerLink}>Projects</a>
                <a href="#experience" className={styles.footerLink}>Experience</a>
                <a href="#skills" className={styles.footerLink}>Skills</a>
                <a href="#certificates" className={styles.footerLink}>Certifications</a>
                <a href="#education" className={styles.footerLink}>Education</a>
                <a href="#contact" className={styles.footerLink}>Contact</a>
              </div>
            </div>

            <div className={styles.socialCol}>
              <span className={styles.colTitle}>Connect</span>
              <div className={styles.socialList}>
                <a
                  href={resume.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={resume.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={resume.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${resume.email}`}
                  className={styles.socialItem}
                >
                  <span>{resume.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <span>&copy; {new Date().getFullYear()} Shiva Kumar Hazari. Crafted with React, TypeScript &amp; Framer Motion.</span>
          </div>

          <button
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
