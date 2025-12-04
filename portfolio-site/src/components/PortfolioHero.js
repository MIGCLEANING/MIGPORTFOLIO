import React, { useState, useEffect, useRef } from 'react';
import './PortfolioHero.css';
import myPhoto from '../assets/my-photo.png';

function PortfolioHero() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [marqueePosition, setMarqueePosition] = useState('fixed');
  const [brandRotation, setBrandRotation] = useState(0);
  const [brandOffset, setBrandOffset] = useState({ x: 0, y: 0 });
  const [menuBrandRotation, setMenuBrandRotation] = useState(0);
  const [menuBrandOffset, setMenuBrandOffset] = useState({ x: 0, y: 0 });
  const [fabOffset, setFabOffset] = useState({ x: 0, y: 0 });
  const [navVisible, setNavVisible] = useState(true);
  const [fabOpen, setFabOpen] = useState(false);

  const marqueeRef = useRef(null);
  const heroRef = useRef(null);
  const brandRef = useRef(null);
  const menuBrandRef = useRef(null);
  const fabRef = useRef(null);
  const navRef = useRef(null);

  // ============================================
  // CUSTOMIZE THESE VALUES WITH YOUR INFO
  // ============================================
  const name = 'Maksym Grygorkiv';
  const brand = 'MIG';
  const role1 = 'Founder of MIG Cleaning';
  const role2 = 'Web Developer & CS Student';
  // ============================================

  // Marquee animation - bounces back and forth
  useEffect(() => {
    const maxScroll = -1500;
    const interval = setInterval(() => {
      setScrollOffset((prev) => {
        const newOffset = prev + direction * 1.5;
        if (newOffset <= maxScroll) {
          setDirection(1);
          return maxScroll;
        } else if (newOffset >= 0) {
          setDirection(-1);
          return 0;
        }
        return newOffset;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [direction]);

  // Scroll handler - marquee sticks to bottom until section ends
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();

        if (heroRect.bottom <= window.innerHeight) {
          setMarqueePosition('absolute');
        } else {
          setMarqueePosition('fixed');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Brand magnetic effect (navbar)
  const handleBrandMouseMove = (e) => {
    if (brandRef.current) {
      const rect = brandRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      setBrandOffset({ x: deltaX, y: deltaY });
    }
  };

  const handleBrandMouseEnter = () => {
    setBrandRotation(360);
  };

  const handleBrandMouseLeave = () => {
    setBrandOffset({ x: 0, y: 0 });
    setBrandRotation(0);
  };

  // Brand magnetic effect (menu)
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

  // Nav & menu link magnetic effect (shared)
  const handleLinkMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.12;
    const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.12;
    const rotation = Math.max(Math.min(deltaX * 0.08, 6), -6);
    el.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg) scale(1.05)`;
  };

  const handleLinkMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFabToggle = () => {
    setFabOpen((prev) => !prev);
  };

  const marqueeText = `${name} — ${name} — ${name} — ${name} — ${name} — `;

  return (
    <div className="hero-container" ref={heroRef}>
      <nav className="nav" ref={navRef}>
        <div
          className="nav-brand-wrapper"
          ref={brandRef}
          onMouseMove={handleBrandMouseMove}
          onMouseEnter={handleBrandMouseEnter}
          onMouseLeave={handleBrandMouseLeave}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div
            className="nav-brand"
            style={{
              transform: `translate(${brandOffset.x}px, ${brandOffset.y}px)`,
            }}
          >
            <span
              className="brand-symbol"
              style={{
                transform: `rotate(${brandRotation}deg)`,
              }}
            >
              ©
            </span>
            <div className="brand-text-container">
              <span className="brand-text brand-text-default">{brand}</span>
              <span className="brand-text brand-text-hover">{name}</span>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a
              href="/#recent-work"
              className="nav-link active"
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
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/about';
              }}
            >
              About
            </a>

            <a
              href="/contact"
              className="nav-link"
              onMouseMove={handleLinkMouseMove}
              onMouseLeave={handleLinkMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div className="photo-container">
        <img src={myPhoto} alt={name} className="hero-photo" />
      </div>

      <div className="role-wrapper">
        <div className="scroll-indicator">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L13 13M13 13H1M13 13V1" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="role-container">
          <div className="role-line">{role1}</div>
          <div className="role-line">{role2}</div>
        </div>
      </div>

      <div
        className={`marquee-container ${
          marqueePosition === 'absolute' ? 'marquee-absolute' : 'marquee-fixed'
        }`}
      >
        <div
          ref={marqueeRef}
          className="marquee-track"
          style={{ transform: `translateX(${scrollOffset}px)` }}
        >
          <span className="marquee-text">{marqueeText}</span>
        </div>
      </div>

      <div className="role-container-mobile">
        <div className="role-line">{role1}</div>
        <div className="role-line">{role2}</div>
      </div>

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
                      {brand}
                    </span>
                    <span className="menu-brand-text menu-brand-text-hover">
                      {name}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="/#recent-work"
                className="fullscreen-menu-link nav-link active"
                onMouseMove={handleLinkMouseMove}
                onMouseLeave={handleLinkMouseLeave}
                onClick={(e) => {
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
  );
}

export default PortfolioHero;