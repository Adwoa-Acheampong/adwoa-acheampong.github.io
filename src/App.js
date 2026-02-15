import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Menu, X, Github, Linkedin, Mail, MapPin, Phone, 
  TrendingUp, Target, Zap, ArrowRight, Download, ChevronRight,
  Award, BookOpen, Code, Database, BarChart3, Users, FileText,
  Calendar, Briefcase, GraduationCap, Coffee, TrendingDown, Heart
} from 'lucide-react';

// --- ENHANCED ADINKRA SYMBOLS AS SVG COMPONENTS ---
// Gye Nyame - God is Great (Symbol of God's omnipotence)
const GyeNyame = ({ size = 100, color = "#6F4E37" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="3"/>
    <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" opacity="0.6"/>
    <path d="M50 20 L50 80 M30 50 L70 50" stroke={color} strokeWidth="3"/>
    <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="8" fill={color} opacity="0.8"/>
    <path d="M35 35 L65 65 M65 35 L35 65" stroke={color} strokeWidth="2.5" opacity="0.7"/>
  </svg>
);

// Sankofa - Return & Get It (Going back for what was left behind)
const Sankofa = ({ size = 100, color = "#C65D3B" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Heart body */}
    <ellipse cx="50" cy="55" rx="18" ry="20" fill={color} opacity="0.3" stroke={color} strokeWidth="2"/>
    {/* Curved neck */}
    <path d="M50 35 Q60 30, 68 35 Q75 40, 75 50" 
          stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Head */}
    <circle cx="78" cy="50" r="8" fill={color}/>
    {/* Beak */}
    <path d="M86 48 L95 46 L86 52 Z" fill={color}/>
    {/* Feet */}
    <path d="M48 75 L45 85 L50 80 M50 75 L50 85" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    {/* Wing detail */}
    <path d="M45 50 Q40 55, 42 65" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
  </svg>
);

