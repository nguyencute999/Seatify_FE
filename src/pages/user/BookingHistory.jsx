import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingHistory, clearError, clearMessage } from '../../redux/booking/bookingSlice';
import '../css/BookingHistory.css';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, message } = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(getUserBookingHistory());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alert(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const getStatusBadge = (status) => {
    const key = (status || '').toLowerCase();
    return (
      <Badge variant="custom" className={`status-badge status-${key}`}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-history-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lịch sử đặt sự kiện</h2>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="cards-grid">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="grid-item">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex justify-content-between align-items-center">
                    <span>Đặt chỗ #{booking.bookingId}</span>
                    {getStatusBadge(booking.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="booking-details">
                    <p><strong>Sự kiện:</strong> {booking.eventName}</p>
                    <p><strong>Ghế:</strong> {booking.seatLabel || `${booking.seatRow}${booking.seatNumber}`}</p>
                    <p><strong>Thời gian đặt:</strong> {booking.bookingTime ? formatDate(booking.bookingTime) : '—'}</p>
                    {booking.checkInTime && (
                      <p><strong>Check-in:</strong> {formatDate(booking.checkInTime)}</p>
                    )}
                    {booking.checkOutTime && (
                      <p><strong>Check-out:</strong> {formatDate(booking.checkOutTime)}</p>
                    )}
                    {booking.qrCode && (
                      <div className="qr-wrapper">
                        <img src={booking.qrCode} alt={`QR ${booking.seatLabel || booking.seatId}`} />
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-5 empty-state">
            <i className="bi bi-calendar-x"></i>
            <h4>Chưa có đặt chỗ nào</h4>
            <p>Hãy khám phá các sự kiện đang diễn ra và đặt chỗ ngay!</p>
            <Button 
              variant="custom"
              className="cta-gradient"
              onClick={() => window.location.href = '/events'}
            >
              Xem sự kiện
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingHistory;
