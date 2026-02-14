import React, { useState, lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import ContactForm from './components/ContactForm';
import MarketChart from './components/MarketChart';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Menu, X, Github, Linkedin, Mail, MapPin, Phone, 
  TrendingUp, Target, Zap, ArrowRight, Download, ChevronRight,
  Award, BookOpen, Code, Database, BarChart3, Users, FileText,
  Calendar, Briefcase, GraduationCap, Coffee, TrendingDown
} from 'lucide-react';

// --- ADINKRA SYMBOLS AS SVG COMPONENTS ---
const GyeNyame = ({ size = 100, color = "#6F4E37" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="3"/>
    <path d="M50 20 L50 80 M30 50 L70 50" stroke={color} strokeWidth="3"/>
    <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="3" fill="none"/>
    <path d="M35 35 L65 65 M65 35 L35 65" stroke={color} strokeWidth="2"/>
  </svg>
);

const Sankofa = ({ size = 100, color = "#C65D3B" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="70" r="8" fill={color}/>
    <path d="M50 62 Q50 40, 70 40 Q80 40, 80 50 Q80 60, 70 60 L50 60" 
          stroke={color} strokeWidth="3" fill="none"/>
    <path d="M50 60 L50 30" stroke={color} strokeWidth="3"/>
    <circle cx="50" cy="25" r="5" fill={color}/>
    <path d="M45 70 L35 85 L45 85 Z" fill={color}/>
  </svg>
);

const DwennimmenAdinkra = ({ size = 100, color = "#8B6F47" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="2"/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line 
        key={angle}
        x1="50" y1="50" 
        x2={50 + 40 * Math.cos(angle * Math.PI / 180)} 
        y2={50 + 40 * Math.sin(angle * Math.PI / 180)}
        stroke={color} strokeWidth="2"
      />
    ))}
  </svg>
);

