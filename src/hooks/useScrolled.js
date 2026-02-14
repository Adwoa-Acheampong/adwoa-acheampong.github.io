import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if page has been scrolled past a threshold
 * @param {number} threshold - Scroll threshold in pixels (default: 50)
 * @returns {boolean} - True if scrolled past threshold
 */
export const useScrolled = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initial check
    handleScroll();

    // Add throttled scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [threshold, scrolled]);

  return scrolled;
};