import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Button } from './ui/Button';
import './css/EventComponents.css';

const EventCarousel = ({ events, onBookNow, onViewDetails, title = "Sự kiện nổi bật" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 992) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, events.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const handleCardHover = (index) => {
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  const handleCardClick = (index) => {
    setHoveredIndex(index);
    // Reset after a short delay
    setTimeout(() => {
      setHoveredIndex(null);
    }, 2000);
  };

  if (!events || events.length === 0) {
    return (
      <div className="container-fluid px-4 py-5">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">{title}</h2>
            <div className="text-center text-muted">
              <i className="bi bi-calendar-event fs-1 mb-3 d-block"></i>
              <p>Chưa có sự kiện nào</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center mb-4">
            <h2 className="mb-0">{title}</h2>
          </div>

          <div className="position-relative overflow-hidden carousel-single-row">
            {/* Left Navigation Button */}
            {events.length > itemsPerView && currentIndex > 0 && (
              <button
                className="carousel-nav-btn carousel-nav-left"
                onClick={prevSlide}
                aria-label="Previous"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            )}

            {/* Right Navigation Button */}
            {events.length > itemsPerView && currentIndex < maxIndex && (
              <button
                className="carousel-nav-btn carousel-nav-right"
                onClick={nextSlide}
                aria-label="Next"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            )}

            <div 
              className="d-flex carousel-container"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: 'transform 0.5s ease-in-out',
                width: `${(events.length / itemsPerView) * 100}%`,
                gap: '1.5rem'
              }}
            >
              {events.map((event, index) => (
                <div 
                  key={event.event_id} 
                  className={`flex-shrink-0 carousel-item-wrapper ${
                    hoveredIndex === index ? 'carousel-item-hovered' : ''
                  } ${
                    hoveredIndex !== null && hoveredIndex !== index ? 'carousel-item-dimmed' : ''
                  }`}
                  style={{ 
                    width: `${100 / events.length}%`,
                    minWidth: '300px'
                  }}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                  onClick={() => handleCardClick(index)}
                >
                  <EventCard 
                    event={event}
                    onBookNow={onBookNow}
                    onViewDetails={onViewDetails}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCarousel;