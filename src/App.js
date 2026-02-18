
import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid
} from 'recharts';
import {
  Menu, X, Github, Linkedin, Mail, MapPin, Phone,
  TrendingUp, Target, Zap, ArrowRight, Download, ChevronRight,
  Award, BookOpen, Code, Database, BarChart3, Users, FileText,
  Calendar, Briefcase, GraduationCap, Coffee, TrendingDown, Heart, Crosshair
} from 'lucide-react';

// --- AUTHENTIC GHANAIAN ELEMENTS ---
// Using real Kente cloth pattern images (public domain or free-to-use URLs as placeholders)
// Replace with actual hosted images if needed
const kentePatternUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kente_Cloth_Patterns.jpg/800px-Kente_Cloth_Patterns.jpg'; // Example Kente URL
const kenteBorderUrl = 'https://example.com/kente-border.png'; // Placeholder for border image

// --- ENHANCED ADINKRA SYMBOLS AS SVG COMPONENTS (Kept from original, authentic Ghanaian symbols) ---
const GyeNyame = ({ size = 100, color = "#6F4E37" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" opacity="0.6" />
    <path d="M50 20 L50 80 M30 50 L70 50" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="3" fill="none" />
    <circle cx="50" cy="50" r="8" fill={color} opacity="0.8" />
    <path d="M35 35 L65 65 M65 35 L35 65" stroke={color} strokeWidth="2.5" opacity="0.7" />
  </svg>
);

const Sankofa = ({ size = 100, color = "#C65D3B" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="55" rx="18" ry="20" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
    <path d="M50 35 Q60 30, 68 35 Q75 40, 75 50" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="78" cy="50" r="8" fill={color} />
    <path d="M86 48 L95 46 L86 52 Z" fill={color} />
    <path d="M48 75 L45 85 L50 80 M50 75 L50 85" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M45 50 Q40 55, 42 65" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
);

const DwennimmenAdinkra = ({ size = 100, color = "#8B6F47" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="50" cy="50" r="6" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
      <line
        key={angle}
        x1="50" y1="50"
        x2={50 + 42 * Math.cos(angle * Math.PI / 180)}
        y2={50 + 42 * Math.sin(angle * Math.PI / 180)}
        stroke={color} strokeWidth="2.5" strokeLinecap="round"
      />
    ))}
  </svg>
);

const AkomaNtoaso = ({ size = 100, color = "#8B1A1A" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M40 45 C35 40, 30 40, 28 45 C26 50, 35 60, 40 65 L40 50 Z" fill={color} opacity="0.8" stroke={color} strokeWidth="2" />
    <path d="M60 45 C65 40, 70 40, 72 45 C74 50, 65 60, 60 65 L60 50 Z" fill={color} opacity="0.8" stroke={color} strokeWidth="2" />
    <circle cx="40" cy="50" r="3" fill={color} />
    <circle cx="60" cy="50" r="3" fill={color} />
    <line x1="43" y1="50" x2="57" y2="50" stroke={color} strokeWidth="2" />
  </svg>
);

const Adinkrahene = ({ size = 100, color = "#D4AF37" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="20" y="20" width="60" height="60" stroke={color} strokeWidth="2.5" />
    <rect x="28" y="28" width="44" height="44" stroke={color} strokeWidth="2" />
    <rect x="36" y="36" width="28" height="28" stroke={color} strokeWidth="1.5" />
    <path d="M50 42 L58 50 L50 58 L42 50 Z" fill={color} opacity="0.6" />
    {[20, 80].map((x, i) => [20, 80].map((y, j) => (
      <circle key={`${i}-${j}`} cx={x} cy={y} r="2.5" fill={color} />
    )))}
  </svg>
);

// --- CUSTOM CSS (Enhanced with real Kente patterns) ---
const customStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;300;500;600&family=Crimson+Text:wght@300;500&family=Inter:wght@300;400;500;600&display=swap');
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
  --accent-coral: #E07856;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--warm-white);
  color: var(--earth-deep);
  font-family: 'Crimson Text', 'Inter', serif, sans-serif;
  overflow-x: hidden;
  line-height: 1.7;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 500;
  letter-spacing: -0.01em;
}
.kente-border {
  background-image: url('${kentePatternUrl}');
  background-size: cover;
  height: 20px;
  margin: 2rem 0;
}
.navbar-custom {
  background: linear-gradient(180deg, var(--warm-white) 0%, rgba(255, 248, 240, 0.95) 100%);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 2px solid var(--tan-sand);
  padding: 1rem 2rem;
}
.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--coffee-dark);
  text-decoration: none;
}
.nav-menu {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}
.nav-tab {
  color: var(--coffee-dark);
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  text-decoration: none;
}
.nav-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: url('${kenteBorderUrl}') repeat-x;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
.nav-tab:hover, .nav-tab.active {
  color: var(--terracotta);
}
.nav-tab.active::after {
  width: 80%;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--coffee-dark);
  font-size: 1.5rem;
}
@media (max-width: 768px) {
  .nav-menu {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: var(--warm-white);
    padding: 1rem;
  }
  .menu-toggle {
    display: block;
  }
}
.hero-container {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--cream) 0%, rgba(210, 180, 140, 0.3) 100%), url('${kentePatternUrl}') no-repeat center/cover;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}
.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.hero-image-placeholder {
  width: 300px;
  height: 400px;
  background: var(--tan-sand);
  border: 4px solid var(--kente-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--coffee-dark);
  flex-shrink: 0;
}
.miracle-worker {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.2rem;
  color: var(--kente-red);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}
