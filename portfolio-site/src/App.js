import React, { useEffect } from 'react';
import PortfolioHero from './components/PortfolioHero';
import IntroSection from './components/IntroSection';
import ResumeLinkStrip from './components/ResumeLinkStrip';
import ContactFooter from './components/ContactFooter';

function App() {
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="App">
      <PortfolioHero />
      <IntroSection />
      <ResumeLinkStrip />
      <ContactFooter />
    </div>
  );
}

export default App;
