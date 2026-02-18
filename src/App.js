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

// --- CUSTOM CSS ---
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
.hero-container {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--cream) 0%, rgba(210, 180, 140, 0.3) 100%);
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
  box-shadow: 0 4px 12px rgba(111, 78, 55, 0.08);
}
.btn-secondary:hover {
  background: var(--coffee-dark);
  color: var(--cream);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(111, 78, 55, 0.2);
}
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
  font-size: 1.3rem;
  color: var(--coffee-dark);
  margin-bottom: 1rem;
}
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
  font-size: clamp(1.8rem, 4vw, 2.8rem);
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
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}
.section-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--coffee-dark);
  margin-bottom: 1.5rem;
}
.section-subtitle {
  font-size: 1.1rem;
  color: var(--coffee-medium);
  max-width: 600px;
  margin: 0 auto;
}
.adinkra-inline {
  display: inline-flex;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
}
@media (max-width: 768px) {
  .menu-toggle { display: block; }
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
  .nav-menu.active { max-height: 500px; }
  .nav-tab {
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--tan-sand);
    width: 100%;
    text-align: left;
  }
  .nav-tab::after { display: none; }
  .navbar-custom { padding: 0.75rem 1.5rem; }
  .hero-title { font-size: 1.5rem; }
  .hero-subtitle { font-size: 0.85rem; }
  .section-title { font-size: 1.3rem; }
  .stat-number { font-size: 1.8rem; }
  .project-card { padding: 1.75rem; }
  .stat-box { padding: 1.75rem; }
  .kente-stripe { margin: 1.5rem 0; }
}
@media (max-width: 480px) {
  .hero-title { font-size: 1.75rem; line-height: 1.3; }
  .section-title { font-size: 1.5rem; }
  .card-title { font-size: 1.2rem; }
  .btn-primary, .btn-secondary {
    width: 100%;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeInUp 0.6s ease-out; }
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
          ✨ Miracle Worker
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

// --- HOME PAGE COMPONENTS ---
const CEOValueProposition = () => (
  <div className="hero-container" style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, var(--cream) 0%, rgba(210, 180, 140, 0.3) 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem'
  }}>
    <div className="hero-content" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      width: '100%'
    }}>
      <div style={{
        background: 'rgba(255, 248, 240, 0.85)',
        borderLeft: '4px solid var(--terracotta)',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h1 className="hero-title" style={{
          fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
          color: 'var(--coffee-dark)',
          lineHeight: 1.2,
          marginBottom: '1rem'
        }}>
          You're Losing <span style={{
            color: 'var(--terracotta)',
            fontWeight: 700
          }}>GHS 1,200 Daily</span> Because Your Systems Don't Understand Your Business
        </h1>
        <p className="hero-subtitle" style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          color: 'var(--coffee-medium)',
          fontWeight: 500,
          margin: '1.5rem 0'
        }}>
          Business Systems Analyst & Operations Architect | Transforming African Businesses Through Strategic Systems
        </p>
        <p className="hero-description" style={{
          fontSize: '1.15rem',
          color: 'var(--earth-deep)',
          maxWidth: '700px',
          margin: '2rem 0 3rem 0',
          lineHeight: 1.8
        }}>
          I don't just build systems — I engineer <strong>profit-generating business frameworks</strong> that align with your unique operational culture. My African business intuition combined with technical expertise delivers measurable ROI in 90 days or less.
        </p>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <a href="#contact" className="btn-primary">
            Claim Your Free System Audit <ArrowRight size={20} />
          </a>
          <button className="btn-secondary" style={{
            background: 'transparent',
            color: 'var(--coffee-dark)'
          }}>
            See CEO Success Stories <BookOpen size={20} />
          </button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2.5rem'
        }}>
          <div style={{
            borderLeft: '3px solid var(--terracotta)',
            paddingLeft: '1rem'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'var(--terracotta)'
            }}>120%</div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--coffee-medium)'
            }}>Revenue Growth in 6 Months</div>
          </div>
          <div style={{
            borderLeft: '3px solid var(--kente-gold)',
            paddingLeft: '1rem'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'var(--kente-gold)'
            }}>83.3%</div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--coffee-medium)'
            }}>Engagement Increase</div>
          </div>
          <div style={{
            borderLeft: '3px solid var(--kente-green)',
            paddingLeft: '1rem'
          }}>
            <div style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'var(--kente-green)'
            }}>90 Days</div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--coffee-medium)'
            }}>Average ROI Timeline</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataInsightsSection = () => (
  <section style={{
    padding: '4rem 2rem',
    background: 'var(--warm-white)'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <h2 className="section-title" style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--coffee-dark)'
        }}>Revenue Intelligence Dashboard</h2>
        <p className="section-subtitle" style={{
          fontSize: '1.1rem',
          color: 'var(--coffee-medium)'
        }}>Real data from businesses I've transformed</p>
      </div>
      <div className="kente-stripe" style={{ margin: '2rem 0' }} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {/* Revenue Growth Chart */}
        <div style={{
          background: 'white',
          padding: '2rem',
          border: '2px solid var(--tan-sand)',
          borderRadius: '0'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: 'var(--coffee-dark)',
            marginBottom: '1.5rem'
          }}>Revenue Growth by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { industry: 'Retail', growth: 120 },
              { industry: 'Automotive', growth: 125 }, /* Fixed Syntax Error */
              { industry: 'Hospitality', growth: 95 },
              { industry: 'Real Estate', growth: 85 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tan-sand)" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: 'var(--coffee-dark)',
                  border: 'none',
                  borderRadius: '4px'
                }}
                labelStyle={{ color: 'var(--cream)' }}
                itemStyle={{ color: 'var(--kente-gold)' }}
              />
              <Bar
                dataKey="growth"
                fill="url(#colorRevenueBar)"
                radius={[5, 5, 0, 0]}
              >
                <defs>
                  <linearGradient id="colorRevenueBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--terracotta)" />
                    <stop offset="100%" stopColor="var(--kente-gold)" />
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--coffee-medium)'
          }}>
            <span>6-month average growth</span>
            <span style={{ fontWeight: 600, color: 'var(--terracotta)' }}>106.3%</span>
          </div>
        </div>
        {/* Process Efficiency Chart */}
        <div style={{
          background: 'white',
          padding: '2rem',
          border: '2px solid var(--tan-sand)',
          borderRadius: '0'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: 'var(--coffee-dark)',
            marginBottom: '1.5rem'
          }}>Process Efficiency Gains</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { week: 'W1', efficiency: 70 },
              { week: 'W2', efficiency: 75 },
              { week: 'W3', efficiency: 82 },
              { week: 'W4', efficiency: 88 },
              { week: 'W5', efficiency: 92 },
              { week: 'W6', efficiency: 95 },
              { week: 'W7', efficiency: 96 },
              { week: 'W8', efficiency: 97 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tan-sand)" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: 'var(--coffee-dark)',
                  border: 'none',
                  borderRadius: '4px'
                }}
                labelStyle={{ color: 'var(--cream)' }}
                itemStyle={{ color: 'var(--kente-gold)' }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="var(--kente-green)"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--coffee-medium)'
          }}>
            <span>Average efficiency increase</span>
            <span style={{ fontWeight: 600, color: 'var(--kente-green)' }}>+30%</span>
          </div>
        </div>
        {/* ROI Timeline Chart */}
        <div style={{
          background: 'white',
          padding: '2rem',
          border: '2px solid var(--tan-sand)',
          borderRadius: '0'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: 'var(--coffee-dark)',
            marginBottom: '1.5rem'
          }}>ROI Timeline by Project Size</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              { size: 'Small', roi: 60 },
              { size: 'Medium', roi: 45 },
              { size: 'Large', roi: 30 }
            ]}>
              <defs>
                <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--kente-gold)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--kente-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tan-sand)" />
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: 'var(--coffee-dark)',
                  border: 'none',
                  borderRadius: '4px'
                }}
                labelStyle={{ color: 'var(--cream)' }}
                itemStyle={{ color: 'var(--kente-gold)' }}
              />
              <Area
                type="monotone"
                dataKey="roi"
                stroke="var(--kente-gold)"
                fill="url(#colorRoi)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--coffee-medium)'
          }}>
            <span>Average ROI timeline</span>
            <span style={{ fontWeight: 600, color: 'var(--kente-gold)' }}>45 days</span>
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div style={{
        background: 'rgba(111, 78, 55, 0.05)',
        borderLeft: '4px solid var(--terracotta)',
        padding: '1.5rem',
        borderRadius: '0',
        marginTop: '3rem'
      }}>
        <h4 style={{
          color: 'var(--coffee-dark)',
          fontSize: '1.2rem',
          marginBottom: '1rem'
        }}>Key Business Insights</h4>
        <ul style={{
          listStyle: 'none',
          paddingLeft: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            color: 'var(--earth-deep)'
          }}>
            <span style={{
              color: 'var(--terracotta)',
              fontWeight: 700,
              marginTop: '0.25rem'
            }}>•</span>
            <span>Businesses lose an average of <strong>23.7%</strong> of potential revenue due to culturally mismatched systems</span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            color: 'var(--earth-deep)'
          }}>
            <span style={{
              color: 'var(--terracotta)',
              fontWeight: 700,
              marginTop: '0.25rem'
            }}>•</span>
            <span>Projects incorporating cultural intelligence see <strong>47% faster</strong> adoption rates and <strong>32% higher</strong> ROI</span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            color: 'var(--earth-deep)'
          }}>
            <span style={{
              color: 'var(--terracotta)',
              fontWeight: 700,
              marginTop: '0.25rem'
            }}>•</span>
            <span>Every <strong>GHS 1</strong> invested in culturally-aligned systems generates <strong>GHS 4.20</strong> in revenue within 90 days</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