.hero-title {
  font-size: clamp(1.8rem, 6vw, 3.5rem);
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1.2;
  margin-bottom: 1rem;
}
.hero-subtitle {
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  color: var(--coffee-medium);
  font-weight: 500;
  margin: 1.5rem 0;
  font-family: 'Inter', sans-serif;
}
.hero-description {
  font-size: 1.15rem;
  color: var(--earth-deep);
  max-width: 600px;
  margin: 2rem 0 3rem 0;
  line-height: 1.8;
}
.btn-primary {
  background: var(--coffee-dark);
  color: var(--cream);
  padding: 0.9rem 2.2rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(111, 78, 55, 0.15);
}
.btn-primary::before {
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
.btn-primary:hover::before {
  left: 0;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(111, 78, 55, 0.3);
}
.btn-secondary {
  background: transparent;
  color: var(--coffee-dark);
  padding: 0.9rem 2.2rem;
  border: 2px solid var(--coffee-dark);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.4s ease;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 2px;
}
.btn-download {
  background: var(--kente-green);
  color: var(--warm-white);
}
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--coffee-dark);
  margin-bottom: 1rem;
}
.section-subtitle {
  font-size: 1.2rem;
  color: var(--coffee-medium);
  max-width: 800px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  .hero-image-placeholder {
    width: 200px;
    height: 250px;
  }
}
`;

// --- NAV BAR COMPONENT (Mobile friendly) ---
const NavBar = ({ currentPage, setCurrentPage, pages, isOpen, setIsOpen }) => (
  <nav className="navbar-custom">
    <div className="navbar-container">
      <a href="#" className="navbar-logo">Adwoa B. Acheampong</a>
      <ul className="nav-menu" style={{ display: isOpen ? 'flex' : undefined }}>
        {pages.map(page => (
          <li key={page.id}>
            <button
              className={`nav-tab ${currentPage === page.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(page.id);
                setIsOpen(false);
              }}
            >
              {page.label}
            </button>
          </li>
        ))}
      </ul>
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </nav>
);

// --- HOME PAGE (Hero with placeholder image and "Miracle worker ✝") ---
const HomePage = () => (
  <div className="hero-container">
    <div className="miracle-worker">
      Miracle Worker <Crosshair size={20} />
    </div>
    <div className="hero-content">
      <div>
        <h1 className="hero-title">Adwoa B. Acheampong</h1>
        <h2 className="hero-subtitle">Business Operations Architect & Growth Engineer</h2>
        <p className="hero-description">
          Tenacious innovator blending Ghanaian resilience with data-driven strategies. I build scalable systems that turn visions into high-performing machines. Guided by values of innovation, collaboration, and unyielding grit – inspired by Adinkra wisdom.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#contact" className="btn-primary">Connect <ArrowRight size={16} /></a>
          <a href="/Adwoa B. Acheampong - Business Operations & EA (Resume).pdf" download className="btn-secondary btn-download">Download Resume <Download size={16} /></a>
          <a href="/Adwoa-Acheampong-1730042535173-Psychometric.pdf" download className="btn-secondary btn-download">Download Psychometric <Download size={16} /></a>
        </div>
      </div>
      <div className="hero-image-placeholder">
        [Your Photo Here]
      </div>
    </div>
  </div>
);

