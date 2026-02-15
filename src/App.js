import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Coffee, BookOpen, BarChart3, Briefcase, Award, Mail,
  MapPin, Phone, ChevronRight, Linkedin, Github, Download
} from 'lucide-react';

// ────────────────────────────────────────────────
// PERSONAL INFO & DATA
// ────────────────────────────────────────────────
const PERSONAL_INFO = {
  name: 'Adwoa B. Acheampong',
  alias: '(Miracle)',
  role: 'Systems Builder • Growth Strategist',
  email: 'adwoa@jonmonsacs.com',
  phone: '(233) 276-291-485',
  location: 'Accra, Ghana'
};

const baaAndBeanData = [
  { month: 'Feb', revenue: 12000, target: 15000 },
  { month: 'Mar', revenue: 18000, target: 18000 },
  { month: 'Apr', revenue: 24000, target: 21000 },
  { month: 'May', revenue: 28000, target: 24000 },
  { month: 'Jun', revenue: 30000, target: 27000 },
  { month: 'Jul', revenue: 31500, target: 30000 }
];

const automobilesData = [
  { week: '1', sales: 1200, engagement: 45 },
  { week: '2', sales: 1350, engagement: 52 },
  { week: '3', sales: 1580, engagement: 61 },
  { week: '4', sales: 1820, engagement: 68 },
  { week: '5', sales: 2100, engagement: 75 },
  { week: '6', sales: 2350, engagement: 78 },
  { week: '7', sales: 2550, engagement: 82 },
  { week: '8', sales: 2700, engagement: 83.3 }
];

