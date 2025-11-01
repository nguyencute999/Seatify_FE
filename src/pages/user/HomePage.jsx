import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import EventCarousel from '../../components/EventCarousel';
import { fetchEvents, fetchFeaturedEvents } from '../../redux/event/eventSlice';
import '../css/HomePage.css';

const Home = ({ onViewChange = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userEmail } = useSelector(state => state.auth);
  const { 
    featuredEvents, 
    upcomingEvents, 
    ongoingEvents, 
    finishedEvents, 
    loading 
  } = useSelector(state => state.events);

  useEffect(() => {
    // Fetch featured events from API
    dispatch(fetchFeaturedEvents());
    // Fetch all events for other categories
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleBookNow = (event) => {
    const id = event?.eventId || event?.event_id || event?.id;
    if (!id) {
      navigate('/events');
      return;
    }
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/events/${id}/seats`);
  };

  const handleViewDetails = (event) => {
    const id = event?.eventId || event?.event_id || event?.id;
    navigate(id ? `/events/${id}` : '/events');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <>
      {/* Hero Section */}
      <div className="position-relative container-fluid px-4 py-5 py-md-5 orange-theme">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
                          <div className="hero-section">
              <Badge 
                variant="custom" 
                className="mb-3 px-3 py-2 text-white border-0 hero-badge"
              >
                Giải pháp Check-in Thông minh
              </Badge>
              
              <h1 className="display-4 fw-bold mb-4 hero-title">
                Điểm danh nhanh chóng, Quản lý hiệu quả
              </h1>
              
              <p className="lead mb-4 hero-description">
                SEATIFY - Hệ thống đặt chỗ và check-in tự động cho các sự kiện. 
                Điểm danh {'< 5'} giây, chính xác 99.8%, quản lý chỗ ngồi thông minh.
              </p>
              
              <div className="d-flex flex-wrap gap-3">
                {token ? (
                  <Button 
                    variant="light"
                    className="btn-lg px-4 py-3 hero-btn-primary"
                    onClick={() => navigate('/events')}
                  >
                    Xem sự kiện <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="light"
                      className="btn-lg px-4 py-3 hero-btn-primary"
                      onClick={handleLogin}
                    >
                      Đăng ký ngay <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                    <Button 
                      variant="outline-light"
                      className="btn-lg px-4 py-3 hero-btn-secondary"
                      onClick={handleAbout}
                    >
                      Tìm hiểu thêm
                    </Button>
                  </>
                )}
              </div>
            </div>
                    </div>
        </div>
      </div>

      {/* Events Carousels */}
      <div className="bg-light">
        {/* Featured Events */}
        <EventCarousel
          events={featuredEvents}
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
          title="Sự kiện nổi bật"
        />

        {/* Ongoing Events */}
        <EventCarousel
          events={ongoingEvents}
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
          title="Đang diễn ra"
        />

        {/* Upcoming Events */}
        <EventCarousel
          events={upcomingEvents}
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
          title="Sắp diễn ra"
        />

        {/* Finished Events */}
        <EventCarousel
          events={finishedEvents}
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
          title="Đã kết thúc"
        />
      </div>
    </>
  );
};

export default Home;