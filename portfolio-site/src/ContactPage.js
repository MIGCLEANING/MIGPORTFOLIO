import React, { useMemo, useState, useEffect, useRef } from 'react';
import './ContactPage.css';

function ContactPage() {
  const APP_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR-APPS-SCRIPT-ID/exec';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: '',
    message: '',
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [heroCtaOffset, setHeroCtaOffset] = useState({ x: 0, y: 0, r: 0 });
  const [formCtaOffset, setFormCtaOffset] = useState({ x: 0, y: 0, r: 0 });
  const [brandOffset, setBrandOffset] = useState({ x: 0, y: 0 });
  const [fabOffset, setFabOffset] = useState({ x: 0, y: 0 });
  const [navVisible, setNavVisible] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);
  const [menuBrandOffset, setMenuBrandOffset] = useState({ x: 0, y: 0 });
  const [menuBrandRotation, setMenuBrandRotation] = useState(0);

  const navRef = useRef(null);
  const fabRef = useRef(null);
  const menuBrandRef = useRef(null);

  // Observe nav visibility to toggle floating menu button
  useEffect(() => {
    if (!navRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  // Close floating menu when nav comes back into view
  useEffect(() => {
    if (navVisible) {
      setFabOpen(false);
    }
  }, [navVisible]);

  const localTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Detroit',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.32;
    const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.32;
    const rotation = Math.max(Math.min(deltaX * 0.2, 16), -16);
    el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg) scale(1.12)`;
  };

  const handleLinkMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
  };

  // FAB magnetic effect
  const handleFabMouseMove = (e) => {
    if (fabRef.current) {
      const rect = fabRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;

      setFabOffset({ x: deltaX, y: deltaY });
    }
  };

  const handleFabMouseLeave = () => {
    setFabOffset({ x: 0, y: 0 });
  };

  const handleFabToggle = () => {
    setFabOpen((prev) => !prev);
  };

  // Menu brand magnetic effect
  const handleMenuBrandMouseMove = (e) => {
    if (menuBrandRef.current) {
      const rect = menuBrandRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      setMenuBrandOffset({ x: deltaX, y: deltaY });
    }
  };

  const handleMenuBrandMouseEnter = () => {
    setMenuBrandRotation(360);
  };

  const handleMenuBrandMouseLeave = () => {
    setMenuBrandOffset({ x: 0, y: 0 });
    setMenuBrandRotation(0);
  };

  const handleBrandMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    setBrandOffset({ x: deltaX, y: deltaY });
  };

  const handleBrandMouseLeave = () => {
    setBrandOffset({ x: 0, y: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!APP_SCRIPT_URL || APP_SCRIPT_URL.includes('YOUR-APPS-SCRIPT-ID')) {
      setStatus({ state: 'error', message: 'Apps Script URL not configured.' });
      return;
    }
    setStatus({ state: 'loading', message: 'Sending…' });
    try {
      const res = await fetch(APP_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus({ state: 'success', message: 'Sent! I will reply shortly.' });
      setFormData({ name: '', email: '', services: '', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: 'Could not send. Try again soon.' });
    }
  };

  return (
    <div className="contact-page page">
      <div className="contact-shell">
        <nav className="navigation" ref={navRef}>
          <div className="nav-bar">
            <a
              className="brand"
              href="/"
              onMouseMove={handleBrandMouseMove}
              onMouseLeave={handleBrandMouseLeave}
              style={{
                transform: `translate(${brandOffset.x}px, ${brandOffset.y}px)`,
              }}
            >
              <div className="brand-text-container">
                <span className="brand-text brand-text-default">MIG</span>
                <span className="brand-text brand-text-hover">Maksym Grygorkiv</span>
              </div>
            </a>
            <div className="nav-links">
              <a
                href="/#recent-work"
                className="nav-link"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
              >
                Work
              </a>
              <a
                href="/about"
                className="nav-link"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
              >
                About
              </a>
              <a
                href="/contact"
                className="nav-link active"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Header Section - Copied from About Page */}
        <header className="section default-header about-header">
          <div className="container medium once-in">
            <h1 className="display-heading">
              Let's start a project together
            </h1>
            <div className="overlay overlay-image is-inview">
              <div className="overlay-line" />
              <a
                href="#contact-form"
                className="cta-button"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  const deltaX = (e.clientX - centerX) * 0.45;
                  const deltaY = (e.clientY - centerY) * 0.45;
                  const rotate = Math.max(Math.min(deltaX * 0.12, 10), -10);
                  setHeroCtaOffset({ x: deltaX, y: deltaY, r: rotate });
                }}
                onMouseLeave={() => setHeroCtaOffset({ x: 0, y: 0, r: 0 })}
                style={{
                  transform: `translate(${heroCtaOffset.x}px, ${heroCtaOffset.y}px) rotate(${heroCtaOffset.r}deg)`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('.contact-form-panel')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span
                  className="cta-text"
                  style={{
                    transform: `translate(${heroCtaOffset.x * 0.5}px, ${heroCtaOffset.y * 0.5}px) rotate(${heroCtaOffset.r * 1.1}deg)`,
                  }}
                >
                  Get in touch
                </span>
              </a>
            </div>
          </div>
        </header>

        <section className="contact-body">
          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="contact-form-shell">
              <div className="form-row">
                <span className="form-index">01</span>
                <div className="form-field">
                  <label>What&apos;s your name?</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <span className="form-index">02</span>
                <div className="form-field">
                  <label>What&apos;s your email?</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <span className="form-index">03</span>
                <div className="form-field">
                  <label>What services are you looking for?</label>
                  <input
                    type="text"
                    name="services"
                    placeholder="Cleaning, maintenance, product build..."
                    value={formData.services}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <span className="form-index">04</span>
                <div className="form-field">
                  <label>Your message</label>
                  <textarea
                    className="message-area"
                    rows="3"
                    name="message"
                    placeholder="Share details and timing."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-cta-line">
                <div className="form-cta-line__bar" />
                <button
                  type="submit"
                  className="form-cta"
                  disabled={status.state === 'loading'}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const deltaX = (e.clientX - centerX) * 0.45;
                    const deltaY = (e.clientY - centerY) * 0.45;
                    const rotate = Math.max(Math.min(deltaX * 0.12, 10), -10);
                    setFormCtaOffset({ x: deltaX, y: deltaY, r: rotate });
                  }}
                  onMouseLeave={() => setFormCtaOffset({ x: 0, y: 0, r: 0 })}
                  style={{
                    transform: `translate(${formCtaOffset.x}px, ${formCtaOffset.y}px) rotate(${formCtaOffset.r}deg)`,
                  }}
                >
                  <span
                    className="form-cta-text"
                    style={{
                      transform: `translate(${formCtaOffset.x * 0.5}px, ${formCtaOffset.y * 0.5}px) rotate(${formCtaOffset.r * 1.1}deg)`,
                    }}
                  >
                    {status.state === 'loading' ? 'Sending…' : 'Send it!'}
                  </span>
                </button>
                <div className="form-cta-line__bar" />
              </div>
              {status.state !== 'idle' && (
                <div
                  className={`form-status ${
                    status.state === 'success'
                      ? 'form-status--success'
                      : status.state === 'error'
                      ? 'form-status--error'
                      : ''
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <aside className="contact-sidecard">
            <div className="side-section">
              <p className="meta-label">Contact details</p>
              <a href="mailto:maksymgrygorkiv@gmail.com" className="contact-link">
                maksymgrygorkiv@gmail.com
              </a>
            </div>
            <div className="side-section">
              <p className="meta-label">Business details</p>
              <p className="meta-value">MIG Cleaning</p>
              <p className="meta-value">Location: Michigan, USA</p>
            </div>
            <div className="side-section">
              <p className="meta-label">Social</p>
              <a className="contact-link" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <div className="side-section meta-row">
              <div>
                <p className="meta-label">Version</p>
                <p className="meta-value">2025 MIG</p>
              </div>
              <div>
                <p className="meta-label">Local time</p>
                <p className="meta-value">{localTime}</p>
              </div>
            </div>
          </aside>
        </section>

        {/* Floating Action Button Menu */}
        {!navVisible && (
          <React.Fragment>
            <div
              className="fab-wrapper"
              ref={fabRef}
              onMouseMove={handleFabMouseMove}
              onMouseLeave={handleFabMouseLeave}
            >
              <button
                className={`menu-fab ${fabOpen ? 'open' : ''}`}
                onClick={handleFabToggle}
                aria-label="Open navigation menu"
                style={{
                  transform: `translate(${fabOffset.x}px, ${fabOffset.y}px)`,
                }}
              >
                <span className="fab-lines">
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>

            <div className={`fullscreen-menu ${fabOpen ? 'open' : ''}`}>
              <div className="fullscreen-menu-content">
                <div
                  className="menu-brand-wrapper"
                  ref={menuBrandRef}
                  onMouseMove={handleMenuBrandMouseMove}
                  onMouseEnter={handleMenuBrandMouseEnter}
                  onMouseLeave={handleMenuBrandMouseLeave}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setFabOpen(false);
                  }}
                >
                  <div
                    className="menu-brand"
                    style={{
                      transform: `translate(${menuBrandOffset.x}px, ${menuBrandOffset.y}px)`,
                    }}
                  >
                    <span
                      className="menu-brand-symbol"
                      style={{
                        transform: `rotate(${menuBrandRotation}deg)`,
                      }}
                    >
                      ©
                    </span>
                    <div className="menu-brand-text-container">
                      <span className="menu-brand-text menu-brand-text-default">
                        MIG
                      </span>
                      <span className="menu-brand-text menu-brand-text-hover">
                        Maksym Grygorkiv
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="/#recent-work"
                  className="fullscreen-menu-link nav-link"
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/';
                    setFabOpen(false);
                  }}
                >
                  Work
                </a>

                <a
                  href="/about"
                  className="fullscreen-menu-link nav-link"
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/about';
                    setFabOpen(false);
                  }}
                >
                  About
                </a>

                <a
                  href="/contact"
                  className="fullscreen-menu-link nav-link active"
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  onClick={(e) => {
                    setFabOpen(false);
                  }}
                >
                  Contact
                </a>
              </div>
            </div>
          </React.Fragment>
        )}

      </div>
    </div>
  );
}

export default ContactPage;