// --- STORY PAGE (Personal story based on psychometric and cover letter) ---
const StoryPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">My Story: From Curiosity to Creation</h2>
        <p className="section-subtitle">
          Rooted in Ghanaian heritage, driven by tenacity and faith – turning challenges into triumphs.
        </p>
      </div>
      <div className="kente-border"></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <Sankofa size={80} color="var(--terracotta)" />
          <h3 style={{ margin: '1rem 0', color: 'var(--coffee-dark)' }}>Exploring & Innovating</h3>
          <p>
            Curious by nature, I thrive on exploring new ideas and thinking outside the box. From my roots in Computer Engineering, I've learned to view every problem as an opportunity for creative, evidence-based solutions – much like the Sankofa symbol teaches us to learn from the past to build the future.
          </p>
        </div>
        <div>
          <GyeNyame size={80} color="var(--kente-gold)" />
          <h3 style={{ margin: '1rem 0', color: 'var(--coffee-dark)' }}>Resilience & Faith</h3>
          <p>
            Guided by unshakeable faith (✝), I recover from setbacks viewing them as learning steps. My tenacity – "we keep at it until we succeed" – echoes Gye Nyame's supreme wisdom, blending grit with adaptability in dynamic environments.
          </p>
        </div>
        <div>
          <Adinkrahene size={80} color="var(--kente-green)" />
          <h3 style={{ margin: '1rem 0', color: 'var(--coffee-dark)' }}>Collaboration & Leadership</h3>
          <p>
            As a networker and collaborator, I build strong teams, delegating with empathy. Inspired by Adinkrahene's leadership, I create innovative, risk-taking organizations where evidence-based thinking and teamwork drive success.
          </p>
        </div>
      </div>
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          My journey is about engineering "double domino effects" – passionate, gritty solutions that scale. From optimizing marketplaces to rewriting SOPs, I architect machines where people and logic align for lasting impact.
        </p>
      </div>
    </div>
  </div>
);

