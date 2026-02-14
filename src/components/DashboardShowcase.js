import React, { memo } from 'react';
import { Activity, Database, Zap } from 'lucide-react';
import MarketChart from './MarketChart';

const DashboardShowcase = memo(() => {
  const transactions = [
    { id: 't1', name: "Cafe Rev", value: "+850", color: "text-success" },
    { id: 't2', name: "Consulting", value: "+1,200", color: "text-success" },
    { id: 't3', name: "Server Cost", value: "-120", color: "text-danger" },
    { id: 't4', name: "License Fee", value: "-500", color: "text-danger" },
  ];

  const features = [
    { icon: Activity, text: "Real-time Data Rendering", color: "text-success" },
    { icon: Database, text: "Complex State Management", color: "text-info" },
    { icon: Zap, text: "Responsive Design", color: "text-warning" }
  ];

  return (
    <section 
      id="portfolio" 
      className="py-5 bg-dark text-white position-relative overflow-hidden"
      aria-labelledby="dashboard-heading"
    >
      <div className="container py-5 position-relative z-1">
        <div className="row align-items-center mb-5">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <span className="text-gold font-mono text-uppercase small ls-1">
              Live Portfolio
            </span>
            <h2 id="dashboard-heading" className="display-5 fw-bold mt-2">
              Interactive Analytics
            </h2>
            <p className="text-white-50 mb-4">
              I don't just report data; I build tools that monitor it in real-time. 
              This component is a functional React widget demonstrating my frontend 
              capabilities alongside backend logic.
            </p>
            
            <ul className="list-unstyled text-white-50 mb-4" role="list">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li 
                    key={index}
                    className="mb-2 d-flex align-items-center gap-2"
                    role="listitem"
                  >
                    <Icon size={16} className={feature.color} aria-hidden="true" />
                    <span>{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div className="col-lg-7">
            <div className="dashboard-frame" role="img" aria-label="Interactive dashboard demonstration">
              <div className="window-header">
                <div className="dot dot-red" aria-hidden="true"></div>
                <div className="dot dot-yellow" aria-hidden="true"></div>
                <div className="dot dot-green" aria-hidden="true"></div>
                <span className="ms-3 text-secondary font-mono small">
                  admin@dashboard:~/analytics
                </span>
              </div>
              
              <div className="row g-0">
                <div className="col-md-8 border-end border-secondary border-opacity-25">
                  <MarketChart />
                </div>
                
                <div className="col-md-4 bg-white bg-opacity-5 p-4">
                  <h3 className="text-uppercase font-mono text-white-50 mb-3 small h6">
                    Live Transactions
                  </h3>
                  
                  <ul className="list-unstyled" role="list">
                    {transactions.map((transaction) => (
                      <li 
                        key={transaction.id}
                        className="d-flex justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-2"
                        role="listitem"
                      >
                        <span className="small text-white-50">
                          {transaction.name}
                        </span>
                        <span className={`small fw-bold font-mono ${transaction.color}`}>
                          {transaction.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

DashboardShowcase.displayName = 'DashboardShowcase';

export default DashboardShowcase;