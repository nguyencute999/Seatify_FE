import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { fetchEventById } from '../../redux/event/eventSlice';
import '../css/EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent, loading, error } = useSelector(state => state.events);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventById(eventId));
    }
  }, [dispatch, eventId]);

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'UPCOMING': { variant: 'success', text: 'Sắp diễn ra', icon: 'bi-calendar-event' },
      'ONGOING': { variant: 'warning', text: 'Đang diễn ra', icon: 'bi-play-circle' },
      'FINISHED': { variant: 'secondary', text: 'Đã kết thúc', icon: 'bi-check-circle' },
      'CANCELLED': { variant: 'danger', text: 'Đã hủy', icon: 'bi-x-circle' }
    };
    
    const config = statusConfig[status] || { variant: 'secondary', text: status, icon: 'bi-info-circle' };
    return (
      <Badge variant={config.variant} className="status-badge-large">
        <i className={`bi ${config.icon} me-2`}></i>
        {config.text}
      </Badge>
    );
  };

  const handleBookNow = () => {
    if (currentEvent?.status === 'UPCOMING') {
      setShowBookingModal(true);
    }
  };

  const handleBackToList = () => {
    navigate('/events');
  };

  if (loading) {
    return (
      <div className="event-detail-loading">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Đang tải thông tin sự kiện...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className="event-detail-error">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="error-content">
                <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                <h2 className="mt-3">Không tìm thấy sự kiện</h2>
                <p className="text-muted mb-4">{error || 'Sự kiện không tồn tại hoặc đã bị xóa.'}</p>
                <Button variant="primary" onClick={handleBackToList}>
                  <i className="bi bi-arrow-left me-2"></i>
                  Quay lại danh sách
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-detail-page">
      {/* Hero Section */}
      <div className="event-hero">
        <div className="hero-background">
          {currentEvent.thumbnail && (
            <img 
              src={currentEvent.thumbnail} 
              alt={currentEvent.event_name}
              className="hero-image"
            />
          )}
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-content">
                <Button 
                  variant="outline-light" 
                  className="back-button"
                  onClick={handleBackToList}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Quay lại
                </Button>
                
                <div className="event-info">
                  <div className="event-status">
                    {getStatusBadge(currentEvent.status)}
                  </div>
                  
                  <h1 className="event-title">{currentEvent.event_name}</h1>
                  
                  <div className="event-meta">
                    <div className="meta-item">
                      <i className="bi bi-calendar-event"></i>
                      <span>{formatDate(currentEvent.start_time)}</span>
                    </div>
                    <div className="meta-item">
                      <i className="bi bi-clock"></i>
                      <span>{formatTime(currentEvent.start_time)} - {formatTime(currentEvent.end_time)}</span>
                    </div>
                    {currentEvent.location && (
                      <div className="meta-item">
                        <i className="bi bi-geo-alt"></i>
                        <span>{currentEvent.location}</span>
                      </div>
                    )}
                    <div className="meta-item">
                      <i className="bi bi-people"></i>
                      <span>{currentEvent.capacity.toLocaleString('vi-VN')} chỗ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            {/* Event Description */}
            <Card className="event-section">
              <CardContent>
                <h3 className="section-title">
                  <i className="bi bi-info-circle me-2"></i>
                  Mô tả sự kiện
                </h3>
                <div className="event-description">
                  {currentEvent.description ? (
                    <p>{currentEvent.description}</p>
                  ) : (
                    <p className="text-muted">Chưa có mô tả chi tiết cho sự kiện này.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Event Schedule */}
            <Card className="event-section">
              <CardContent>
                <h3 className="section-title">
                  <i className="bi bi-calendar-check me-2"></i>
                  Lịch trình sự kiện
                </h3>
                <div className="schedule-info">
                  <div className="schedule-item">
                    <div className="schedule-time">
                      <i className="bi bi-play-circle text-success"></i>
                      <span>Bắt đầu</span>
                    </div>
                    <div className="schedule-details">
                      <strong>{formatDateTime(currentEvent.start_time)}</strong>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-time">
                      <i className="bi bi-stop-circle text-danger"></i>
                      <span>Kết thúc</span>
                    </div>
                    <div className="schedule-details">
                      <strong>{formatDateTime(currentEvent.end_time)}</strong>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-4">
            {/* Booking Card */}
            <Card className="booking-card sticky-top">
              <CardContent>
                <h3 className="section-title">
                  <i className="bi bi-ticket-perforated me-2"></i>
                  Đặt chỗ
                </h3>
                
                <div className="booking-info">
                  <div className="price-info">
                    <span className="price-label">Giá vé</span>
                    <span className="price-value">Miễn phí</span>
                  </div>
                  
                  <div className="capacity-info">
                    <span className="capacity-label">Sức chứa</span>
                    <span className="capacity-value">{currentEvent.capacity.toLocaleString('vi-VN')} chỗ</span>
                  </div>
                  
                  <div className="status-info">
                    <span className="status-label">Trạng thái</span>
                    <span className="status-value">
                      {getStatusBadge(currentEvent.status)}
                    </span>
                  </div>
                </div>

                <div className="booking-actions">
                  {currentEvent.status === 'UPCOMING' ? (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100 booking-btn"
                      onClick={handleBookNow}
                    >
                      <i className="bi bi-ticket-perforated me-2"></i>
                      Đặt chỗ ngay
                    </Button>
                  ) : currentEvent.status === 'ONGOING' ? (
                    <Button 
                      variant="warning" 
                      size="lg" 
                      className="w-100 booking-btn"
                      disabled
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      Sự kiện đang diễn ra
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="w-100 booking-btn"
                      disabled
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Sự kiện đã kết thúc
                    </Button>
                  )}
                </div>

                <div className="booking-note">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Đặt chỗ miễn phí. Vui lòng đến đúng giờ để check-in.
                  </small>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Đặt chỗ cho "{currentEvent.event_name}"</h4>
              <button 
                className="btn-close" 
                onClick={() => setShowBookingModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Chức năng đặt chỗ sẽ được triển khai trong phiên bản tiếp theo.</p>
              <p>Hiện tại bạn có thể liên hệ trực tiếp để đặt chỗ.</p>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowBookingModal(false)}
              >
                Đóng
              </Button>
              <Button 
                variant="primary"
                onClick={() => {
                  setShowBookingModal(false);
                  // TODO: Implement actual booking logic
                  alert('Chức năng đặt chỗ đang được phát triển!');
                }}
              >
                Xác nhận đặt chỗ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
