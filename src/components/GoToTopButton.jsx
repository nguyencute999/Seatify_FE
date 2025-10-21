import React, { useState, useEffect } from 'react';
import './css/GoToTopButton.css';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="go-to-top-btn"
          onClick={scrollToTop}
          aria-label="Go to top"
          title="Go to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