// --- CUSTOM CSS WITH FULL AFRICAN AESTHETIC ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Crimson+Text:wght@400;600;700&display=swap');

  :root {
    --coffee-dark: #6F4E37;
    --coffee-medium: #8B6F47;
    --tan-sand: #D2B48C;
    --terracotta: #C65D3B;
    --cream: #F5E6D3;
    --clay: #A0826D;
    --earth-deep: #3E2723;
    --warm-white: #FFF8F0;
    --kente-red: #8B1A1A;
    --kente-gold: #D4AF37;
    --kente-green: #2F5233;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background-color: var(--warm-white);
    color: var(--earth-deep);
    font-family: 'Crimson Text', serif;
    overflow-x: hidden;
    line-height: 1.7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  /* --- KENTE PATTERN --- */
  .pattern-kente-full {
    background-image: 
      repeating-linear-gradient(45deg, var(--kente-red) 0px, var(--kente-red) 10px, transparent 10px, transparent 20px),
      repeating-linear-gradient(-45deg, var(--kente-gold) 0px, var(--kente-gold) 10px, transparent 10px, transparent 20px),
      repeating-linear-gradient(90deg, var(--kente-green) 0px, var(--kente-green) 2px, transparent 2px, transparent 20px);
    opacity: 0.12;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .kente-border {
    border: 6px solid;
    border-image: repeating-linear-gradient(
      90deg,
      var(--kente-red) 0px, var(--kente-red) 20px,
      var(--kente-gold) 20px, var(--kente-gold) 40px,
      var(--kente-green) 40px, var(--kente-green) 60px
    ) 1;
  }

  .kente-accent-bar {
    height: 8px;
    background: repeating-linear-gradient(
      90deg,
      var(--kente-red) 0px, var(--kente-red) 15px,
      var(--kente-gold) 15px, var(--kente-gold) 30px,
      var(--kente-green) 30px, var(--kente-green) 45px,
      var(--terracotta) 45px, var(--terracotta) 60px
    );
    margin: 2rem 0;
  }

  /* --- NAVIGATION --- */
  .navbar-custom {
    background: linear-gradient(180deg, var(--warm-white) 0%, rgba(255, 248, 240, 0.98) 100%);
    backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease;
    border-bottom: 3px solid var(--tan-sand);
  }

  .navbar-scrolled {
    box-shadow: 0 8px 32px rgba(111, 78, 55, 0.15);
    border-bottom-color: var(--terracotta);
  }

  .nav-tab {
    color: var(--coffee-dark);
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: 1.1rem;
    background: none;
    border: none;
    font-family: 'Cormorant Garamond', serif;
  }

  .nav-tab::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    width: 0;
    height: 4px;
    background: var(--terracotta);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .nav-tab:hover, .nav-tab.active {
    color: var(--terracotta);
  }

  .nav-tab.active::after {
    width: 90%;
  }

  /* --- PAGE TRANSITIONS --- */
  .page-content {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* --- HERO SECTION --- */
  .hero-container {
    min-height: 85vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, var(--cream) 0%, var(--warm-white) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: var(--coffee-dark);
    line-height: 1.1;
  }

  .hero-tagline {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--coffee-medium);
    font-weight: 400;
    margin: 1.5rem 0;
    font-style: italic;
  }

  /* --- BUTTONS --- */
  .btn-primary-custom {
    background: var(--coffee-dark);
    color: var(--cream);
    padding: 1rem 2.5rem;
    border: 3px solid var(--coffee-dark);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
  }

  .btn-primary-custom::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--terracotta);
    transition: left 0.4s ease;
    z-index: -1;
  }

  .btn-primary-custom:hover::before {
    left: 0;
  }

  /* --- CARDS --- */
  .project-card {
    background: var(--warm-white);
    border: 3px solid var(--tan-sand);
    padding: 2rem;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .project-card:hover {
    border-color: var(--terracotta);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(111, 78, 55, 0.2);
  }

  .stat-box {
    background: var(--coffee-dark);
    color: var(--cream);
    padding: 2rem;
    text-align: center;
    border: 3px solid var(--terracotta);
    position: relative;
  }

  .stat-number {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--terracotta);
    font-family: 'Cormorant Garamond', serif;
  }

  .stat-label {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.5rem;
  }

  /* Timeline */
  .timeline-item {
    position: relative;
    padding-left: 4rem;
    padding-bottom: 3rem;
    border-left: 4px solid var(--tan-sand);
  }
  .timeline-marker {
    position: absolute;
    left: -14px;
    top: 0;
    width: 24px;
    height: 24px;
    background: var(--terracotta);
    border: 4px solid var(--coffee-dark);
    transition: all 0.3s ease;
  }

  .timeline-item:hover .timeline-marker {
    background: var(--coffee-dark);
    transform: scale(1.4);
  }

  /* --- DASHBOARD STYLES --- */
  .dashboard-container {
    background: var(--earth-deep);
    border: 3px solid var(--coffee-dark);
    padding: 2rem;
    color: var(--cream);
  }

  .dashboard-header {
    background: var(--coffee-medium);
    padding: 1rem 1.5rem;
    margin: -2rem -2rem 2rem -2rem;
    border-bottom: 3px solid var(--terracotta);
  }

  /* --- SKILL BADGES --- */
  .skill-badge {
    background: var(--coffee-dark);
    color: var(--cream);
    padding: 0.5rem 1.25rem;
    border: 2px solid var(--terracotta);
    font-weight: 600;
    display: inline-block;
    margin: 0.5rem;
    transition: all 0.3s ease;
  }

  .skill-badge:hover {
    background: var(--terracotta);
    border-color: var(--coffee-dark);
    transform: translateY(-3px);
  }

  /* --- ADINKRA DECORATIONS --- */
  .adinkra-corner {
    position: absolute;
    opacity: 0.1;
    pointer-events: none;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .hero-title { font-size: 2.5rem; }
    .nav-tab { font-size: 0.95rem; padding: 0.5rem 1rem; }
  }
