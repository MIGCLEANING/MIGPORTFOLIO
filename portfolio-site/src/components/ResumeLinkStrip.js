import React from 'react';
import './ResumeLinkStrip.css';
import resumePdf from '../assets/Resume.pdf';

function ResumeLinkStrip() {
  return (
    <section className="resume-strip">
      <div className="resume-strip__inner">
        <div className="resume-strip__text">
          <p className="strip-kicker">Want to check out my resume?</p>
          <p className="strip-body">
            It&apos;s here if you need it—quick PDF download, no fuss.
          </p>
        </div>
        <a className="resume-strip__cta" href={resumePdf} download>
          Download PDF
        </a>
      </div>
    </section>
  );
}

export default ResumeLinkStrip;