// Dwennimmen - Ram's Horns (Strength and humility)
const DwennimmenAdinkra = ({ size = 100, color = "#8B6F47" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Concentric circles */}
    <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="2.5" fill="none"/>
    <circle cx="50" cy="50" r="6" fill={color}/>
    {/* Radiating lines for horns */}
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

// Akoma Ntoaso - Linked Hearts (Unity and harmony)
const AkomaNtoaso = ({ size = 100, color = "#8B1A1A" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Left heart */}
    <path d="M40 45 C35 40, 30 40, 28 45 C26 50, 35 60, 40 65 L40 50 Z" 
          fill={color} opacity="0.8" stroke={color} strokeWidth="2"/>
    {/* Right heart */}
    <path d="M60 45 C65 40, 70 40, 72 45 C74 50, 65 60, 60 65 L60 50 Z" 
          fill={color} opacity="0.8" stroke={color} strokeWidth="2"/>
    {/* Connecting link */}
    <circle cx="40" cy="50" r="3" fill={color}/>
    <circle cx="60" cy="50" r="3" fill={color}/>
    <line x1="43" y1="50" x2="57" y2="50" stroke={color} strokeWidth="2"/>
  </svg>
);

// Adinkrahene - Chief of Adinkra (Leadership and greatness)
const Adinkrahene = ({ size = 100, color = "#D4AF37" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Outer square */}
    <rect x="20" y="20" width="60" height="60" stroke={color} strokeWidth="2.5"/>
    {/* Inner squares */}
    <rect x="28" y="28" width="44" height="44" stroke={color} strokeWidth="2"/>
    <rect x="36" y="36" width="28" height="28" stroke={color} strokeWidth="1.5"/>
    {/* Center diamond */}
    <path d="M50 42 L58 50 L50 58 L42 50 Z" fill={color} opacity="0.6"/>
    {/* Corner accents */}
    {[20, 80].map((x, i) => [20, 80].map((y, j) => (
      <circle key={`${i}-${j}`} cx={x} cy={y} r="2.5" fill={color}/>
    )))}
  </svg>
);

// --- CUSTOM CSS WITH MODERN AFRICAN AESTHETIC ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Crimson+Text:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');

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
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  /* --- MODERN KENTE PATTERNS --- */
  .kente-stripe {
    height: 6px;
    background: linear-gradient(90deg, 
      var(--kente-red) 0%, var(--kente-red) 20%,
      var(--kente-gold) 20%, var(--kente-gold) 40%,
      var(--kente-green) 40%, var(--kente-green) 60%,
      var(--terracotta) 60%, var(--terracotta) 100%
    );
    margin: 2rem 0;
  }

  .kente-border {
    border-left: 6px solid var(--kente-red);
    border-right: 6px solid var(--kente-gold);
    border-top: 3px solid var(--kente-green);
    border-bottom: 3px solid var(--terracotta);
  }

  /* --- NAVIGATION --- */
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
    font-size: 1.4rem;
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
    background: linear-gradient(90deg, var(--terracotta), var(--kente-gold));
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

  /* --- HERO SECTION --- */
  .hero-container {
    min-height: 90vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, var(--cream) 0%, rgba(210, 180, 140, 0.3) 100%);
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .hero-container::before {
    content: '';
    position: absolute;
    right: -10%;
    top: 50%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, var(--kente-gold) 0%, transparent 70%);
    opacity: 0.08;
    transform: translateY(-50%);
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 5.5rem);
    font-weight: 700;
    color: var(--coffee-dark);
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 3vw, 1.6rem);
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

  /* --- BUTTONS --- */
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

  .btn-secondary:hover {
    background: var(--coffee-dark);
    color: var(--cream);
    transform: translateY(-2px);
  }

  /* --- CARDS --- */
  .project-card {
    background: white;
    border: 2px solid var(--tan-sand);
    border-radius: 0;
    padding: 2.5rem;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--terracotta), var(--kente-gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .project-card:hover {
    border-color: var(--terracotta);
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(111, 78, 55, 0.15);
  }

  .project-card:hover::before {
    transform: scaleX(1);
  }

  .card-title {
    font-size: 1.6rem;
    color: var(--coffee-dark);
    margin-bottom: 1rem;
  }

  .card-stat {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--terracotta);
    margin-bottom: 0.5rem;
  }

  /* --- STAT BOXES --- */
  .stat-box {
    background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
    color: var(--cream);
    padding: 2.5rem;
    text-align: center;
    border: 3px solid var(--terracotta);
    position: relative;
    transition: all 0.3s ease;
    border-radius: 0;
  }

  .stat-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(111, 78, 55, 0.3);
  }

  .stat-number {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--kente-gold);
    font-family: 'Cormorant Garamond', serif;
  }

  .stat-label {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 1rem;
    font-family: 'Inter', sans-serif;
  }

  /* --- TIMELINE --- */
  .timeline-item {
    position: relative;
    padding-left: 3.5rem;
    padding-bottom: 3rem;
    border-left: 3px solid var(--tan-sand);
  }

  .timeline-item.active {
    border-left-color: var(--terracotta);
  }

  .timeline-marker {
    position: absolute;
    left: -10px;
    top: 0;
    width: 20px;
    height: 20px;
    background: white;
    border: 3px solid var(--tan-sand);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .timeline-item.active .timeline-marker {
    background: var(--terracotta);
    border-color: var(--coffee-dark);
    box-shadow: 0 0 0 4px var(--cream);
    transform: scale(1.2);
  }

  /* --- SKILL BADGES --- */
  .skill-badge {
    background: white;
    color: var(--coffee-dark);
    padding: 0.6rem 1.4rem;
    border: 2px solid var(--tan-sand);
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.95rem;
    display: inline-block;
    margin: 0.5rem;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  }

  .skill-badge:hover {
    background: var(--terracotta);
    color: white;
    border-color: var(--terracotta);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(198, 93, 59, 0.2);
  }

  /* --- SECTION STYLES --- */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--coffee-dark);
    margin-bottom: 1.5rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: var(--coffee-medium);
    max-width: 600px;
    margin: 0 auto;
  }

  /* --- ADINKRA DECORATIONS --- */
  .adinkra-corner {
    position: absolute;
    opacity: 0.08;
    pointer-events: none;
  }

  .adinkra-inline {
    display: inline-flex;
    gap: 1.5rem;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
  }

  /* --- RESPONSIVE DESIGN --- */
  @media (max-width: 768px) {
    .menu-toggle {
      display: block;
    }

    .nav-menu {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background: var(--warm-white);
      flex-direction: column;
      gap: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      border-bottom: 2px solid var(--tan-sand);
    }

    .nav-menu.active {
      max-height: 500px;
    }

    .nav-tab {
      padding: 1rem 2rem;
      border-bottom: 1px solid var(--tan-sand);
      width: 100%;
      text-align: left;
    }

    .nav-tab::after {
      display: none;
    }

    .navbar-custom {
      padding: 0.75rem 1.5rem;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .stat-number {
      font-size: 2.2rem;
    }

    .project-card {
      padding: 1.75rem;
    }

    .stat-box {
      padding: 1.75rem;
    }

    .kente-stripe {
      margin: 1.5rem 0;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 1.75rem;
      line-height: 1.3;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .card-title {
      font-size: 1.2rem;
    }

    .btn-primary, .btn-secondary {
      width: 100%;
      justify-content: center;
      font-size: 0.9rem;
      padding: 0.8rem 1.5rem;
    }
  }

  /* --- ANIMATIONS --- */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeInUp 0.6s ease-out;
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

// --- NAVBAR COMPONENT ---
const NavBar = ({ currentPage, setCurrentPage, pages, isOpen, setIsOpen }) => {
  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={() => setCurrentPage('home')}>
          ✨ Adwoa
        </a>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {pages.map(page => (
            <button
              key={page.id}
              className={`nav-tab ${currentPage === page.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(page.id);
                setIsOpen(false);
              }}
            >
              {page.label}
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// --- HOME PAGE ---
const HomePage = () => (
  <div style={{ background: 'var(--warm-white)' }}>
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Adwoa B. Acheampong</h1>
        <p className="hero-subtitle">Systems Builder • Business Growth Strategist</p>
        <p className="hero-description">
          Transforming businesses with strategic systems and data-driven insights. 
          I help companies scale sustainably, turning vision into measurable growth.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button className="btn-primary">
            Explore My Work <ArrowRight size={20} />
          </button>
          <button className="btn-secondary">
            Get in Touch <Mail size={20} />
          </button>
        </div>
        
        {/* Adinkra symbols showcase */}
        <div className="adinkra-inline" style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center' }}>
            <GyeNyame size={70} color="var(--coffee-dark)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Gye Nyame</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Sankofa size={70} color="var(--terracotta)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Sankofa</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Akoma size={70} color="var(--kente-red)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Akoma</p>
          </div>
        </div>
      </div>
    </div>

    {/* Key highlights */}
    <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Impact at a Glance</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="stat-box">
          <div className="stat-number">120%</div>
          <div className="stat-label">Revenue Growth</div>
          <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.9 }}>Delivered in <strong>6 months</strong></p>
        </div>
        <div className="stat-box">
          <div className="stat-number">83.3%</div>
          <div className="stat-label">Engagement Increase</div>
          <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.9 }}>Sustained growth trajectory</p>
        </div>
        <div className="stat-box">
          <div className="stat-number">5+</div>
          <div className="stat-label">Years Industry</div>
          <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.9 }}>Cross-functional expertise</p>
        </div>
      </div>
    </section>
  </div>
);

// --- BIO PAGE ---
const BioPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">My Story</h2>
        <p className="section-subtitle">From self-taught analyst to strategic growth partner</p>
      </div>

      <div className="kente-stripe"></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
        <div className="project-card">
          <Target size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Foundation</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Starting as a self-taught data analyst, I discovered a passion for connecting dots between data and business outcomes. My journey began with curiosity and determination to understand the systems that drive growth.
          </p>
        </div>

        <div className="project-card">
          <TrendingUp size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Growth</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Through multiple roles in fast-paced environments, I learned to build systems that scale. I've worked across business development, operations, and strategy—each role deepening my understanding of sustainable growth.
          </p>
        </div>

        <div className="project-card">
          <Zap size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Expertise</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Now I partner with companies to architect growth systems that deliver long-term value. I believe in building foundations, not quick fixes.
          </p>
        </div>
      </div>

      <div className="kente-stripe"></div>
    </div>
  </div>
);

// --- PROJECTS PAGE ---
const ProjectsPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Building systems. Delivering results. Creating impact.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* BAA & Bean Project */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Baã & Bean</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Specialty coffee enterprise scaling operations
          </p>
          <div style={{ background: 'var(--warm-white)', padding: '1.5rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={baaAndBeanData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--terracotta)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--terracotta)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--tan-sand)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="var(--terracotta)" fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--earth-deep)' }}>
            <strong>Result:</strong> Scaled revenue from GHS 12K to 31.5K in 6 months through strategic business development and operational optimization.
          </p>
        </div>

        {/* Automobiles Project */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Users size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Automobiles</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Automotive marketplace engagement strategy
          </p>
          <div style={{ background: 'var(--warm-white)', padding: '1.5rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={automobilesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--tan-sand)" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--coffee-dark)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="var(--terracotta)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--earth-deep)' }}>
            <strong>Result:</strong> Increased engagement by 83.3% and sustained sales growth through data-driven marketplace optimization.
          </p>
        </div>

        {/* Strategy & Systems */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Code size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Strategy & Systems</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Custom growth system architecture
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%)',
            color: 'var(--cream)',
            padding: '2rem',
            borderRadius: '2px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Custom</p>
            <p>Tailored systems for your unique challenges</p>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--earth-deep)' }}>
            <strong>Expertise:</strong> Business strategy, operational systems, data architecture, and growth frameworks tailored to your business model.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- EXPERIENCE PAGE ---
const ExperiencePage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Career Journey</h2>
        <p className="section-subtitle">Building expertise across industries and functions</p>
      </div>

      <div className="kente-stripe"></div>

      <div style={{ marginTop: '3rem' }}>
        {[
          {
            role: 'Senior Growth Strategist',
            company: 'Independent Consultant',
            period: '2024 - Present',
            description: 'Building custom growth systems for startups and established businesses'
          },
          {
            role: 'Business Development Manager',
            company: 'Multiple Organizations',
            period: '2021 - 2024',
            description: 'Led revenue growth initiatives, market expansion, and partnership development'
          },
          {
            role: 'Data Analyst',
            company: 'ALX & Corporate Roles',
            period: '2020 - 2021',
            description: 'Analyzed complex datasets, created dashboards, and drove data-informed decisions'
          }
        ].map((item, idx) => (
          <div key={idx} className="timeline-item active">
            <div className="timeline-marker"></div>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--coffee-dark)', marginBottom: '0.25rem' }}>
                {item.role}
              </h3>
              <p style={{ color: 'var(--terracotta)', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                {item.company}
              </p>
              <p style={{ color: 'var(--coffee-medium)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                {item.period}
              </p>
              <p style={{ color: 'var(--earth-deep)', lineHeight: 1.8 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- SKILLS PAGE ---
const SkillsPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Skills & Tools</h2>
        <p className="section-subtitle">Technical expertise meets strategic thinking</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {[
          { title: 'Business Strategy', skills: ['Growth Systems', 'Market Analysis', 'Business Planning', 'Revenue Optimization'] },
          { title: 'Data & Analytics', skills: ['SQL', 'Data Analysis', 'Dashboard Design', 'Business Intelligence'] },
          { title: 'Operations', skills: ['Process Optimization', 'Systems Design', 'Project Management', 'Team Leadership'] },
          { title: 'Tools & Tech', skills: ['Excel', 'Python', 'Tableau', 'Google Analytics', 'Spreadsheet Modeling'] }
        ].map((category, idx) => (
          <div key={idx} style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)', borderRadius: '0' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--coffee-dark)', marginBottom: '1.5rem' }}>
              {category.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {category.skills.map(skill => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="kente-stripe"></div>

      <div style={{ background: 'white', padding: '2.5rem', border: '2px solid var(--kente-red)', marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Award size={40} style={{ color: 'var(--terracotta)' }} />
          <h3 style={{ fontSize: '1.6rem', color: 'var(--coffee-dark)' }}>Certifications</h3>
        </div>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none' }}>
          {[
            'Data Analysis - ALX',
            'Intermediate SQL - DataCamp',
            'Data Analysis Essentials - Cisco',
            'Business Management - Oxford Home Study Centre'
          ].map(cert => (
            <li key={cert} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--earth-deep)' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--terracotta)', borderRadius: '50%' }}></span>
              {cert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// --- CONTACT PAGE ---
const ContactPage = () => (
  <div style={{ background: 'var(--warm-white)', padding: '4rem 2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Let's Work Together</h2>
        <p className="section-subtitle">
          Ready to build growth systems that deliver lasting results?
        </p>
      </div>

      <div className="kente-stripe"></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
        {[
          { icon: Mail, label: 'Email', value: 'adwoa@example.com', action: 'mailto:adwoa@example.com' },
          { icon: Phone, label: 'Phone', value: '(233) 276-291-485', action: 'tel:+233276291485' },
          { icon: MapPin, label: 'Location', value: 'Accra, Ghana', action: '#' }
        ].map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <a
              key={idx}
              href={contact.action}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'white',
                padding: '2rem',
                border: '2px solid var(--tan-sand)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--terracotta)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(198, 93, 59, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--tan-sand)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <Icon size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--coffee-medium)', marginBottom: '0.5rem' }}>
                  {contact.label}
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--coffee-dark)', fontWeight: 600 }}>
                  {contact.value}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Social Links */}
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
        <a href="#" style={{ padding: '1rem', background: 'white', border: '2px solid var(--tan-sand)', transition: 'all 0.3s ease', textDecoration: 'none', color: 'var(--coffee-dark)' }}>
          <Linkedin size={28} />
        </a>
        <a href="#" style={{ padding: '1rem', background: 'white', border: '2px solid var(--tan-sand)', transition: 'all 0.3s ease', textDecoration: 'none', color: 'var(--coffee-dark)' }}>
          <Github size={28} />
        </a>
      </div>
    </div>
  </div>
);

// --- FOOTER ---
const Footer = () => (
  <footer style={{ background: 'var(--coffee-dark)', color: 'var(--cream)', padding: '3rem 2rem', textAlign: 'center' }}>
    <div className="kente-stripe"></div>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <Sankofa size={60} color="var(--tan-sand)" />
        <GyeNyame size={60} color="var(--terracotta)" />
        <Adinkrahene size={60} color="var(--kente-gold)" />
      </div>
      <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>
        Adwoa B. Acheampong
      </p>
      <p style={{ fontSize: '1rem', opacity: 0.8 }}>
        Systems Builder • Growth Strategist • Accra, Ghana
      </p>
      <div className="kente-stripe"></div>
      <p style={{ fontSize: '0.9rem', marginTop: '2rem', opacity: 0.6 }}>
        © 2025 • Built with cultural pride and technical excellence
      </p>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
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
    { id: 'bio', label: 'Story' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'bio':
        return <BioPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--warm-white)' }}>
      <NavBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;
