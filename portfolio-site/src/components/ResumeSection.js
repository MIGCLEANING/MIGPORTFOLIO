import React from 'react';
import './ResumeSection.css';
import resumePdf from '../assets/Resume.pdf';

// If you prefer a PNG/JPG in /public, set the path below instead.
const resumeImageUrl = '';

function ResumeSection() {
  const resumeUrl = resumeImageUrl || resumePdf;
  const isPdf = resumeUrl.toLowerCase().endsWith('.pdf');
  const pdfDisplayUrl = isPdf
    ? `${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`
    : '';

  return (
    <section id="resume" className="resume-section">
      <div className="resume-inner">
        <div className="resume-header">
          <p className="resume-kicker">Resume</p>
          <h2 className="resume-heading">Founder, Developer & Builder.</h2>
          <p className="resume-copy">
            I combine my passion for design, code, and business to build real products and real impact.
          </p>
          <a className="resume-download" href={resumePdf} download target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </div>

        <div className="resume-frame">
          <div className="resume-outline">
            {isPdf ? (
              <embed
                src={pdfDisplayUrl}
                type="application/pdf"
                className="resume-embed"
                aria-label="Resume PDF"
              />
            ) : (
              <img src={resumeUrl} alt="Resume" className="resume-image" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;
