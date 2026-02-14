// src/constants/index.js   ← or wherever you keep your constants

// ──────────────────────────────────────────────────────────────
// PERSONAL INFO
// ──────────────────────────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Adwoa B. Acheampong (Miracle)",
  role: "Systems Builder & Growth Strategist",
  email: "adwoaacheampong728@gmail.com",
  phone: "(233) 276-291-485",
  location: "Accra, Ghana",
  linkedIn: "https://linkedin.com/in/adwoa-acheampong",
  github: "https://github.com/adwoa-acheampong"
};

// ──────────────────────────────────────────────────────────────
// EXPERIENCE (updated to match new ExperiencePage)
// ──────────────────────────────────────────────────────────────
export const EXPERIENCE = [
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
];

// ──────────────────────────────────────────────────────────────
// DASHBOARD DATA (moved from App.js)
// ──────────────────────────────────────────────────────────────
export const BAA_AND_BEAN_DATA = [
  { month: 'Feb', revenue: 12000, target: 15000 },
  { month: 'Mar', revenue: 18000, target: 18000 },
  { month: 'Apr', revenue: 24000, target: 21000 },
  { month: 'May', revenue: 28000, target: 24000 },
  { month: 'Jun', revenue: 30000, target: 27000 },
  { month: 'Jul', revenue: 31500, target: 30000 }
];

export const AUTOMOBILES_DATA = [
  { week: 'Week 1', sales: 1200, engagement: 45 },
  { week: 'Week 2', sales: 1350, engagement: 52 },
  { week: 'Week 3', sales: 1580, engagement: 61 },
  { week: 'Week 4', sales: 1820, engagement: 68 },
  { week: 'Week 5', sales: 2100, engagement: 75 },
  { week: 'Week 6', sales: 2350, engagement: 78 },
  { week: 'Week 7', sales: 2550, engagement: 82 },
  { week: 'Week 8', sales: 2700, engagement: 83.3 }
];

// ──────────────────────────────────────────────────────────────
// SKILLS (grouped for SkillsPage)
// ──────────────────────────────────────────────────────────────
export const SKILLS = {
  dataAnalytics: [
    'SQL', 'Tableau', 'Power BI', 'Google Sheets',
    'AppScript', 'Data Visualization', 'Statistical Analysis', 'Excel Advanced'
  ],
  operations: [
    'Process Optimization', 'SOP Development', 'Supply Chain',
    'Team Leadership', 'Project Management', 'Compliance', 'Automation'
  ],
  technical: [
    'Python', 'JavaScript', 'React', 'AI Integration',
    'Google Workspace', 'Meta Business Suite', 'CRM Systems'
  ],
  certifications: [
    'Data Analysis - ALX',
    'Intermediate SQL - DataCamp',
    'Data Analysis Essentials - Cisco',
    'Business Management - Oxford Home Study Centre'
  ]
};

// ──────────────────────────────────────────────────────────────
// NAVIGATION (for future use)
// ──────────────────────────────────────────────────────────────
export const NAVIGATION_LINKS = [
  { id: 'home', label: 'Home', icon: 'Coffee' },
  { id: 'bio', label: 'My Story', icon: 'BookOpen' },
  { id: 'projects', label: 'Projects', icon: 'BarChart3' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'skills', label: 'Skills', icon: 'Award' },
  { id: 'contact', label: 'Contact', icon: 'Mail' }
];

export default {
  PERSONAL_INFO,
  EXPERIENCE,
  BAA_AND_BEAN_DATA,
  AUTOMOBILES_DATA,
  SKILLS,
  NAVIGATION_LINKS
};