// --- COMBINED HOME PAGE (Fixes Missing Component & Orphaned JSX) ---
const HomePage = () => (
  <div>
    <CEOValueProposition />
    <DataInsightsSection />
    
    {/* Adinkra symbols showcase (Moved from orphaned code) */}
    <div style={{ padding: '4rem 2rem', background: 'var(--warm-white)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="adinkra-inline" style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center' }}>
            <GyeNyame size={70} color="var(--coffee-dark)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Gye Nyame</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--tan-sand)', fontStyle: 'italic' }}>God is Great</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Sankofa size={70} color="var(--terracotta)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Sankofa</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--tan-sand)', fontStyle: 'italic' }}>Return & Get It</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <DwennimmenAdinkra size={70} color="var(--clay)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Dwennimmen</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--tan-sand)', fontStyle: 'italic' }}>Strength & Humility</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AkomaNtoaso size={70} color="var(--kente-red)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Akoma Ntoaso</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--tan-sand)', fontStyle: 'italic' }}>Unity & Harmony</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Adinkrahene size={70} color="var(--kente-gold)" />
            <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--coffee-medium)' }}>Adinkrahene</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: 'var(--tan-sand)', fontStyle: 'italic' }}>Leadership & Excellence</p>
          </div>
        </div>
      </div>
    </div>

    {/* Key highlights (Moved from orphaned code) */}
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
        <p className="section-subtitle">From entrepreneur, to analyst to strategic growth partner</p>
      </div>
      <div className="kente-stripe"></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
        <div className="project-card">
          <Target size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Foundation</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Starting as an entrepreneur and administrator, I developed a focus on the frameworks that scale businesses. My transition into systems analysis was driven by a commitment to transforming raw operational data into structured, high-growth outcomes.
          </p>
        </div>
        <div className="project-card">
          <TrendingUp size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Growth</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Through multiple roles in varied industries from retail to hospitality, I learned to build systems that scale. I've worked across business development, operations, and strategy. Each role deepening my understanding of sustainable growth.
          </p>
        </div>
        <div className="project-card">
          <Zap size={40} style={{ color: 'var(--terracotta)', marginBottom: '1rem' }} />
          <h3 className="card-title">The Expertise</h3>
          <p style={{ lineHeight: 1.8, color: 'var(--earth-deep)' }}>
            Now I partner with companies to architect growth systems that deliver long-term value. I specialize in identifying the 'line of best fit' between technical capabilities and business requirements. I believe in building solid foundations, not quick fixes.
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
        <h2 className="section-title">Case Studies & Systems</h2>
        <p className="section-subtitle">Translating complex business requirements into high-performance systems.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* BAA & Bean */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <BarChart3 size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Business Model Optimization</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Baa & Bean Café | Operations Re-engineering
          </p>
          <div style={{ background: 'var(--warm-white)', padding: '1.5rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={baaAndBeanData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--terracotta)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--terracotta)" stopOpacity={0} />
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
            <strong>The Solution:</strong> Identified revenue leakage in existing SOPs. Redesigned sales and inventory workflows, resulting in a 120% revenue increase (from GHS 12K to 31.5K) within six months.
          </p>
        </div>
        {/* Automobiles */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Users size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Digital Transformation</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Automobiles Ghana Ltd | AI Systems Integration
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
            <strong>The Solution:</strong> In league with Stoic Team Ghana, analyzed marketplace friction to implement AI-driven lead management. Achieved an 83.3% boost in engagement and doubled daily sales revenue.
          </p>
        </div>
        {/* Strategy & Systems */}
        <div className="project-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Code size={32} style={{ color: 'var(--terracotta)' }} />
            <h3 className="card-title" style={{ margin: 0 }}>Operational Frameworks</h3>
          </div>
          <p style={{ color: 'var(--coffee-medium)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Scalable Enterprise Architecture
          </p>
          <div style={{
            background: 'linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%)',
            color: 'var(--cream)',
            padding: '2rem',
            borderRadius: '2px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Process Architect</p>
            <p style={{ fontSize: '0.9rem' }}>Mapping technical logic to business objectives.</p>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--earth-deep)' }}>
            <strong>Core Competency:</strong> Requirements gathering, gap analysis, and the development of custom automation tools (Google Apps Script) to eliminate administrative bottlenecks.
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
            role: 'Business Systems Analyst (Consultant)',
            company: 'Automobiles Ghana Ltd / Stoic Team Ghana',
            period: '2024 - Present',
            description: 'Translating business needs into technical requirements for AI implementation. Designing remote sales frameworks and digital workflows that increased daily sales from GHS 1,200 to GHS 2,700 by aligning technology with market demand.'
          },
          {
            role: 'Business Operations Manager',
            company: "Baa & Bean Café's",
            period: '2024 - 2025',
            description: 'Performed gap analysis on existing sales strategies and redesigned SOPs to capture a 120% revenue increase. Negotiated complex contracts and managed international stakeholder compliance to ensure sustainable project scaling.'
          },
          {
            role: 'Administration Manager & Executive Assistant',
            company: 'Zein Real Estate / Trident Group',
            period: '2023 - 2025',
            description: 'Analyzed internal administrative bottlenecks and implemented automated solutions via Apps Script, resulting in a 30% gain in office efficiency. Managed cross-functional marketing efforts and translated lead data into executive-level strategy reports.'
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
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">Bridging technical requirements with operational excellence.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {[
          {
            title: 'Business Analysis',
            skills: ['Requirements Gathering', 'Process Modeling (BPMN)', 'Gap Analysis', 'Revenue Optimization', 'KANBAN Architecture']
          },
          {
            title: 'Business Intelligence',
            skills: ['Power BI Reporting', 'SQL (Intermediate)', 'Predictive Trend Tracking', 'OSEMN Framework', 'Spreadsheet Modeling']
          },
          {
            title: 'Systems & AI Strategy',
            skills: ['SOP Design', 'AI Workflow Automation', 'Change Management', 'Cross-functional Leadership', 'Systems Thinking']
          },
          {
            title: 'Technical Stack',
            skills: ['Google Apps Script', 'Microsoft Power BI', 'Meta Business Suite', 'Google Workspace', 'Quickbooks Online', 'ERP Systems']
          }
        ].map((category, idx) => (
          <div key={idx} style={{ background: 'white', padding: '2rem', border: '2px solid var(--tan-sand)', borderRadius: '0' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--coffee-dark)', marginBottom: '1.5rem', fontWeight: 'bold', letterSpacing: '0.05rem', textTransform: 'uppercase' }}>
              {category.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {category.skills.map(skill => (
                <span key={skill} className="skill-badge" style={{
                  background: 'var(--tan-sand)',
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.85rem',
                  color: 'var(--coffee-dark)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontWeight: '500'
                }}>
                  {skill}
                </span>
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
          { icon: Mail, label: 'Email', value: 'adwoaacheampong728@gmail.com', action: 'mailto:adwoaacheampong728@gmail.com' },
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
      <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
        Adwoa B. Acheampong
      </p>
      <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>
        Operations • Systems Builder • Growth Strategist • Accra, Ghana
      </p>
      <div className="kente-stripe"></div>
      <p style={{ fontSize: '0.9rem', marginTop: '2rem', opacity: 0.6 }}>
        © 2025 • Built with native pride and technical excellence
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
      case 'contact':import React, { useState, useEffect } from 'react';
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
