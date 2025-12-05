import React, { useState, useEffect, memo, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const MarketChart = memo(() => {
  const [data, setData] = useState([]);
  
  // Memoize initial data generation
  const initialData = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      time: i, 
      value: 4000 + Math.random() * 1000
    })), []
  );

  useEffect(() => {
    setData(initialData);
    
    const interval = setInterval(() => {
      setData(prev => {
        const lastVal = prev[prev.length - 1]?.value || 4500;
        const newVal = Math.max(0, lastVal + (Math.random() - 0.5) * 500);
        return [...prev.slice(1), { 
          time: prev.length, 
          value: newVal 
        }];
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [initialData]);

  // Memoize current value calculation
  const currentValue = useMemo(() => {
    const lastDataPoint = data[data.length - 1];
    return lastDataPoint ? lastDataPoint.value.toFixed(0) : '0';
  }, [data]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      return (
        <div className="bg-dark p-2 rounded shadow">
          <p className="text-white small m-0">
            GHS {payload[0].value.toFixed(0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-100 p-4">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <p className="text-secondary font-mono mb-1 text-uppercase small">
            Revenue Trend
          </p>
          <h2 className="m-0 fw-bold text-white">
            GHS {Number(currentValue).toLocaleString()}
          </h2>
        </div>
        <span className="badge bg-success bg-opacity-25 text-success px-3 py-2 rounded-pill d-flex align-items-center">
          +12.5% <TrendingUp size={14} className="ms-1" aria-hidden="true" />
        </span>
      </div>
      
      <div style={{ height: 200, width: '100%' }} role="img" aria-label="Revenue trend chart">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#D4AF37', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#D4AF37" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorVal)"
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

MarketChart.displayName = 'MarketChart';

export default MarketChart;