// ────────────────────────────────────────────────
// AUTHENTIC ADINKRA (using public / high-quality sources)
// ────────────────────────────────────────────────
const GyeNyame = ({ size = 100 }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Gye_nyame_adinkra.png"
    alt="Gye Nyame – Except God (supremacy of God)"
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

const Sankofa = ({ size = 100 }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Sankofa.svg"
    alt="Sankofa bird – Go back and fetch it (learn from the past)"
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

const Dwennimmen = ({ size = 100 }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Dwennimmen.png"
    alt="Dwennimmen – Ram's horns (strength & humility)"
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

// ────────────────────────────────────────────────
// CSS (mobile-first, Ghanaian-modern aesthetic)
// ────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Crimson+Text:wght@400;600&display=swap');

  :root {
    --coffee-dark: #5c4033;
    --coffee-medium: #8b6f47;
    --tan-sand: #d2b48c;
    --terracotta: #c65d3b;
    --cream: #f5e6d3;
    --earth-deep: #3e2723;
    --warm-white: #fff8f0;
    --kente-red: #a61c1c;
    --kente-gold: #d4af37;
    --kente-green: #2f5233;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    background: var(--warm-white);
    color: var(--earth-deep);
    font-family: 'Crimson Text', serif;
    line-height: 1.7;
  }

  h1, h2, h3 { font-family: 'Cormorant Garamond', serif; font-weight: 600; }

  .kente-bar {
    height: 6px;
    background: repeating-linear-gradient(90deg,
      var(--kente-red) 0 10px, var(--kente-gold) 10px 20px,
      var(--kente-green) 20px 30px, var(--terracotta) 30px 40px);
  }

  .navbar {
    position: sticky;
    top: 0;
    background: rgba(255,248,240,0.97);
    backdrop-filter: blur(10px);
    border-bottom: 3px solid var(--tan-sand);
    z-index: 1000;
    transition: box-shadow .3s;
  }

  .navbar.scrolled { box-shadow: 0 4px 20px rgba(92,64,51,0.12); }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo { font-size: clamp(1.8rem, 5vw, 2.4rem); font-weight: 700; color: var(--coffee-dark); }

  .nav-links { display: flex; gap: 1.4rem; }

  .nav-btn {
    background: none;
    border: none;
    color: var(--coffee-dark);
    font-weight: 600;
    font-size: 1.05rem;
    padding: 0.6rem 1.1rem;
    cursor: pointer;
  }

  .nav-btn:hover, .nav-btn.active { color: var(--terracotta); }

  .nav-btn.active::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 3px;
    background: var(--terracotta);
  }

  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { width: 26px; height: 3px; background: var(--coffee-dark); }

  .mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--warm-white);
    border-top: 3px solid var(--tan-sand);
    padding: 1rem;
    box-shadow: 0 8px 24px rgba(60,40,30,0.15);
  }

  .mobile-menu.open { display: flex; flex-direction: column; gap: 0.6rem; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }

  .hero {
    min-height: 85vh;
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, #f9f0e6, #fff8f0);
  }

  .hero-content {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    z-index: 2;
  }

  .hero-title { font-size: clamp(3.8rem, 10vw, 7.5rem); line-height: 1; color: var(--coffee-dark); }

  .hero-subtitle { font-size: clamp(1.5rem, 4vw, 2.1rem); color: var(--coffee-medium); font-style: italic; margin: 1.2rem 0 2rem; }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1.5rem;
    margin: 2.8rem 0;
  }

  .metric-card {
    background: rgba(139,111,71,0.06);
    border: 1px solid var(--tan-sand);
    border-radius: 10px;
    padding: 1.6rem;
    text-align: center;
    transition: all 0.3s;
  }

  .metric-card:hover {
    transform: translateY(-6px);
    border-color: var(--terracotta);
    box-shadow: 0 12px 28px rgba(111,78,55,0.14);
  }

  .metric-value { font-size: clamp(2.6rem, 7vw, 4rem); font-weight: 700; color: var(--terracotta); }

  .btn-primary {
    background: var(--coffee-dark);
    color: white;
    border: none;
    padding: 1rem 2.4rem;
    font-weight: 600;
    font-size: 1.05rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }

  .btn-primary:hover { background: var(--terracotta); transform: translateY(-2px); }

  .btn-outline {
    background: transparent;
    color: var(--coffee-dark);
    border: 2px solid var(--coffee-dark);
  }

  .btn-outline:hover { background: var(--coffee-dark); color: white; }

  .section-padding { padding: 6rem 1.5rem; max-width: 1200px; margin: 0 auto; }

  .section-title { font-size: clamp(2.8rem, 7vw, 4.8rem); text-align: center; margin-bottom: 1.5rem; }

  .timeline-item {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 3rem;
    border-left: 3px solid var(--tan-sand);
  }

  .timeline-marker {
    position: absolute;
    left: -12px;
    top: 8px;
    width: 20px;
    height: 20px;
    background: var(--terracotta);
    border: 4px solid var(--coffee-dark);
    border-radius: 50%;
  }

  .skill-badge {
    background: var(--coffee-dark);
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 999px;
    margin: 0.4rem;
    font-size: 0.95rem;
    display: inline-block;
  }
