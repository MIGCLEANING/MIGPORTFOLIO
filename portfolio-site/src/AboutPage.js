import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import myPhoto2 from './assets/my-photo3.png';

function AboutPage() {
  const [brandOffset, setBrandOffset] = useState({ x: 0, y: 0 });
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0, r: 0 });
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

  const handleCtaMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.45;
    const deltaY = (e.clientY - centerY) * 0.45;
    const rotate = Math.max(Math.min(deltaX * 0.12, 10), -10);
    setCtaOffset({ x: deltaX, y: deltaY, r: rotate });
  };

  const handleCtaMouseLeave = () => {
    setCtaOffset({ x: 0, y: 0, r: 0 });
  };

  return (
    <div className="page about-page">
      <div className="page-wrapper">
        
        {/* Navigation Header */}
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
                className="nav-link active"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
              >
                About
              </a>
              <a
                href="/contact"
                className="nav-link"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
              >
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Header Section */}
        <header className="section default-header about-header">
          <div className="container medium once-in">
            <h1 className="display-heading">
              Helping spaces thrive in the real world.
            </h1>
            <div className="overlay overlay-image is-inview">
              <div className="overlay-line" />
              <a
                href="/contact"
                className="cta-button"
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                style={{
                  transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px) rotate(${ctaOffset.r}deg)`,
                }}
              >
                <span
                  className="cta-text"
                  style={{
                    transform: `translate(${ctaOffset.x * 0.5}px, ${ctaOffset.y * 0.5}px) rotate(${ctaOffset.r * 1.1}deg)`,
                  }}
                >
                  Get in touch
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* About Content Section */}
        <section className="section about-image once-in">
          <div className="container large">
            <div className="flex-col">
              <div className="arrow-indicator">→</div>
              <div className="content-block">
                <p>
                  I'm a junior at the University of Detroit Mercy pursuing Computer Science, balancing full-time studies with running MIG Cleaning Organization. My journey started with two transformative summer internships where I rotated through six companies, discovering my passion for technology and business operations.
                </p>
                <p>
                  When my immigrant parents—who cleaned homes and offices while my father drove trucks to support our family—began receiving more client requests than they could handle, I saw an opportunity. Rather than watch them work tirelessly into old age, I stepped in. I brought on experienced professionals, built systems to manage operations, and created a sustainable business model that allows my parents to step back while still benefiting from their hard-earned reputation.
                </p>
                <p>
                  Today, I manage MIG Cleaning while pursuing my degree, learning daily lessons about leadership, perseverance, and service. I'm blessed to be in this position and grateful to Jesus for every challenge that has shaped me and every opportunity to grow.
                </p>
                <p className="text-muted">Always learning, always growing...</p>
              </div>
            </div>
            <div className="image-container">
              <img src={myPhoto2} alt="Maksym Grygorkiv" className="about-photo" />
            </div>
          </div>
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
                  className="fullscreen-menu-link nav-link active"
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  onClick={(e) => {
                    setFabOpen(false);
                  }}
                >
                  About
                </a>

                <a
                  href="/contact"
                  className="fullscreen-menu-link nav-link"
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/contact';
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

export default AboutPage;