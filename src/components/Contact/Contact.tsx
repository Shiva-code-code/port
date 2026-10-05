import { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Download, Send } from 'lucide-react';
import { resume } from '../../data/resume';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../Icons';
import styles from './Contact.module.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(resume.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formName || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Hello Shiva,\n\n${formMessage}\n\nBest regards,\n${formName}\n${formEmail}`
    );
    window.location.href = `mailto:${resume.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Get in Touch</div>
          <h2 className={styles.sectionTitle}>Let&apos;s Build Something Resilient</h2>
          <p className={styles.sectionSubtitle}>
            Whether you need a dedicated Field IoT Engineer, an edge gateway automation pipeline, or an embedded C++/Python engineer — my inbox is open.
          </p>
        </div>

        {/* 2-Column Contact Card */}
        <div className={styles.contactCardWrapper}>
          <div className={styles.contactGrid}>
            {/* Left: Contact Info & Status */}
            <div className={styles.infoColumn}>
              {/* Status Banner */}
              <div className={styles.statusBanner}>
                <div className={styles.statusDot} />
                <div>
                  <div className={styles.statusTitle}>Available for New Opportunities</div>
                  <div className={styles.statusDesc}>
                    Open to Field IoT Engineering, Embedded Edge Systems, and Full-Stack roles.
                  </div>
                </div>
              </div>

              {/* Contact Channels */}
              <div className={styles.channelsList}>
                {/* Email Item */}
                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <Mail size={18} />
                  </div>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Direct Email</span>
                    <div className={styles.emailRow}>
                      <span className={styles.channelValue}>{resume.email}</span>
                      <button
                        className={styles.copySmallBtn}
                        onClick={copyEmail}
                        title="Copy to clipboard"
                      >
                        {copied ? <Check size={13} className={styles.copiedGreen} /> : <Copy size={13} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone Item */}
                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <Phone size={18} />
                  </div>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Phone &amp; WhatsApp</span>
                    <a href={`tel:${resume.phone}`} className={styles.channelLink}>
                      {resume.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className={styles.channelItem}>
                  <div className={styles.channelIcon}>
                    <MapPin size={18} />
                  </div>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Location</span>
                    <span className={styles.channelValue}>{resume.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className={styles.socialChannels}>
                <span className={styles.socialChannelsLabel}>Profiles:</span>
                <div className={styles.socialBtnsRow}>
                  <a
                    href={resume.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialSquareBtn}
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={resume.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialSquareBtn}
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={resume.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialSquareBtn}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Download Resume Box */}
              <div className={styles.resumeDownloadBox}>
                <div>
                  <div className={styles.resumeBoxTitle}>Need a printable resume?</div>
                  <div className={styles.resumeBoxSub}>Updated with Amazon logistics &amp; Google OSS work</div>
                </div>
                <a
                  href={resume.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadResumeAction}
                  download="SHIVA_KUMAR_HAZARI_RESUME.pdf"
                >
                  <Download size={14} />
                  <span>PDF Resume</span>
                </a>
              </div>
            </div>

            {/* Right: Direct Inquiry Form */}
            <div className={styles.formColumn}>
              <h3 className={styles.formTitle}>Send a Quick Message</h3>
              <p className={styles.formSub}>
                Fills out your default email client with a pre-configured message directly to me.
              </p>

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Henderson"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.inputLabel}>
                    Project or Role Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your IoT deployment, gateway requirements, or engineering role..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className={styles.formTextarea}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span>Send Message Directly</span>
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
