import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  Activity, TrendingUp, Menu, X, Github, Linkedin, 
  Database, Zap, Download, Mail, MapPin, 
  Phone, Code, PieChart, Terminal, ChevronRight,
  FileText, Send, Search, Cpu, ArrowRight
} from 'lucide-react';

// --- CUSTOM CSS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Space+Mono:wght@400;700&display=swap');

  :root {
    --bg-body: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #666;
    
    /* Afrocentric Modern Palette */
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

  /* --- UI UTILITIES --- */
  .text-gradient {
    background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-teal) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text-gold { color: var(--color-gold); }
  .text-teal { color: var(--color-teal); }
  
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

  /* --- NAVBAR --- */
  .navbar-glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s;
    padding: 15px 0;
  }
  .navbar-scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
    padding: 10px 0;
  }

  /* --- HERO --- */
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

  /* --- CARDS & SECTIONS --- */
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
  
  .icon-box {
    width: 60px; height: 60px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  .bg-gold-soft { background: rgba(212, 175, 55, 0.15); color: var(--color-gold); }
  .bg-teal-soft { background: rgba(0, 128, 128, 0.15); color: var(--color-teal); }
  .bg-magenta-soft { background: rgba(139, 0, 139, 0.15); color: var(--color-magenta); }

  .process-step {
    position: relative;
    padding: 2rem;
    background: white;
    border-radius: 16px;
    border-left: 4px solid var(--color-teal);
    transition: 0.3s;
  }
  .process-step:hover { transform: translateX(10px); border-color: var(--color-gold); }
  .step-number {
    position: absolute; top: -20px; right: 20px;
    font-size: 4rem; font-weight: 900; color: rgba(0,0,0,0.03);
    font-family: 'Space Mono', monospace;
  }

  /* --- DASHBOARD MOCKUP --- */
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
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green { background: #27c93f; }

  /* --- TIMELINE --- */
  .timeline-item {
    position: relative;
    padding-left: 3rem;
    padding-bottom: 3rem;
    border-left: 2px solid #e0e0e0;
  }
  .timeline-item:last-child { border-left: 2px solid transparent; }
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
  .animate-float { animation: float 4s ease-in-out infinite; }
  
  /* Recharts Override */
  .recharts-wrapper { margin: 0 auto; }
`;

const content = {
  name: "Adwoa B. Acheampong",
  role: "Operations Director & Data Analyst",
  tagline: "Turning Chaos into Operational Clarity.",
  bio: "Results-oriented professional bridging the gap between Statutory Operations and Advanced Data Analytics using SQL, Tableau, and AI.",
  email: "adwoa@jonmonsacs.com",
  phone: "(233) 276-291-485",
  location: "Accra, Ghana"
};

// --- SUB-COMPONENTS ---

const MarketChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const initialData = Array.from({ length: 15 }, (_, i) => ({
      time: i, value: 4000 + Math.random() * 1000
    }));
    setData(initialData);
    const interval = setInterval(() => {
      setData(prev => {
        const lastVal = prev[prev.length - 1].value;
        const newVal = lastVal + (Math.random() - 0.5) * 500;
        return [...prev.slice(1), { time: prev.length, value: newVal }];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-100 p-4">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <p className="text-secondary font-mono mb-1 text-uppercase small">Revenue Trend</p>
          <h2 className="m-0 fw-bold text-white">GHS 42,500</h2>
        </div>
        <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill">
          +12.5% <TrendingUp size={14} className="ms-1" />
        </span>
      </div>
      <div style={{ height: 200, width: '100%' }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#2b2b36', borderColor: '#444', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ display: 'none' }}
            />
            <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TechBadge = ({ icon: Icon, label }) => (
  <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-pill bg-white shadow-sm">
    <Icon size={16} className="text-gold" />
    <span className="small fw-bold">{label}</span>
  </div>
);

// --- SECTIONS ---

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Added state for menu

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-glass ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <div className="bg-dark text-white rounded px-2 py-1 font-mono fw-bold">A.</div>
          <span className="fw-bold tracking-tight text-dark">ACHEAMPONG</span>
        </a>
        {/* Modified Button with React onClick handler */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Added conditional class logic for visibility */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="nav">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-4 pt-3 pt-lg-0">
            <li className="nav-item"><a className="nav-link text-dark fw-medium" href="#about" onClick={() => setIsOpen(false)}>About</a></li>
            <li className="nav-item"><a className="nav-link text-dark fw-medium" href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
            <li className="nav-item"><a className="nav-link text-dark fw-medium" href="#portfolio" onClick={() => setIsOpen(false)}>Work</a></li>
            <li className="nav-item"><a className="nav-link text-dark fw-medium" href="#insights" onClick={() => setIsOpen(false)}>Insights</a></li>
            <li className="nav-item mt-3 mt-lg-0">
              <a href="#contact" className="btn btn-dark rounded-pill px-4 btn-sm text-white" onClick={() => setIsOpen(false)}>Let's Talk</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="min-vh-100 d-flex align-items-center pt-5 bg-light position-relative overflow-hidden">
    <div className="position-absolute top-0 end-0 opacity-10" style={{ right: '-10%', top: '-10%' }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="600" height="600">
        <path fill="#008080" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.9,59.3C22.7,67.2,10.2,74.5,-1.1,76.4C-12.4,78.3,-23.7,74.8,-34.4,68.6C-45.1,62.4,-55.2,53.5,-64.1,42.9C-73,32.3,-80.7,20,-82.7,6.8C-84.7,-6.4,-81,-20.5,-73.3,-31.9C-65.6,-43.3,-53.9,-52,-41.5,-59.9C-29.1,-67.8,-16,-74.9,-0.7,-73.7L0,0Z" transform="translate(100 100)" />
      </svg>
    </div>

    <div className="container position-relative z-1 pt-5 mt-4">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border mb-4 shadow-sm">
            <div className="spinner-grow spinner-grow-sm text-success" role="status" />
            <span className="small fw-bold text-secondary">Available for Projects</span>
          </div>
          <h1 className="display-3 fw-black mb-4 lh-1 text-dark">
            Data Driven. <br />
            <span className="text-gradient">Operationally Focused.</span>
          </h1>
          <p className="lead text-secondary mb-5 w-75">
            {content.bio}
          </p>
          
          {/* Buttons removed from here as requested */}
          <div className="d-flex flex-column flex-md-row gap-3 mb-5">
            <div className="d-flex align-items-center gap-3 text-secondary">
              <div className="bg-white p-2 rounded-circle border"><MapPin size={20} /></div>
              <span>Based in {content.location}</span>
            </div>
            <div className="d-flex align-items-center gap-3 text-secondary">
               <div className="bg-white p-2 rounded-circle border"><Mail size={20} /></div>
               <span>{content.email}</span>
            </div>
          </div>

        </div>

        <div className="col-lg-5 offset-lg-1 order-1 order-lg-2 mb-5 mb-lg-0">
          <div className="hero-img-container animate-float">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Adwoa Profile" 
              className="img-fluid w-100"
              style={{ objectFit: 'cover', height: '550px' }}
            />
          </div>
          <h2 className="display-1 fw-black text-uppercase mt-4 text-center text-lg-end opacity-25" style={{letterSpacing: '-0.05em'}}>
            Analyst.
          </h2>
        </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-5 bg-white">
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-lg-5 mb-5 mb-lg-0">
          <div className="p-4 bg-light rounded-4 border position-relative">
            <span className="position-absolute top-0 start-0 translate-middle bg-dark text-white px-3 py-1 rounded font-mono small">Philosophy</span>
            <p className="fst-italic fs-5 text-secondary mt-2">
              "Operational efficiency isn't just about cutting costs—it's about using data to empower decision-making. I believe every data point tells a story about business health."
            </p>
            <h6 className="fw-bold text-end mt-3">- Adwoa A.</h6>
          </div>
        </div>
        <div className="col-lg-6 offset-lg-1">
          <h2 className="display-5 fw-bold mb-4">More Than Just Numbers</h2>
          <p className="text-secondary mb-4">
            I combine a strong background in <strong>Statutory Compliance</strong> with modern <strong>Data Science</strong> techniques. While my competitors focus on one or the other, I offer the unique ability to understand the *legal* constraints of a business while optimizing its *performance* algorithms.
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
);

const Services = () => (
  <section id="services" className="py-5 bg-light">
    <div className="container py-5">
      <div className="row mb-5 text-center">
        <div className="col-lg-8 mx-auto">
          <span className="text-gold text-uppercase fw-bold small ls-2">Expertise</span>
          <h2 className="display-5 fw-bold text-dark">How I Add Value</h2>
        </div>
      </div>
      
      <div className="row g-4">
        {[
          {
            icon: Terminal, color: 'bg-gold-soft', 
            title: "Business Operations", 
            desc: "Designing Standard Operating Procedures (SOPs) and compliance frameworks that protect the business and streamline workflow."
          },
          {
            icon: PieChart, color: 'bg-teal-soft', 
            title: "Data Analytics", 
            desc: "Translating raw SQL databases into interactive Tableau dashboards to uncover hidden revenue opportunities."
          },
          {
            icon: Zap, color: 'bg-magenta-soft', 
            title: "Automation", 
            desc: "Connecting Google Workspace with AI agents to automate administrative redundancy, saving 10+ hours weekly."
          }
        ].map((s, i) => (
          <div key={i} className="col-md-4">
            <div className="feature-card">
              <div className={`icon-box ${s.color}`}>
                <s.icon size={28} />
              </div>
              <h4 className="fw-bold mb-3 text-dark">{s.title}</h4>
              <p className="text-secondary">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-5 bg-white">
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-6">
          <h2 className="fw-bold display-6">My Workflow</h2>
          <p className="text-secondary">A systematic approach to solving operational chaos.</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="process-step">
            <span className="step-number">01</span>
            <h4 className="fw-bold mb-3">Audit & Discovery</h4>
            <p className="text-secondary">I dive deep into your current operations, reviewing statutory compliance and data infrastructure to find bottlenecks.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="process-step">
            <span className="step-number">02</span>
            <h4 className="fw-bold mb-3">Strategy & Code</h4>
            <p className="text-secondary">I design a roadmap. This involves writing SQL queries, setting up Tableau dashboards, or drafting SOPs.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="process-step">
            <span className="step-number">03</span>
            <h4 className="fw-bold mb-3">Automate & Scale</h4>
            <p className="text-secondary">Implementation. I set up automated scripts to keep things running smoothly and train your team on the new systems.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DashboardShowcase = () => (
  <section id="portfolio" className="py-5 bg-dark text-white position-relative overflow-hidden">
    <div className="container py-5 position-relative z-1">
      <div className="row align-items-center mb-5">
        <div className="col-lg-5 mb-4 mb-lg-0">
          <span className="text-gold font-mono text-uppercase small ls-1">Live Portfolio</span>
          <h2 className="display-5 fw-bold mt-2">Interactive Analytics</h2>
          <p className="text-white-50 mb-4">
            I don't just report data; I build tools that monitor it in real-time. 
            This component is a functional React widget demonstrating my frontend capabilities alongside backend logic.
          </p>
          <ul className="list-unstyled text-white-50 mb-4">
            <li className="mb-2 d-flex align-items-center gap-2"><Activity size={16} className="text-success"/> Real-time Data Rendering</li>
            <li className="mb-2 d-flex align-items-center gap-2"><Database size={16} className="text-info"/> Complex State Management</li>
            <li className="d-flex align-items-center gap-2"><Zap size={16} className="text-warning"/> Responsive Design</li>
          </ul>
        </div>
        <div className="col-lg-7">
          <div className="dashboard-frame">
            <div className="window-header">
              <div className="dot dot-red"></div>
              <div className="dot dot-yellow"></div>
              <div className="dot dot-green"></div>
              <span className="ms-3 text-secondary font-mono small">admin@dashboard:~/analytics</span>
            </div>
            <div className="row g-0">
              <div className="col-md-8 border-end border-secondary border-opacity-25">
                <MarketChart />
              </div>
              <div className="col-md-4 bg-white bg-opacity-5 p-4">
                <h6 className="text-uppercase font-mono text-white-50 mb-3 small">Live Transactions</h6>
                {[
                  { name: "Cafe Rev", val: "+850", color: "text-success" },
                  { name: "Consulting", val: "+1,200", color: "text-success" },
                  { name: "Server Cost", val: "-120", color: "text-danger" },
                  { name: "License Fee", val: "-500", color: "text-danger" },
                ].map((t, i) => (
                  <div key={i} className="d-flex justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-2">
                    <span className="small text-white-50">{t.name}</span>
                    <span className={`small fw-bold font-mono ${t.color}`}>{t.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-5 bg-white">
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-5 text-center text-dark">Professional Journey</h2>
          <div className="ps-4">
            {[
              {
                role: "Statutory Operations Director",
                company: "JonMon-Sacs Ghana Ltd",
                date: "Jul 2025 - Present",
                desc: "Superintending business licensing and regulatory compliance relative to the laws of Ghana. Leading a team of 5 officers."
              },
              {
                role: "Operations Manager",
                company: "Baa & Bean Café's",
                date: "Feb 2024 - Jul 2024",
                desc: "Drove daily revenue from GHS12k to GHS30k+ in 3 months via data-driven menu optimization and supply chain restructuring."
              },
              {
                role: "Administration Manager",
                company: "Zein Real Estate",
                date: "Mar 2023 - Jan 2024",
                desc: "Improved office productivity by 10% through automation (Appscript + ChatGPT) and digital filing systems."
              }
            ].map((job, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker"></div>
                <span className="badge bg-secondary bg-opacity-10 text-dark mb-2">{job.date}</span>
                <h4 className="fw-bold mb-1 text-dark">{job.role}</h4>
                <h6 className="text-teal mb-3 fw-bold text-uppercase small" style={{color: 'var(--color-teal)'}}>{job.company}</h6>
                <p className="text-secondary mb-0">{job.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </section>
);

const Blog = () => (
  <section id="insights" className="py-5 bg-light">
    <div className="container py-5">
      <h2 className="fw-bold display-6 mb-5">Latest Insights</h2>
      <div className="row g-4">
        {[
          { title: "Optimizing Cafe Revenue with SQL", cat: "Data Analysis", date: "Oct 12, 2024" },
          { title: "Automating Office Workflows with AppScript", cat: "Automation", date: "Sept 28, 2024" },
          { title: "Understanding Statutory Compliance in Ghana", cat: "Operations", date: "Aug 15, 2024" }
        ].map((post, i) => (
          <div key={i} className="col-md-4">
            <div className="bg-white p-4 rounded-4 border h-100 d-flex flex-column">
              <div className="mb-auto">
                <span className="badge bg-light text-dark border mb-3">{post.cat}</span>
                <h4 className="fw-bold mb-2 h5">{post.title}</h4>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <small className="text-muted">{post.date}</small>
                <a href="#" className="text-dark fw-bold small text-decoration-none">Read <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactForm = () => (
  <section id="contact" className="py-5">
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
           <h2 className="fw-bold display-6">Get In Touch</h2>
           <p className="text-secondary">Have a project in mind? Let's discuss how data can solve your problems.</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm border">
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Name</label>
              <input type="text" className="form-control bg-light border-0 p-3" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">Email</label>
              <input type="email" className="form-control bg-light border-0 p-3" placeholder="name@company.com" />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">Message</label>
              <textarea className="form-control bg-light border-0 p-3" rows="4" placeholder="Tell me about your operational challenges..."></textarea>
            </div>
            <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BottomCTA = () => (
  <section className="py-5 bg-dark text-white text-center">
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="fw-bold display-5 mb-4">Ready to Optimize Your Business?</h2>
          <p className="text-white-50 mb-5 fs-5">
            Download my resume to see my full qualifications, or browse my portfolio to see my code in action.
          </p>
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
            <a href="#portfolio" className="btn btn-custom btn-primary-custom border-light text-white">
              View Portfolio <Search size={18} />
            </a>
            <a href="#" className="btn btn-custom btn-outline-custom border-light text-white hover-light">
              Download Resume <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-light pt-5 border-top">
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h3 className="fw-bold mb-4 text-dark">Adwoa B. Acheampong</h3>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <Mail size={18} className="text-secondary" />
              <span className="text-secondary">{content.email}</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <MapPin size={18} className="text-secondary" />
              <span className="text-secondary">{content.location}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-lg-end">
          <div className="d-flex gap-3 justify-content-lg-end mb-4">
            <a href="#" className="btn btn-outline-dark rounded-circle p-3"><Linkedin size={20} /></a>
            <a href="#" className="btn btn-outline-dark rounded-circle p-3"><Github size={20} /></a>
          </div>
          <p className="text-secondary small">&copy; 2025 Adwoa B. Acheampong. Built with React.</p>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  // Dynamic Bootstrap Import
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <style>{customStyles}</style>
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Process />
      <DashboardShowcase />
      <Experience />
      <Blog />
      <ContactForm />
      <BottomCTA />
      <Footer />
    </>
  );
};

export default App;