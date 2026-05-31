import React from 'react';
import './About.css';
import GlareHover from '../GlareHover/GlareHover';

const About = () => {
  const stats = [
    { 
      value: '17', 
      label: 'TOTAL PROJECTS', 
      desc: 'Innovative web solutions crafted',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    { 
      value: '8', 
      label: 'CERTIFICATES', 
      desc: 'Professional skills validated',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
          <path d="M19.62 10.4a9 9 0 0 1-1.9 2.87l1.28 5.73-5-3-5 3 1.28-5.73a9 9 0 0 1-1.9-2.87"></path>
        </svg>
      )
    },
    { 
      value: '4', 
      label: 'YEARS OF EXPERIENCE', 
      desc: 'Continuous learning journey',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    }
  ];

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-glow-line"></div>
      </div>

      <div className="about-main-content">
        <div className="about-bio-pane">
          <h3 className="hello-text">Hello, I'm</h3>
          <h1 className="name-text">Arsenii Bocharnikov</h1>
          
          <p className="bio-description">
            I am a developer specializing in building modern, fast, and interactive web interfaces. 
            My goal is to transform complex ideas into elegant digital solutions and deliver a first-class user experience in every project.
          </p>

          <div className="quote-box">
            <div className="quote-icon-container">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.944 2c-3.089 1.116-4.944 3.32-4.944 5h4v8h-10v-3.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.944 2c-3.089 1.116-4.944 3.32-4.944 5h4v8h-10v-3.275z"/>
              </svg>
            </div>
            <p className="quote-text">“Leveraging AI as a professional tool, not a replacement.”</p>
          </div>

          <div className="about-actions">
            <a href="/cv.pdf" className="about-btn cv-btn" download>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span>Download CV</span>
            </a>
            
            <a href="#portfolio" onClick={handleScrollToProjects} className="about-btn projects-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <span>View Projects</span>
            </a>
          </div>
        </div>

        <div className="about-photo-pane">
          <div className="photo-glow-wrapper">
            <GlareHover
              width="100%"
              height="100%"
              borderRadius="50%"
              background="transparent"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={0.6}
              glareSize={200}
              transitionDuration={800}
            >
              <div className="photo-inner-circle">
                <img src="/developer_profile.JPG" alt="Arsenii Bocharnikov" className="developer-img" />
              </div>
            </GlareHover>
          </div>
        </div>
      </div>

      <div className="about-stats-row">
        {stats.map((stat, idx) => (
          <div key={idx} className="about-stat-card">
            <div className="card-top-row">
              <div className="stat-card-icon">{stat.icon}</div>
              <span className="stat-card-value">{stat.value}</span>
            </div>
            
            <div className="card-bottom-content">
              <h4 className="stat-card-label">{stat.label}</h4>
              <p className="stat-card-desc">{stat.desc}</p>
            </div>
            
            <div className="stat-card-arrow">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
