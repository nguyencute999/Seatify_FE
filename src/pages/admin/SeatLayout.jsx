import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminEventById } from '../../redux/event/eventSlice';
import { 
  fetchSeatsByEventId, 
  clearError
} from '../../redux/seat/seatSlice';
import SeatLayoutDisplay from '../../components/SeatLayoutDisplay';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const SeatLayout = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminEvents } = useSelector(state => state.events);
  const { 
    seats, 
    loading, 
    error
  } = useSelector(state => state.seats);
  
  const [event, setEvent] = useState(null);

  // Load event details
  useEffect(() => {
    if (eventId) {
      dispatch(fetchAdminEventById(eventId));
    }
  }, [dispatch, eventId]);

  // Set event from Redux state
  useEffect(() => {
    if (adminEvents.data.length > 0) {
      const foundEvent = adminEvents.data.find(e => e.eventId === parseInt(eventId));
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
  }, [adminEvents.data, eventId]);

  // Load seats for this event
  useEffect(() => {
    if (eventId) {
      dispatch(fetchSeatsByEventId(eventId));
    }
  }, [dispatch, eventId]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Show error message if there's an error
  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Lỗi</h4>
        <p>{error}</p>
        <Button onClick={() => dispatch(clearError())}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="alert alert-danger">
        <h4>Không tìm thấy sự kiện</h4>
        <p>Sự kiện không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => navigate('/admin/events')}>
          Quay lại danh sách sự kiện
        </Button>
      </div>
    );
  }

  return (
    <div className="seat-layout-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Sơ đồ ghế sự kiện</h2>
          <p className="text-muted mb-0">
            <strong>Sự kiện:</strong> {event.eventName}
          </p>
          <p className="text-muted">
            <strong>Địa điểm:</strong> {event.location}
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-secondary"
            onClick={() => navigate('/admin/events')}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Quay lại
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <Card>
            <CardContent className="text-center">
              <h3 className="text-primary">{seats.length}</h3>
              <p className="text-muted mb-0">Tổng ghế</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <CardContent className="text-center">
              <h3 className="text-success">
                {seats.filter(s => s.isAvailable).length}
              </h3>
              <p className="text-muted mb-0">Ghế trống</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <CardContent className="text-center">
              <h3 className="text-danger">
                {seats.filter(s => !s.isAvailable).length}
              </h3>
              <p className="text-muted mb-0">Đã đặt</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <CardContent className="text-center">
              <h3 className="text-info">
                {Math.round((seats.filter(s => !s.isAvailable).length / seats.length) * 100) || 0}%
              </h3>
              <p className="text-muted mb-0">Tỷ lệ đặt</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seat Layout Display */}
      <Card>
        <CardContent>
          <SeatLayoutDisplay 
            seats={seats}
            loading={loading}
            error={error}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatLayout;
