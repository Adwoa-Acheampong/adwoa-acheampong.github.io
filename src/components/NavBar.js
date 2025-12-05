import React, { useState, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { NAVIGATION_LINKS } from '../constants/content';
import { smoothScrollTo } from '../utils/helpers';

const NavBar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(50);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    smoothScrollTo(elementId);
    setIsOpen(false);
  }, []);

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top navbar-glass ${scrolled ? 'navbar-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <a 
          className="navbar-brand d-flex align-items-center gap-2" 
          href="#"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Acheampong - Home"
        >
          <div className="bg-dark text-white rounded px-2 py-1 font-mono fw-bold">A.</div>
          <span className="fw-bold tracking-tight text-dark">ACHEAMPONG</span>
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          aria-controls="nav"
        >
          {isOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
        
        <div 
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} 
          id="nav"
        >
          <ul className="navbar-nav ms-auto align-items-center gap-lg-4 pt-3 pt-lg-0">
            {NAVIGATION_LINKS.map(link => (
              <li key={link.id} className="nav-item">
                <a 
                  className="nav-link text-dark fw-medium" 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item mt-3 mt-lg-0">
              <a 
                href="#contact" 
                className="btn btn-dark rounded-pill px-4 btn-sm text-white"
                onClick={(e) => handleNavClick(e, '#contact')}
                aria-label="Contact - Let's talk"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;