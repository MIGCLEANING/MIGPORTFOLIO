import React, { useState, useRef, useEffect } from 'react';
import './IntroSection.css';
import migScreenshot from '../assets/mig-screenshot.png';
import clinicmateScreenshot from '../assets/clinicmate-screenshot.png';

function IntroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeWork, setActiveWork] = useState('mig');
  const [aboutOffset, setAboutOffset] = useState({ x: 0, y: 0 });
  const [aboutTextOffset, setAboutTextOffset] = useState({ x: 0, y: 0 });
  const workItemRef = useRef(null);
  const animationRef = useRef(null);
  const aboutButtonRef = useRef(null);

  // Smooth follow effect - image follows cursor with delay
  useEffect(() => {
  const animate = () => {
    setImagePos(prev => ({
      x: prev.x + (mousePos.x - prev.x) * 0.06,
      y: prev.y + (mousePos.y - prev.y) * 0.06,
    }));
    animationRef.current = requestAnimationFrame(animate);
  };

  animationRef.current = requestAnimationFrame(animate);

  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, [mousePos]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (id) => (e) => {
    // Set initial position immediately to prevent jump
    setMousePos({ x: e.clientX, y: e.clientY });
    setImagePos({ x: e.clientX, y: e.clientY });
    setActiveWork(id);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleAboutMouseMove = (e) => {
    if (!aboutButtonRef.current) return;
    const rect = aboutButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;

    // Text reacts faster, outer circle lags slightly for a follow-on feel
    setAboutTextOffset({ x: deltaX * 1.1, y: deltaY * 1.1 });
    setAboutOffset({ x: deltaX * 0.7, y: deltaY * 0.7 });
  };

  const handleAboutMouseLeave = () => {
    setAboutOffset({ x: 0, y: 0 });
    setAboutTextOffset({ x: 0, y: 0 });
  };

  return (
    <section className="intro-section">
      <div className="intro-inner">
        <div className="intro-content">
          <h2 className="intro-heading">
            Helping families and businesses maintain clean, healthy spaces. 
            Together we'll create environments you're proud of. No shortcuts, 
            always going above and beyond expectations.
          </h2>
          
          <div className="intro-right">
            <p className="intro-description">
              The combination of my passion for service, attention to detail & 
              building trust positions me in a unique place in the cleaning industry.
            </p>
            
            <a
              href="#about"
              className="about-button"
              ref={aboutButtonRef}
              onMouseMove={handleAboutMouseMove}
              onMouseLeave={handleAboutMouseLeave}
              style={{
                '--about-tx': `${aboutOffset.x}px`,
                '--about-ty': `${aboutOffset.y}px`,
              }}
            >
              <div
                className="about-button-inner"
                style={{
                  transform: `translate(${aboutTextOffset.x}px, ${aboutTextOffset.y}px)`,
                }}
              >
                <span className="about-symbol">MIG</span>
              </div>
            </a>
          </div>
        </div>

        <div className="recent-work" id="recent-work">
          <p className="recent-work-label">RECENT WORK</p>
        </div>

        <a 
          href="https://migcleaning.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="work-item"
          ref={workItemRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter('mig')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="work-item-content">
            <h3 className="work-title">MIG CLEANING ORGANIZATION</h3>
            <span className="work-type">Residential & Commercial Cleaning</span>
          </div>
        </a>

        <a 
          href="https://f25-4140-clinicmate-backend.onrender.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="work-item"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter('clinicmate')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="work-item-content">
            <h3 className="work-title">ClinicMate</h3>
            <span className="work-type">React.JS | UX/UI Design</span>
          </div>
        </a>

        {/* Floating cursor-follow view button (single) */}
        <div
          className={`view-button ${isHovering ? 'visible' : ''}`}
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
        >
          <span>View</span>
        </div>

        <div 
          className={`work-preview ${isHovering ? 'visible' : ''}`}
          style={{
            left: imagePos.x,
            top: imagePos.y,
          }}
        >
          <div className="work-preview-card">
            <div className={`preview-layers ${activeWork === 'clinicmate' ? 'clinic-active' : ''}`}>
              <div className="preview-layer preview-mig">
                <img src={migScreenshot} alt="MIG Cleaning Preview" />
              </div>
              <div className="preview-layer preview-clinic">
                <img src={clinicmateScreenshot} alt="ClinicMate Preview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