`;

// --- DATA FOR DASHBOARDS ---
const baaAndBeanData = [
  { month: 'Feb', revenue: 12000, target: 15000 },
  { month: 'Mar', revenue: 18000, target: 18000 },
  { month: 'Apr', revenue: 24000, target: 21000 },
  { month: 'May', revenue: 28000, target: 24000 },
  { month: 'Jun', revenue: 30000, target: 27000 },
  { month: 'Jul', revenue: 31500, target: 30000 }
];

const automobilesData = [
  { week: 'Week 1', sales: 1200, engagement: 45 },
  { week: 'Week 2', sales: 1350, engagement: 52 },
  { week: 'Week 3', sales: 1580, engagement: 61 },
  { week: 'Week 4', sales: 1820, engagement: 68 },
  { week: 'Week 5', sales: 2100, engagement: 75 },
  { week: 'Week 6', sales: 2350, engagement: 78 },
  { week: 'Week 7', sales: 2550, engagement: 82 },
  { week: 'Week 8', sales: 2700, engagement: 83.3 }
];

// --- MAIN APP COMPONENT ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    { id: 'home', label: 'Home', icon: Coffee },
    { id: 'bio', label: 'My Story', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: BarChart3 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Set page title
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} - ${PERSONAL_INFO.role}`;
  }, []);

  return (
    <ErrorBoundary>
      <style>{customStyles}</style>
      
      {/* Navigation */}
      <nav className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--coffee-dark)', fontFamily: "'Cormorant Garamond', serif" }}>
            Adwoa
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {pages.map(page => {
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`nav-tab ${currentPage === page.id ? 'active' : ''}`}
                >
                  <Icon size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  {page.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="kente-accent-bar" style={{ height: '4px', margin: 0 }}></div>
      </nav>

      {/* Page Content */}
      <div className="page-content">
        {currentPage === 'home' && <HomePage setPage={setCurrentPage} />}
        {currentPage === 'bio' && <BioPage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'experience' && <ExperiencePage />}
        {currentPage === 'skills' && <SkillsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </div>

      {/* Footer */}
      <Footer />
    </ErrorBoundary>
  );
};

// --- HOME PAGE ---
const HomePage = ({ setPage }) => (
  <div className="hero-container">
    <div className="pattern-kente-full"></div>
    <div className="adinkra-corner" style={{ top: '5%', right: '5%' }}>
      <GyeNyame size={150} color="var(--coffee-medium)" />
    </div>
    <div className="adinkra-corner" style={{ bottom: '10%', left: '5%' }}>
      <Sankofa size={120} color="var(--terracotta)" />
    </div>
    
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px' }}>
        <div className="kente-accent-bar" style={{ width: '150px' }}></div>
        
        <h1 className="hero-title">
          Adwoa B. Acheampong
          <span style={{ display: 'block', fontSize: '0.4em', color: 'var(--terracotta)', fontStyle: 'italic', marginTop: '1rem' }}>
            (Miracle)
          </span>
        </h1>
        
        <p className="hero-tagline">Systems Builder & Growth Strategist</p>
        
        <p style={{ fontSize: '1.4rem', color: 'var(--earth-deep)', marginBottom: '2rem', lineHeight: '1.9' }}>
          I scale businesses and startups by building systems that focus on long-term growth, not just profits.
        </p>

        <div style={{ background: 'var(--cream)', border: '3px solid var(--coffee-dark)', padding: '2rem', marginBottom: '3rem', maxWidth: '700px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            <div className="stat-box" style={{ border: 'none' }}>
              <div className="stat-number">120%</div>
              <div className="stat-label">Revenue Growth</div>
            </div>
            <div className="stat-box" style={{ border: 'none' }}>
              <div className="stat-number">83.3%</div>
              <div className="stat-label">Engagement</div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('bio')} className="btn-primary-custom">
            Read My Story <ChevronRight size={20} />
          </button>
          <button onClick={() => setPage('projects')} className="btn-primary-custom" style={{ background: 'transparent', color: 'var(--coffee-dark)' }}>
            View Projects <BarChart3 size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--coffee-medium)', fontSize: '1.1rem' }}>
            <MapPin size={20} />
            <span>Accra, Ghana</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--coffee-medium)', fontSize: '1.1rem' }}>
            <Mail size={20} />
            <span>adwoa@jonmonsacs.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- BIO PAGE ---
const BioPage = () => (
  <div style={{ background: 'var(--warm-white)', minHeight: '80vh', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4rem', color: 'var(--coffee-dark)', marginBottom: '1rem' }}>My Story</h2>
        <div className="kente-accent-bar" style={{ width: '200px', margin: '0 auto' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem' }}>
          <div style={{ textAlign: 'center' }}>
            <Sankofa size={80} color="var(--terracotta)" />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--coffee-medium)', fontStyle: 'italic' }}>
              "Go back and fetch it"<br/>- Learning from the past
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <GyeNyame size={80} color="var(--coffee-dark)" />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--coffee-medium)', fontStyle: 'italic' }}>
              "Except God"<br/>- Supremacy of a higher power
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DwennimmenAdinkra size={80} color="var(--clay)" />
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--coffee-medium)', fontStyle: 'italic' }}>
              "Ram's horns"<br/>- Strength and humility
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--cream)', border: '3px solid var(--tan-sand)', padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)', marginBottom: '2rem' }}>The Journey</h3>
        
        <div style={{ fontSize: '1.2rem', lineHeight: '2', color: 'var(--earth-deep)', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm Adwoa B. Acheampong, known as <strong>Miracle</strong> to those who know me best. I'm a Ghanaian 
            operations professional who turns data into sustainable growth strategies.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            Financial constraints stopped me from completing my Bachelor of Science in Computer Engineering. 
            But I refused to let that define me. While working multiple contract roles—often surviving on fewer 
            than four hours of sleep—I taught myself everything I needed to know about data analysis, business 
            operations, and systems thinking.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            I earned certifications in <strong>Data Analysis (ALX)</strong>, <strong>Intermediate SQL (DataCamp)</strong>, 
            <strong>Data Analysis Essentials (Cisco)</strong>, and <strong>Business Management (Oxford Home Study Centre)</strong>. 
            But more importantly, I proved these skills in the real world.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            From ages 11 to 17, I served in the cadets and rose to the rank of <strong>RSM (Regimental Sergeant Major)</strong>. 
            That experience taught me discipline, organization, and mental resilience—qualities that define how I work today.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--coffee-dark)', color: 'var(--cream)', border: '3px solid var(--terracotta)', padding: '3rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--tan-sand)' }}>What Makes Me Different</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--terracotta)' }}>
              <Target size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Strategic Thinking
            </h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              I don't chase one-off sales. I build models focused on <strong>repeat business</strong>—the foundation 
              of scalable growth. Only experienced professionals understand this distinction.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--terracotta)' }}>
              <Users size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Psychometric Profile
            </h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              My assessment identifies me as an <strong>"Innovative Networker"</strong> with strengths in 
              Analysing, Exploring, and Results-Driven Execution. I'm systematic, methodical, and reliable.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--terracotta)' }}>
              <Zap size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Proven Results
            </h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              I've doubled sales, enabled branch expansions, and built automated systems that companies 
              bring me back to replicate. My work speaks for itself.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a href="/mnt/user-data/uploads/Adwoa-Acheampong-1730042535173-Psychometric.pdf" download className="btn-primary-custom" style={{ background: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
            Download Psychometric Assessment <Download size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- PROJECTS PAGE WITH DASHBOARDS ---
const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState('automobiles');

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '4rem', color: 'var(--coffee-dark)', marginBottom: '1rem' }}>Live Projects</h2>
          <div className="kente-accent-bar" style={{ width: '200px', margin: '0 auto 2rem' }}></div>
          <p style={{ fontSize: '1.3rem', color: 'var(--coffee-medium)' }}>
            Interactive dashboards showing real business impact
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedProject('automobiles')}
            className="btn-primary-custom"
            style={{
              background: selectedProject === 'automobiles' ? 'var(--coffee-dark)' : 'transparent',
              color: selectedProject === 'automobiles' ? 'var(--cream)' : 'var(--coffee-dark)'
            }}
          >
            Automobiles Ghana
          </button>
          <button
            onClick={() => setSelectedProject('baabean')}
            className="btn-primary-custom"
            style={{
              background: selectedProject === 'baabean' ? 'var(--coffee-dark)' : 'transparent',
              color: selectedProject === 'baabean' ? 'var(--cream)' : 'var(--coffee-dark)'
            }}
          >
            Baa & Bean Café
          </button>
        </div>

        {selectedProject === 'automobiles' && (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h3 style={{ fontSize: '2rem', margin: 0 }}>Automobiles Ghana Limited - 2024 Campaign</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                Precision-targeted campaigns driving sustainable growth
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>83.3%</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Engagement Increase</div>
              </div>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>125%</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Sales Growth</div>
              </div>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>2</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>New Branches</div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--coffee-dark)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Daily Sales & Engagement Growth (8-Week Campaign)
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={automobilesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C65D3B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C65D3B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="week" stroke="#6F4E37" />
                  <YAxis yAxisId="left" stroke="#6F4E37" label={{ value: 'Sales (GHS)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#8B6F47" label={{ value: 'Engagement (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip contentStyle={{ background: '#F5E6D3', border: '2px solid #6F4E37' }} />
                  <Area yAxisId="left" type="monotone" dataKey="sales" stroke="#C65D3B" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#8B6F47" strokeWidth={3} dot={{ fill: '#8B6F47', r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: 'var(--coffee-medium)', padding: '2rem', border: '3px solid var(--terracotta)' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--tan-sand)' }}>Key Strategy</h4>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                Instead of chasing one-off transactions, I built models focused on <strong>repeat business</strong>. 
                This approach drove sustainable growth that enabled expansion to two new branches by March 2026. 
                The company brought me back to replicate this success in their next growth phase.
              </p>
            </div>
          </div>
        )}

        {selectedProject === 'baabean' && (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h3 style={{ fontSize: '2rem', margin: 0 }}>Baa & Bean Café - Revenue Transformation</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                Data-driven optimization driving 120% revenue growth
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>GHS 30k</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Final Daily Revenue</div>
              </div>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>120%</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Growth Rate</div>
              </div>
              <div style={{ textAlign: 'center', background: 'var(--coffee-medium)', padding: '2rem', border: '2px solid var(--terracotta)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--terracotta)' }}>3 Mo</div>
                <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Time to Target</div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--coffee-dark)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Monthly Revenue Growth vs. Target
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={baaAndBeanData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="month" stroke="#6F4E37" />
                  <YAxis stroke="#6F4E37" label={{ value: 'Revenue (GHS)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ background: '#F5E6D3', border: '2px solid #6F4E37' }} />
                  <Bar dataKey="revenue" fill="#C65D3B" />
                  <Bar dataKey="target" fill="#D2B48C" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: 'var(--coffee-medium)', padding: '2rem', border: '3px solid var(--terracotta)' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--tan-sand)' }}>Implementation</h4>
              <ul style={{ fontSize: '1.2rem', lineHeight: '2', paddingLeft: '1.5rem' }}>
                <li>Analyzed customer service data to identify peak hours and preferences</li>
                <li>Refined SOPs for kitchen efficiency and waste reduction</li>
                <li>Updated sales strategies based on menu performance analytics</li>
                <li>Restructured supply chain to optimize costs while maintaining quality</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- EXPERIENCE PAGE ---
const ExperiencePage = () => (
  <div style={{ background: 'var(--warm-white)', minHeight: '80vh', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4rem', color: 'var(--coffee-dark)', marginBottom: '1rem' }}>Experience</h2>
        <div className="kente-accent-bar" style={{ width: '200px', margin: '0 auto' }}></div>
      </div>

      <div style={{ position: 'relative' }}>
        {[
          {
            role: "Statutory Operations Director",
            company: "JonMon-Sacs Ghana Ltd",
            date: "Jul 2025 - Present",
            location: "Accra, Ghana",
            achievements: [
              "Superintending business licensing and regulatory compliance",
              "Leading a team of 5 officers",
              "Ensuring adherence to Ghanaian business laws"
            ]
          },
          {
            role: "Operations Manager",
            company: "Baa & Bean Café's",
            date: "Feb 2024 - Jul 2024",
            location: "Accra, Ghana",
            achievements: [
              "Drove daily revenue from GHS 12k to GHS 30k+ (120% increase)",
              "Implemented data-driven menu optimization",
              "Restructured supply chain operations",
              "Focused on sustainable growth vs. one-off wins"
            ]
          },
          {
            role: "Operations Consultant",
            company: "Automobiles Ghana Limited",
            date: "2024 & 2026",
            location: "Accra, Ghana",
            achievements: [
              "Amplified customer engagement by 83.3%",
              "Accelerated daily sales from GHS 1,200 to GHS 2,700",
              "Built repeat-customer models enabling 2-branch expansion",
              "Re-engaged to replicate success in next growth phase"
            ]
          },
          {
            role: "Administration Manager",
            company: "Zein Real Estate",
            date: "Mar 2023 - Jan 2024",
            location: "Accra, Ghana",
            achievements: [
              "Improved office productivity by 30%",
              "Built automation with AppScript + AI",
              "Created digital filing systems",
              "Freed team to focus on client relationships"
            ]
          },
          {
            role: "Marketing Executive",
            company: "Trident Real Estate Group",
            date: "2022 - 2023",
            location: "Accra, Ghana",
            achievements: [
              "Executed marketing campaigns for luxury projects",
              "Monitored lead turnover rates",
              "Utilized Meta Business Suite for remote sales",
              "Managed social media assets"
            ]
          }
        ].map((job, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-marker"></div>
            <div style={{ marginBottom: '0.5rem', color: 'var(--clay)', fontStyle: 'italic' }}>
              {job.date} • {job.location}
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)', marginBottom: '0.5rem', fontWeight: '700' }}>
              {job.role}
            </h3>
            <div style={{ fontSize: '1.3rem', color: 'var(--terracotta)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              {job.company}
            </div>
            <ul style={{ fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--earth-deep)', paddingLeft: '1.5rem' }}>
              {job.achievements.map((achievement, j) => (
                <li key={j} style={{ marginBottom: '0.5rem' }}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- SKILLS PAGE ---
const SkillsPage = () => (
  <div style={{ background: 'var(--cream)', minHeight: '80vh', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4rem', color: 'var(--coffee-dark)', marginBottom: '1rem' }}>Skills & Certifications</h2>
        <div className="kente-accent-bar" style={{ width: '200px', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        <div className="kente-border" style={{ background: 'var(--warm-white)', padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Database size={40} style={{ color: 'var(--terracotta)' }} />
            <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)' }}>Data & Analytics</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['SQL', 'Tableau', 'Power BI', 'Google Sheets', 'AppScript', 'Data Visualization', 'Statistical Analysis', 'Excel Advanced'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        <div className="kente-border" style={{ background: 'var(--warm-white)', padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Briefcase size={40} style={{ color: 'var(--terracotta)' }} />
            <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)' }}>Operations</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Process Optimization', 'SOP Development', 'Supply Chain', 'Team Leadership', 'Project Management', 'Compliance', 'Automation'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        <div className="kente-border" style={{ background: 'var(--warm-white)', padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Code size={40} style={{ color: 'var(--terracotta)' }} />
            <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)' }}>Technical</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Python', 'JavaScript', 'React', 'AI Integration', 'Google Workspace', 'Meta Business Suite', 'CRM Systems'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        <div className="kente-border" style={{ background: 'var(--warm-white)', padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Award size={40} style={{ color: 'var(--terracotta)' }} />
            <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)' }}>Certifications</h3>
          </div>
          <ul style={{ fontSize: '1.15rem', lineHeight: '2', color: 'var(--earth-deep)', paddingLeft: '1.5rem' }}>
            <li><strong>Data Analysis</strong> - ALX</li>
            <li><strong>Intermediate SQL</strong> - DataCamp</li>
            <li><strong>Data Analysis Essentials</strong> - Cisco</li>
            <li><strong>Business Management</strong> - Oxford Home Study Centre</li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--coffee-dark)', color: 'var(--cream)', padding: '3rem', border: '4px solid var(--terracotta)' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--tan-sand)' }}>
          Psychometric Assessment Results
        </h3>
        <p style={{ fontSize: '1.3rem', lineHeight: '1.9', marginBottom: '2rem' }}>
          Assessed as an <strong>"Innovative Networker"</strong> with primary strengths in:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Analysing</div>
            <p>Comfortable with numerical data and evidence-based thinking</p>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Exploring</div>
            <p>Curious, thinks out of the box, thrives on novelty</p>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--terracotta)', marginBottom: '0.5rem' }}>Results-Driven</div>
            <p>Systematic, methodical, delivers within deadlines</p>
          </div>
        </div>
        <a href="/mnt/user-data/uploads/Adwoa-Acheampong-1730042535173-Psychometric.pdf" download className="btn-primary-custom" style={{ background: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
          Download Full Assessment <Download size={20} />
        </a>
      </div>
    </div>
  </div>
);

// --- CONTACT PAGE ---
const ContactPage = () => (
  <div style={{ background: 'var(--warm-white)', minHeight: '80vh', padding: '4rem 2rem', position: 'relative' }}>
    <div className="adinkra-corner" style={{ top: '10%', right: '5%', opacity: 0.05 }}>
      <GyeNyame size={200} />
    </div>
    
    <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '4rem', color: 'var(--coffee-dark)', marginBottom: '1rem' }}>Let's Build Together</h2>
        <div className="kente-accent-bar" style={{ width: '200px', margin: '0 auto 2rem' }}></div>
        <p style={{ fontSize: '1.3rem', color: 'var(--coffee-medium)' }}>
          Ready to scale your business with systems that focus on long-term growth?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        <div className="kente-border" style={{ background: 'var(--cream)', padding: '3rem' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--coffee-dark)', marginBottom: '2rem' }}>Contact Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--coffee-dark)' }}>
                <Mail size={28} style={{ color: 'var(--cream)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--coffee-medium)', marginBottom: '0.25rem' }}>Email</div>
                <a href="mailto:adwoa@jonmonsacs.com" style={{ fontSize: '1.2rem', color: 'var(--coffee-dark)', textDecoration: 'none', fontWeight: '600' }}>
                  adwoa@jonmonsacs.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--coffee-dark)' }}>
                <Phone size={28} style={{ color: 'var(--cream)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--coffee-medium)', marginBottom: '0.25rem' }}>Phone</div>
                <div style={{ fontSize: '1.2rem', color: 'var(--coffee-dark)', fontWeight: '600' }}>
                  (233) 276-291-485
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--coffee-dark)' }}>
                <MapPin size={28} style={{ color: 'var(--cream)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--coffee-medium)', marginBottom: '0.25rem' }}>Location</div>
                <div style={{ fontSize: '1.2rem', color: 'var(--coffee-dark)', fontWeight: '600' }}>
                  Accra, Ghana
                </div>
              </div>
            </div>
          </div>

          <div className="kente-accent-bar" style={{ margin: '2rem 0' }}></div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ flex: 1, height: '60px', border: '3px solid var(--coffee-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--coffee-dark)', transition: 'all 0.3s' }} className="social-link">
              <Linkedin size={28} />
            </a>
            <a href="#" style={{ flex: 1, height: '60px', border: '3px solid var(--coffee-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--coffee-dark)', transition: 'all 0.3s' }} className="social-link">
              <Github size={28} />
            </a>
          </div>
        </div>

        <div className="kente-border" style={{ background: 'var(--coffee-dark)', color: 'var(--cream)', padding: '3rem' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--tan-sand)' }}>Download Resources</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="#" className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', background: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
              <FileText size={20} />
              Download Resume
            </a>

            <a href="/mnt/user-data/uploads/Adwoa-Acheampong-1730042535173-Psychometric.pdf" download className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', background: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
              <Award size={20} />
              Psychometric Assessment
            </a>

            <a href="#" className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', background: 'var(--terracotta)', borderColor: 'var(--terracotta)' }}>
              <BarChart3 size={20} />
              Portfolio Case Studies
            </a>
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--coffee-medium)', border: '2px solid var(--terracotta)' }}>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--tan-sand)' }}>Why Hire Me?</h4>
            <ul style={{ fontSize: '1.1rem', lineHeight: '2', paddingLeft: '1.5rem' }}>
              <li>Proven track record: 120% revenue growth, 83.3% engagement increase</li>
              <li>Strategic thinker: Build systems for sustainable growth, not quick wins</li>
              <li>Data-driven: Turn analysis into actionable business improvements</li>
              <li>Resilient: Self-taught while working multiple roles</li>
              <li>Results-oriented: Companies bring me back to replicate success</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- FOOTER ---
const Footer = () => (
  <footer style={{ background: 'var(--coffee-dark)', color: 'var(--cream)', padding: '3rem 2rem' }}>
    <div className="kente-accent-bar"></div>
    <div style={{ maxWidth: '1600px', margin: '2rem auto 0', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Sankofa size={60} color="var(--tan-sand)" />
        <GyeNyame size={60} color="var(--terracotta)" />
        <DwennimmenAdinkra size={60} color="var(--clay)" />
      </div>
      <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '600' }}>
        Adwoa B. Acheampong (Miracle)
      </p>
      <p style={{ fontSize: '1rem', opacity: 0.8 }}>
        Systems Builder • Growth Strategist • Accra, Ghana
      </p>
      <p style={{ fontSize: '0.9rem', marginTop: '2rem', opacity: '0.6' }}>
        © 2025 • Built with cultural pride and technical excellence
      </p>
    </div>
  </footer>
);

export default App;
