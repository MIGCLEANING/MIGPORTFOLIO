import React, { useEffect, useRef, useState } from 'react';
import './ContactFooter.css';
import myPhoto from '../assets/my-photo.png';

function ContactFooter() {
  const [localTime, setLocalTime] = useState('');
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0, r: 0 });
  const ctaRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/Detroit',
      });
      setLocalTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="contact-footer" id="contact">
      <div className="contact-footer__inner">
        <div className="contact-footer__heading">
          <div>
            <h2 className="contact-footer__title">Let&apos;s work together</h2>
          </div>
          <div className="contact-footer__arrow" aria-hidden="true">
            ↘
          </div>
        </div>

        <div className="contact-footer__divider">
          <div className="contact-footer__cta-wrap">
            <button
              className="contact-footer__cta"
              ref={ctaRef}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
              }}
              onMouseMove={(e) => {
                if (!ctaRef.current) return;
                const rect = ctaRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.45;
                const deltaY = (e.clientY - centerY) * 0.45;
                const rotate = Math.max(Math.min(deltaX * 0.12, 10), -10);
                setCtaOffset({ x: deltaX, y: deltaY, r: rotate });
              }}
              onMouseLeave={() => setCtaOffset({ x: 0, y: 0, r: 0 })}
              style={{
                transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px) rotate(${ctaOffset.r}deg)`,
              }}
            >
              <span
                className="contact-footer__cta-text"
                style={{
                  transform: `translate(${ctaOffset.x * 0.35}px, ${ctaOffset.y * 0.35}px) rotate(${ctaOffset.r * 1.2}deg)`,
                }}
              >
                Get in touch
              </span>
            </button>
          </div>
        </div>

        <div className="contact-footer__actions">
          <a className="contact-footer__pill" href="mailto:maksymgrygorkiv@gmail.com">
            maksymgrygorkiv@gmail.com
          </a>
        </div>

        <div className="contact-footer__meta">
          <div>
            <p className="meta-label">Version</p>
            <p className="meta-value">2025 MIG</p>
          </div>
          <div>
            <p className="meta-label">Local time</p>
            <p className="meta-value">{localTime || 'â€”'}</p>
          </div>
          <div>
            <p className="meta-label">Socials</p>
            <div className="meta-links">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;