`;

// ────────────────────────────────────────────────
// MAIN APP COMPONENT
// ────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Coffee },
    { id: 'bio', label: 'My Story', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: BarChart3 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">Adwoa</div>

          <div className="nav-links">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-btn ${page === item.id ? 'active' : ''}`}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>

        <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${page === item.id ? 'active' : ''}`}
              onClick={() => { setPage(item.id); setMobileOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="kente-bar" />
      </nav>

      {/* Page Content */}
      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'bio' && <Bio />}
        {page === 'projects' && <Projects />}
        {page === 'experience' && <Experience />}
        {page === 'skills' && <Skills />}
        {page === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'var(--coffee-dark)',
        color: 'var(--cream)',
        textAlign: 'center',
        padding: '4rem 1.5rem 3rem',
        marginTop: '6rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <Sankofa size={70} />
          <GyeNyame size={70} />
          <Dwennimmen size={70} />
        </div>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
          Adwoa B. Acheampong (Miracle)
        </p>
        <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
          Systems Builder • Growth Strategist • Accra, Ghana
        </p>
        <p style={{ fontSize: '0.95rem', opacity: 0.75 }}>
          © {new Date().getFullYear()} — Built with cultural wisdom and technical precision
        </p>
      </footer>
    </>
  );
}

// ────────────────────────────────────────────────
// HOME – Strong, competent first impression
// ────────────────────────────────────────────────
function Home({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Adwoa B. Acheampong
          <span style={{ display: 'block', fontSize: '0.38em', color: 'var(--terracotta)', fontStyle: 'italic' }}>
            {PERSONAL_INFO.alias}
          </span>
        </h1>

        <p className="hero-subtitle">{PERSONAL_INFO.role}</p>

        <p style={{ fontSize: 'clamp(1.2rem, 3.2vw, 1.4rem)', maxWidth: 720, margin: '1.8rem auto 3rem', lineHeight: 1.8 }}>
          I design repeatable systems that convert data into consistent, long-term revenue growth — prioritizing repeat business, operational leverage, and sustainable scalability.
        </p>

        <div className="metric-grid">
          <div className="metric-card">
            <div className="metric-value">120%</div>
            <div style={{ fontWeight: 600, margin: '0.5rem 0 0.3rem' }}>Revenue Growth</div>
            <div style={{ fontSize: '0.94rem', opacity: 0.85 }}>Baa & Bean Café • 3 months</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">83.3%</div>
            <div style={{ fontWeight: 600, margin: '0.5rem 0 0.3rem' }}>Engagement Increase</div>
            <div style={{ fontSize: '0.94rem', opacity: 0.85 }}>Repeat-customer model</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">2×</div>
            <div style={{ fontWeight: 600, margin: '0.5rem 0 0.3rem' }}>Branch Expansion Enabled</div>
            <div style={{ fontSize: '0.94rem', opacity: 0.85 }}>Automobiles Ghana</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', margin: '2.5rem 0' }}>
          <span style={{ background: 'var(--cream)', border: '1px solid var(--tan-sand)', borderRadius: 999, padding: '0.5rem 1.2rem', fontSize: '0.95rem' }}>
            SQL • Power BI
          </span>
          <span style={{ background: 'var(--cream)', border: '1px solid var(--tan-sand)', borderRadius: 999, padding: '0.5rem 1.2rem', fontSize: '0.95rem' }}>
            Process Automation
          </span>
          <span style={{ background: 'var(--cream)', border: '1px solid var(--tan-sand)', borderRadius: 999, padding: '0.5rem 1.2rem', fontSize: '0.95rem' }}>
            Repeat-Business Frameworks
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => setPage('bio')}>
            Read My Story <ChevronRight size={20} />
          </button>
          <button className="btn-outline" onClick={() => setPage('projects')}>
            View Projects & Results <BarChart3 size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// BIO
// ────────────────────────────────────────────────
function Bio() {
  return (
    <div className="section-padding">
      <h2 className="section-title">My Story</h2>
      <div className="kente-bar" style={{ width: 220, margin: '0 auto 4rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3.5rem', marginBottom: '5rem', textAlign: 'center' }}>
        <div>
          <Sankofa size={100} />
          <p style={{ marginTop: '1.4rem', fontStyle: 'italic', color: 'var(--coffee-medium)' }}>
            "Go back and fetch it"<br/>
            <small>— Learn from the past to build better futures</small>
          </p>
        </div>
        <div>
          <GyeNyame size={100} />
          <p style={{ marginTop: '1.4rem', fontStyle: 'italic', color: 'var(--coffee-medium)' }}>
            "Except God"<br/>
            <small>— Supremacy of a higher power</small>
          </p>
        </div>
        <div>
          <Dwennimmen size={100} />
          <p style={{ marginTop: '1.4rem', fontStyle: 'italic', color: 'var(--coffee-medium)' }}>
            "Ram's horns"<br/>
            <small>— Strength & humility</small>
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.9 }}>
        <p style={{ marginBottom: '1.8rem' }}>
          I’m Adwoa B. Acheampong — known as Miracle to those closest to me — a Ghanaian operations professional who turns data and discipline into sustainable business growth.
        </p>
        <p style={{ marginBottom: '1.8rem' }}>
          Financial barriers stopped me from finishing my Computer Engineering degree, but they didn’t stop me. While working multiple contract roles (often on less than 4 hours sleep), I self-taught data analysis, SQL, automation, process design, and systems thinking.
        </p>
        <p style={{ marginBottom: '1.8rem' }}>
          Certifications (ALX Data Analysis, DataCamp SQL, Cisco Data Essentials, Oxford Business Management) gave structure — but real results came from applying them: 120% revenue lifts, 83% engagement jumps, automated workflows that freed teams, and repeat-customer models that companies asked me to rebuild.
        </p>
        <p>
          From age 11–17 I rose to Regimental Sergeant Major in cadets. That discipline, organisation, and resilience still shape how I work today.
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// PROJECTS (with charts)
// ────────────────────────────────────────────────
function Projects() {
  return (
    <div className="section-padding">
      <h2 className="section-title">Projects</h2>
      <div className="kente-bar" style={{ width: 220, margin: '0 auto 4rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
        {/* Baa & Bean */}
        <div style={{ background: 'white', border: '1px solid var(--tan-sand)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '1.8rem', background: 'var(--coffee-medium)', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Baa & Bean Café</h3>
            <p style={{ margin: '0.6rem 0 0', opacity: 0.9 }}>120% revenue growth in 3 months</p>
          </div>
          <div style={{ padding: '1.8rem' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={baaAndBeanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="var(--coffee-dark)" />
                <YAxis stroke="var(--coffee-dark)" />
                <Tooltip />
                <Bar dataKey="revenue" fill="var(--terracotta)" name="Actual" />
                <Bar dataKey="target" fill="var(--tan-sand)" name="Target" />
              </BarChart>
            </ResponsiveContainer>
            <ul style={{ marginTop: '1.5rem', paddingLeft: '1.4rem', lineHeight: 1.8 }}>
              <li>Data-driven menu & peak-hour optimisation</li>
              <li>Kitchen SOP refinement & waste reduction</li>
              <li>Supply chain restructure for cost + quality</li>
            </ul>
          </div>
        </div>

        {/* Automobiles */}
        <div style={{ background: 'white', border: '1px solid var(--tan-sand)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '1.8rem', background: 'var(--coffee-medium)', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '1.6rem' }}>Automobiles Ghana</h3>
            <p style={{ margin: '0.6rem 0 0', opacity: 0.9 }}>83.3% engagement lift + sales doubling</p>
          </div>
          <div style={{ padding: '1.8rem' }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={automobilesData}>
                <defs>
                  <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--terracotta)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--terracotta)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="week" stroke="var(--coffee-dark)" />
                <YAxis yAxisId="left" stroke="var(--coffee-dark)" label={{ value: 'Sales (GHS)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--coffee-medium)" label={{ value: 'Engagement %', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Area yAxisId="left" dataKey="sales" stroke="var(--terracotta)" fill="url(#salesColor)" name="Sales" />
                <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="var(--coffee-medium)" strokeWidth={2} name="Engagement" dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
            <ul style={{ marginTop: '1.5rem', paddingLeft: '1.4rem', lineHeight: 1.8 }}>
              <li>Built repeat-customer acquisition model</li>
              <li>Enabled expansion to 2 new branches</li>
              <li>Re-engaged for next growth phase</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// EXPERIENCE
// ────────────────────────────────────────────────
function Experience() {
  const experience = [
    {
      role: "Statutory Operations Director",
      company: "JonMon-Sacs Ghana Ltd",
      period: "Jul 2025 – Present",
      points: [
        "Oversee business licensing & regulatory compliance",
        "Lead team of 5 officers",
        "Ensure full adherence to Ghanaian business laws"
      ]
    },
    {
      role: "Operations Manager",
      company: "Baa & Bean Café",
      period: "Feb 2024 – Jul 2024",
      points: [
        "Grew daily revenue from GHS 12k → 30k+ (120% increase)",
        "Implemented data-driven menu & operations optimisation",
        "Restructured supply chain for efficiency & quality"
      ]
    },
    {
      role: "Operations Consultant",
      company: "Automobiles Ghana Limited",
      period: "2024 & 2026",
      points: [
        "Increased customer engagement by 83.3%",
        "Doubled daily sales (GHS 1.2k → 2.7k)",
        "Built repeat models enabling 2-branch expansion",
        "Re-engaged for next growth phase"
      ]
    },
    {
      role: "Administration Manager",
      company: "Zein Real Estate",
      period: "Mar 2023 – Jan 2024",
      points: [
        "Improved office productivity by 30%",
        "Built automation systems using AppScript + AI",
        "Created digital filing & workflow systems"
      ]
    }
  ];

  return (
    <div className="section-padding">
      <h2 className="section-title">Experience</h2>
      <div className="kente-bar" style={{ width: 220, margin: '0 auto 4rem' }} />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {experience.map((job, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-marker" />
            <div style={{ color: 'var(--coffee-medium)', fontStyle: 'italic', marginBottom: '0.6rem' }}>
              {job.period}
            </div>
            <h3 style={{ fontSize: '1.7rem', color: 'var(--coffee-dark)', marginBottom: '0.4rem' }}>
              {job.role}
            </h3>
            <div style={{ color: 'var(--terracotta)', fontWeight: 600, marginBottom: '1rem' }}>
              {job.company}
            </div>
            <ul style={{ paddingLeft: '1.4rem', lineHeight: 1.8 }}>
              {job.points.map((point, j) => <li key={j}>{point}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// SKILLS
// ────────────────────────────────────────────────
function Skills() {
  return (
    <div className="section-padding" style={{ background: 'var(--cream)' }}>
      <h2 className="section-title">Skills & Certifications</h2>
      <div className="kente-bar" style={{ width: 220, margin: '0 auto 4rem' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: 12, border: '1px solid var(--tan-sand)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.4rem', color: 'var(--coffee-dark)' }}>Data & Analytics</h3>
          {['SQL', 'Power BI', 'Tableau', 'Google Sheets', 'AppScript', 'Data Visualization', 'Statistical Analysis'].map(s => (
            <span key={s} className="skill-badge">{s}</span>
          ))}
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: 12, border: '1px solid var(--tan-sand)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.4rem', color: 'var(--coffee-dark)' }}>Operations & Systems</h3>
          {['Process Optimization', 'SOP Development', 'Supply Chain', 'Team Leadership', 'Project Management', 'Automation', 'Compliance'].map(s => (
            <span key={s} className="skill-badge">{s}</span>
          ))}
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: 12, border: '1px solid var(--tan-sand)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.4rem', color: 'var(--coffee-dark)' }}>Certifications</h3>
          <ul style={{ lineHeight: 2.2, paddingLeft: '1.4rem' }}>
            <li><strong>Data Analysis</strong> – ALX</li>
            <li><strong>Intermediate SQL</strong> – DataCamp</li>
            <li><strong>Data Analysis Essentials</strong> – Cisco</li>
            <li><strong>Business Management</strong> – Oxford Home Study Centre</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// CONTACT
// ────────────────────────────────────────────────
function Contact() {
  return (
    <div className="section-padding">
      <h2 className="section-title">Let’s Build Together</h2>
      <div className="kente-bar" style={{ width: 220, margin: '0 auto 3rem' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1.3rem', marginBottom: '3rem', color: 'var(--coffee-medium)' }}>
          Ready to scale with systems focused on long-term, repeatable growth?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.8rem' }}>Get in Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={28} color="var(--terracotta)" />
                <a href={`mailto:${PERSONAL_INFO.email}`} style={{ color: 'var(--coffee-dark)', fontWeight: 500 }}>
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={28} color="var(--terracotta)" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin size={28} color="var(--terracotta)" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <a href="#" style={{ color: 'var(--coffee-dark)' }}><Linkedin size={32} /></a>
              <a href="#" style={{ color: 'var(--coffee-dark)' }}><Github size={32} /></a>
            </div>
          </div>

          <div style={{ background: 'var(--coffee-dark)', color: 'white', padding: '2.5rem', borderRadius: 12 }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.8rem' }}>Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <button className="btn-primary" style={{ width: '100%' }}>
                Download Resume <Download size={18} />
              </button>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--terracotta)' }}>
                Psychometric Assessment <Download size={18} />
              </button>
              <button className="btn-primary" style={{ width: '100%', background: 'var(--terracotta)' }}>
                Case Studies <BarChart3 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