// --- PROJECTS PAGE (With interactive dashboards) ---
const ProjectsPage = () => {
  // Sample data for Baa & Bean (120% revenue increase over 6 months)
  const baaData = [
    { month: 'Month 1', revenue: 12000 },
    { month: 'Month 2', revenue: 15000 },
    { month: 'Month 3', revenue: 20000 },
    { month: 'Month 4', revenue: 24000 },
    { month: 'Month 5', revenue: 28000 },
    { month: 'Month 6', revenue: 30000 },
  ];

  // Sample data for Automobiles Ghana (125% growth)
  const autoData = [
    { day: 'Day 1', revenue: 1200 },
    { day: 'Day 15', revenue: 1800 },
    { day: 'Day 30', revenue: 2700 },
  ];

  // Placeholder engagement data
  const engagementData = [
    { month: 'Month 1', engagement: 100 },
    { month: 'Month 2', engagement: 150 },
    { month: 'Month 3', engagement: 250 },
    { month: 'Month 4', engagement: 350 },
    { month: 'Month 5', engagement: 450 },
    { month: 'Month 6', engagement: 600 },
  ];

  return (
    <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">
          <h2 className="section-title">Impactful Projects</h2>
          <p className="section-subtitle">Building scalable systems with measurable growth</p>
        </div>
        <div className="kente-border"></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)' }}>
            <h3>Baa & Bean Café: 120% Revenue Growth</h3>
            <p>Rewrote SOPs, negotiated contracts, and optimized workflows for explosive growth.</p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={baaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke={var(--terracotta)} fill={var(--tan-sand)} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)' }}>
            <h3>Automobiles Ghana: 125% Daily Revenue Increase</h3>
            <p>Optimized marketplace with data, designed remote teams for expansion.</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={autoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill={var(--kente-gold)} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)' }}>
            <h3>Engagement Growth Dashboard</h3>
            <p>Tracking leads, customer satisfaction, and team collaboration metrics.</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="engagement" stroke={var(--kente-green)} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- EXPERIENCE PAGE (With review section) ---
const ExperiencePage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Professional Journey</h2>
        <p className="section-subtitle">High-trust partnerships driving operational excellence</p>
      </div>
      <div className="kente-border"></div>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {[
          {
            role: 'Business Systems Analyst (Consultant)',
            company: 'Automobiles Ghana Ltd / Stoic Team Ghana',
            period: '2024–Present',
            achievements: ['125% revenue growth through data optimization', 'Designed AI-enabled systems for multi-branch expansion']
          },
          {
            role: 'Executive Operations Lead',
            company: 'JonMon-Sacs Ghana Ltd',
            period: '2025–2026',
            achievements: ['Managed multi-million-dollar developments', 'Ensured regulatory compliance in high-stakes environments']
          },
          // Add more from resumes
        ].map((exp, idx) => (
          <div key={idx} style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>{exp.role} at {exp.company}</h3>
            <p>{exp.period}</p>
            <ul style={{ listStyle: 'none' }}>
              {exp.achievements.map(ach => <li key={ach} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={16} color="var(--terracotta)" /> {ach}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Review from Last CEO</h3>
        <div style={{ background: 'var(--cream)', padding: '2rem', border: '2px dashed var(--kente-red)', textAlign: 'center' }}>
          <p style={{ fontStyle: 'italic' }}>"Adwoa is a miracle worker – her diligence and innovative approach turned our operations around. Highly recommended!"</p>
          <p>- Sharon Dedo-Azu, CEO, Baa & Bean Café</p>
        </div>
      </div>
    </div>
  </div>
);

// --- SKILLS PAGE (From psychometric: Innovative, Tenacious, etc.) ---
const SkillsPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Competencies & Values</h2>
        <p className="section-subtitle">Blending technical prowess with Ghanaian-inspired values</p>
      </div>
      <div className="kente-border"></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { title: 'Thinking', skills: ['Analysing', 'Exploring', 'Innovative'] },
          { title: 'Connecting', skills: ['Networking', 'Collaborating', 'Empathy'] },
          { title: 'Executing', skills: ['Quality', 'Results Driven', 'Organized'] },
          { title: 'Progressing', skills: ['Leadership', 'Resilience', 'Adaptability'] },
        ].map((category, idx) => (
          <div key={idx} style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)' }}>
            <h3>{category.title}</h3>
            <ul style={{ listStyle: 'none' }}>
              {category.skills.map(skill => <li key={skill}><span style={{ background: 'var(--tan-sand)', padding: '0.2rem 0.5rem', margin: '0.2rem' }}>{skill}</span></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- CONTACT PAGE ---
const ContactPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Let's Collaborate</h2>
        <p className="section-subtitle">Build something extraordinary together</p>
      </div>
      <div className="kente-border"></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        {[
          { icon: Mail, label: 'Email', value: 'adwoaacheampong728@gmail.com', href: 'mailto:adwoaacheampong728@gmail.com' },
          { icon: Phone, label: 'Phone', value: '+233 276 291 485', href: 'tel:+233276291485' },
          { icon: MapPin, label: 'Location', value: 'Accra, Ghana', href: '#' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <a key={idx} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)', textAlign: 'center', transition: 'all 0.3s' }}>
                <Icon size={40} color="var(--terracotta)" />
                <p style={{ margin: '1rem 0 0.5rem', fontWeight: 'bold' }}>{item.label}</p>
                <p>{item.value}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </div>
);

// --- FOOTER ---
const Footer = () => (
  <footer style={{ background: 'var(--coffee-dark)', color: 'var(--cream)', padding: '3rem 2rem', textAlign: 'center' }}>
    <div className="kente-border"></div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
      <Github size={24} />
      <Linkedin size={24} />
    </div>
    <p>© 2026 Adwoa B. Acheampong – Powered by Ghanaian Spirit & Innovation</p>
  </footer>
);

// --- MAIN APP ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Story' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'story': return <StoryPage />;
      case 'projects': return <ProjectsPage />;
      case 'experience': return <ExperiencePage />;
      case 'skills': return <SkillsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} isOpen={menuOpen} setIsOpen={setMenuOpen} />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;
