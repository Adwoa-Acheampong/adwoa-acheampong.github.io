import React, { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import ContactForm from './components/ContactForm';
import MarketChart from './components/MarketChart';
import { 
  PERSONAL_INFO, 
  EXPERIENCE, 
  SERVICES, 
  PROCESS_STEPS, 
  BLOG_POSTS 
} from './constants/content';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { 
  Activity, TrendingUp, Github, Linkedin, Database, Zap, 
  Download, Mail, MapPin, Terminal, PieChart, 
  ChevronRight, Search, ArrowRight
} from 'lucide-react';

// Lazy load heavy sections for better initial load performance
const DashboardShowcase = lazy(() => import('./components/DashboardShowcase'));

// Custom styles (can be moved to separate CSS file)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --bg-body: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #666;
    --color-gold: #D4AF37;
    --color-teal: #008080;
    --color-magenta: #8B008B;
    --color-dark: #121212;
    --color-light: #ffffff;
  }

  body {
    background-color: var(--bg-body);
    color: var(--text-primary);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .font-mono { font-family: 'Space Mono', monospace; }

  .text-gradient {
    background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-teal) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .text-gold { color: var(--color-gold); }
  .text-teal { color: var(--color-teal); }
  
  /* Button styles */
  .btn-custom {
    padding: 14px 36px;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  
  .btn-primary-custom {
    background: var(--color-dark);
    color: white;
    border: 2px solid var(--color-dark);
  }
  
  .btn-primary-custom:hover {
    background: var(--color-teal);
    border-color: var(--color-teal);
    color: white;
    transform: translateY(-2px);
  }

  .btn-outline-custom {
    background: transparent;
    color: var(--color-dark);
    border: 2px solid var(--color-dark);
  }
  
  .btn-outline-custom:hover {
    background: var(--color-dark);
    color: white;
  }

  /* Navbar styles */
  .navbar-glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s;
    padding: 15px 0;
  }
  
  .navbar-scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    padding: 10px 0;
  }

  /* Hero image container */
  .hero-img-container {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 20px 20px 0px var(--color-gold);
    transition: transform 0.3s;
  }
  
  .hero-img-container:hover {
    transform: translate(-5px, -5px);
    box-shadow: 25px 25px 0px var(--color-teal);
  }

  /* Feature cards */
  .feature-card {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.4s ease;
    height: 100%;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    border-color: var(--color-gold);
  }
  
  /* Icon boxes */
  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  
  .bg-gold-soft { 
    background: rgba(212, 175, 55, 0.15); 
    color: var(--color-gold); 
  }
  
  .bg-teal-soft { 
    background: rgba(0, 128, 128, 0.15); 
    color: var(--color-teal); 
  }
  
  .bg-magenta-soft { 
    background: rgba(139, 0, 139, 0.15); 
    color: var(--color-magenta); 
  }

  /* Process steps */
  .process-step {
    position: relative;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    border-left: 4px solid var(--color-teal);
    transition: 0.3s;
  }
  
  .process-step:hover { 
    transform: translateX(10px); 
    border-color: var(--color-gold); 
  }
  
  .step-number {
    position: absolute;
    top: -20px;
    right: 20px;
    font-size: 4rem;
    font-weight: 900;
    color: rgba(0,0,0,0.03);
    font-family: 'Space Mono', monospace;
  }

  /* Dashboard frame */
  .dashboard-frame {
    background: #1e1e24;
    border-radius: 20px;
    border: 1px solid #333;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    overflow: hidden;
  }
  
  .window-header {
    background: #2b2b36;
    padding: 12px 20px;
    display: flex;
    gap: 8px;
    border-bottom: 1px solid #333;
  }
  
  .dot { 
    width: 10px; 
    height: 10px; 
    border-radius: 50%; 
  }
  
  .dot-red { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green { background: #27c93f; }

  /* Timeline */
  .timeline-item {
    position: relative;
    padding-left: 3rem;
    padding-bottom: 3rem;
    border-left: 2px solid #e0e0e0;
  }
  
  .timeline-item:last-child { 
    border-left: 2px solid transparent; 
  }
  
  .timeline-marker {
    position: absolute;
    left: -9px;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    border: 4px solid var(--color-teal);
    transition: all 0.3s;
  }
  
  .timeline-item:hover .timeline-marker {
    background: var(--color-gold);
    border-color: var(--color-gold);
    transform: scale(1.3);
  }

  /* Animations */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-float { 
    animation: float 4s ease-in-out infinite; 
  }

  /* Fade in animation for lazy loaded components */
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Accessibility improvements */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Focus styles for better keyboard navigation */
  a:focus, button:focus, input:focus, textarea:focus {
    outline: 2px solid var(--color-teal);
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    .no-print {
      display: none !important;
    }
  }
`;

// Service icon mapping
const getServiceIcon = (iconName) => {
  const icons = {
    Terminal,
    PieChart,
    Zap
  };
  return icons[iconName] || Terminal;
};

// Animated Section wrapper for intersection observer
const AnimatedSection = ({ children, className = '' }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref} 
      className={`${className} ${isIntersecting ? 'fade-in' : ''}`}
      style={{ opacity: isIntersecting ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

// Hero Section Component
const Hero = () => (
  <section 
    id="hero"
    className="min-vh-100 d-flex align-items-center pt-5 bg-light position-relative overflow-hidden"
    aria-labelledby="hero-heading"
  >
    <div 
      className="position-absolute top-0 end-0 opacity-10" 
      style={{ right: '-10%', top: '-10%' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="600" height="600">
        <path 
          fill="#008080" 
          d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.9,59.3C22.7,67.2,10.2,74.5,-1.1,76.4C-12.4,78.3,-23.7,74.8,-34.4,68.6C-45.1,62.4,-55.2,53.5,-64.1,42.9C-73,32.3,-80.7,20,-82.7,6.8C-84.7,-6.4,-81,-20.5,-73.3,-31.9C-65.6,-43.3,-53.9,-52,-41.5,-59.9C-29.1,-67.8,-16,-74.9,-0.7,-73.7L0,0Z" 
          transform="translate(100 100)" 
        />
      </svg>
    </div>

    <div className="container position-relative z-1 pt-5 mt-4">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border mb-4 shadow-sm">
            <div className="spinner-grow spinner-grow-sm text-success" role="status">
              <span className="sr-only">Available</span>
            </div>
            <span className="small fw-bold text-secondary">Available for Projects</span>
          </div>
          
          <h1 id="hero-heading" className="display-3 fw-black mb-4 lh-1 text-dark">
            Data Driven. <br />
            <span className="text-gradient">Operationally Focused.</span>
          </h1>
          
          <p className="lead text-secondary mb-5 w-75">
            {PERSONAL_INFO.bio}
          </p>
          
          <div className="d-flex flex-column flex-md-row gap-3 mb-5">
            <div className="d-flex align-items-center gap-3 text-secondary">
              <div className="bg-white p-2 rounded-circle border">
                <MapPin size={20} aria-hidden="true" />
              </div>
              <span>Based in {PERSONAL_INFO.location}</span>
            </div>
            <div className="d-flex align-items-center gap-3 text-secondary">
              <div className="bg-white p-2 rounded-circle border">
                <Mail size={20} aria-hidden="true" />
              </div>
              <span>{PERSONAL_INFO.email}</span>
            </div>
          </div>
        </div>

        <div className="col-lg-5 offset-lg-1 order-1 order-lg-2 mb-5 mb-lg-0">
          <div className="hero-img-container animate-float">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt={`${PERSONAL_INFO.name} - Professional headshot`}
              className="img-fluid w-100"
              style={{ objectFit: 'cover', height: '550px' }}
              loading="eager"
            />
          </div>
          <h2 
            className="display-1 fw-black text-uppercase mt-4 text-center text-lg-end opacity-25" 
            style={{letterSpacing: '-0.05em'}}
            aria-hidden="true"
          >
            Analyst.
          </h2>
        </div>
      </div>
    </div>
  </section>
);

// About Section Component
const About = () => (
  <AnimatedSection>
    <section id="about" className="py-5 bg-white" aria-labelledby="about-heading">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="p-4 bg-light rounded-4 border position-relative">
              <span className="position-absolute top-0 start-0 translate-middle bg-dark text-white px-3 py-1 rounded font-mono small">
                Philosophy
              </span>
              <blockquote className="fst-italic fs-5 text-secondary mt-2 mb-3">
                "Operational efficiency isn't just about cutting costs—it's about using data to empower decision-making. I believe every data point tells a story about business health."
              </blockquote>
              <cite className="fw-bold text-end d-block">- {PERSONAL_INFO.name.split(' ')[0]}</cite>
            </div>
          </div>
          
          <div className="col-lg-6 offset-lg-1">
            <h2 id="about-heading" className="display-5 fw-bold mb-4">More Than Just Numbers</h2>
            <p className="text-secondary mb-4">
              I combine a strong background in <strong>Statutory Compliance</strong> with modern{' '}
              <strong>Data Science</strong> techniques. While my competitors focus on one or the other, 
              I offer the unique ability to understand the <em>legal</em> constraints of a business 
              while optimizing its <em>performance</em> algorithms.
            </p>
            <div className="row g-4 mt-2">
              <div className="col-6">
                <h3 className="fw-bold text-teal display-4">3+</h3>
                <p className="text-secondary small text-uppercase fw-bold">Years Experience</p>
              </div>
              <div className="col-6">
                <h3 className="fw-bold text-gold display-4">150%</h3>
                <p className="text-secondary small text-uppercase fw-bold">Rev. Growth Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Services Section Component
const Services = () => (
  <AnimatedSection>
    <section id="services" className="py-5 bg-light" aria-labelledby="services-heading">
      <div className="container py-5">
        <div className="row mb-5 text-center">
          <div className="col-lg-8 mx-auto">
            <span className="text-gold text-uppercase fw-bold small ls-2">Expertise</span>
            <h2 id="services-heading" className="display-5 fw-bold text-dark">How I Add Value</h2>
          </div>
        </div>
        
        <div className="row g-4">
          {SERVICES.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div key={service.id} className="col-md-4">
                <article className="feature-card">
                  <div className={`icon-box bg-${service.color}-soft`}>
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h3 className="fw-bold mb-3 text-dark h4">{service.title}</h3>
                  <p className="text-secondary">{service.description}</p>
                  {service.features && (
                    <ul className="list-unstyled mt-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-2 mb-2">
                          <ChevronRight size={14} className="text-gold" aria-hidden="true" />
                          <span className="small text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Process Section Component
const Process = () => (
  <AnimatedSection>
    <section className="py-5 bg-white" aria-labelledby="process-heading">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-lg-6">
            <h2 id="process-heading" className="fw-bold display-6">My Workflow</h2>
            <p className="text-secondary">A systematic approach to solving operational chaos.</p>
          </div>
        </div>
        
        <div className="row g-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className="col-md-4">
              <article className="process-step">
                <span className="step-number" aria-hidden="true">{step.number}</span>
                <h3 className="fw-bold mb-3 h4">{step.title}</h3>
                <p className="text-secondary">{step.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Experience Section Component
const Experience = () => (
  <AnimatedSection>
    <section id="experience" className="py-5 bg-white" aria-labelledby="experience-heading">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 id="experience-heading" className="fw-bold mb-5 text-center text-dark">
              Professional Journey
            </h2>
            
            <div className="ps-4" role="list">
              {EXPERIENCE.map((job) => (
                <article key={job.id} className="timeline-item" role="listitem">
                  <div className="timeline-marker" aria-hidden="true"></div>
                  <time className="badge bg-secondary bg-opacity-10 text-dark mb-2">
                    {job.date}
                  </time>
                  <h3 className="fw-bold mb-1 text-dark h4">{job.role}</h3>
                  <h4 className="text-teal mb-3 fw-bold text-uppercase small h6">
                    {job.company}
                  </h4>
                  <p className="text-secondary mb-3">{job.description}</p>
                  {job.achievements && (
                    <ul className="list-unstyled">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-2 mb-2">
                          <ChevronRight size={14} className="text-gold" aria-hidden="true" />
                          <span className="small text-secondary">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Blog Section Component
const Blog = () => (
  <AnimatedSection>
    <section id="insights" className="py-5 bg-light" aria-labelledby="blog-heading">
      <div className="container py-5">
        <h2 id="blog-heading" className="fw-bold display-6 mb-5">Latest Insights</h2>
        
        <div className="row g-4">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="col-md-4">
              <div className="bg-white p-4 rounded-4 border h-100 d-flex flex-column">
                <div className="mb-auto">
                  <span className="badge bg-light text-dark border mb-3">
                    {post.category}
                  </span>
                  <h3 className="fw-bold mb-2 h5">{post.title}</h3>
                  <p className="text-secondary small">{post.excerpt}</p>
                </div>
                <footer className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <time className="text-muted small">{post.date}</time>
                  <a 
                    href="#" 
                    className="text-dark fw-bold small text-decoration-none d-flex align-items-center gap-1"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </AnimatedSection>
);

// Bottom CTA Section Component
const BottomCTA = () => (
  <section className="py-5 bg-dark text-white text-center" aria-labelledby="cta-heading">
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 id="cta-heading" className="fw-bold display-5 mb-4">
            Ready to Optimize Your Business?
          </h2>
          <p className="text-white-50 mb-5 fs-5">
            Download my resume to see my full qualifications, or browse my portfolio to see my code in action.
          </p>
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
            <a 
              href="#portfolio" 
              className="btn btn-custom btn-primary-custom border-light text-white"
              aria-label="View portfolio"
            >
              View Portfolio <Search size={18} aria-hidden="true" />
            </a>
            <a 
              href="#" 
              className="btn btn-custom btn-outline-custom border-light text-white hover-light"
              aria-label="Download resume"
            >
              Download Resume <Download size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-light pt-5 border-top" role="contentinfo">
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h3 className="fw-bold mb-4 text-dark">{PERSONAL_INFO.name}</h3>
          <address className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <Mail size={18} className="text-secondary" aria-hidden="true" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-secondary text-decoration-none">
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="d-flex align-items-center gap-3">
              <MapPin size={18} className="text-secondary" aria-hidden="true" />
              <span className="text-secondary">{PERSONAL_INFO.location}</span>
            </div>
          </address>
        </div>
        
        <div className="col-lg-6 text-lg-end">
          <div className="d-flex gap-3 justify-content-lg-end mb-4">
            <a 
              href={PERSONAL_INFO.linkedIn} 
              className="btn btn-outline-dark rounded-circle p-3"
              aria-label="LinkedIn Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a 
              href={PERSONAL_INFO.github} 
              className="btn btn-outline-dark rounded-circle p-3"
              aria-label="GitHub Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} aria-hidden="true" />
            </a>
          </div>
          <p className="text-secondary small">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// Main App Component
const App = () => {
  // Dynamic Bootstrap Import
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    return () => document.head.removeChild(link);
  }, []);

  // Set page title
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role}`;
  }, []);

  return (
    <ErrorBoundary>
      <style>{customStyles}</style>
      
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>
      
      <NavBar />
      
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Process />
        
        <Suspense fallback={<LoadingSpinner />}>
          <DashboardShowcase />
        </Suspense>
        
        <Experience />
        <Blog />
        <ContactForm />
        <BottomCTA />
      </main>
      
      <Footer />
    </ErrorBoundary>
  );
};

export default App;