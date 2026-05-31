import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      title: 'Quantum Platform',
      description: 'A cloud computing analytics dashboard that features real-time charts, distributed server metrics tracking, and instant alerts setup.',
      tags: ['Next.js', 'React', 'Three.js', 'WebSockets'],
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      demoUrl: 'https://github.com/daboysasss',
      codeUrl: 'https://github.com/daboysasss'
    },
    {
      title: 'Aether Engine',
      description: 'A lightweight WebGL rendering pipeline built on top of OGL for rendering high-fidelity interactive physics simulations directly in the browser.',
      tags: ['React', 'OGL', 'WebGL', 'GLSL'],
      gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      demoUrl: 'https://github.com/daboysasss',
      codeUrl: 'https://github.com/daboysasss'
    },
    {
      title: 'Nebula Analytics',
      description: 'A high-performance machine learning operational suite displaying predictive data pipelines, neural network structures, and model latency histograms.',
      tags: ['FastAPI', 'Python', 'React', 'TailwindCSS'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      demoUrl: 'https://github.com/daboysasss',
      codeUrl: 'https://github.com/daboysasss'
    },
    {
      title: 'Siren WebGL Editor',
      description: 'An immersive digital synthesizer and waveform generator with real-time reactive sound rendering, audio effects nodes, and spatial visualization.',
      tags: ['TypeScript', 'WebAudio API', 'WebGL', 'CSS Grid'],
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      demoUrl: 'https://github.com/daboysasss',
      codeUrl: 'https://github.com/daboysasss'
    }
  ];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Portfolio</h2>
        <div className="title-glow-line"></div>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-preview" style={{ background: project.gradient }}>
              <div className="preview-glow"></div>
              <span className="preview-tag">Interactive</span>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="tag-pill">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-btn demo-btn">
                  <span>Live Demo</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="project-btn code-btn">
                  <span>View Code</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
