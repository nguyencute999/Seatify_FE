import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings, clearError, clearMessage } from '../../redux/booking/bookingSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const BookingHistory = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error, message } = useSelector(state => state.booking);

  useEffect(() => {
    dispatch(getUserBookings());
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
    const variants = {
      'CONFIRMED': 'success',
      'CANCELLED': 'danger',
      'PENDING': 'warning',
      'COMPLETED': 'primary'
    };
    return (
      <Badge variant={variants[status] || 'secondary'}>
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
        <h2>Lịch sử đặt chỗ</h2>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="col-md-6 col-lg-4 mb-4">
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
                    <p><strong>Địa điểm:</strong> {booking.location}</p>
                    <p><strong>Ghế:</strong> {booking.seatNumbers?.join(', ') || 'N/A'}</p>
                    <p><strong>Số lượng:</strong> {booking.seatCount}</p>
                    <p><strong>Tổng tiền:</strong> 
                      {booking.totalPrice > 0 
                        ? `${booking.totalPrice.toLocaleString('vi-VN')}đ` 
                        : 'Miễn phí'
                      }
                    </p>
                    <p><strong>Ngày đặt:</strong> {formatDate(booking.createdAt)}</p>
                    {booking.eventDate && (
                      <p><strong>Ngày sự kiện:</strong> {formatDate(booking.eventDate)}</p>
                    )}
                    {booking.notes && (
                      <p><strong>Ghi chú:</strong> {booking.notes}</p>
                    )}
                  </div>
                  
                  <div className="d-flex gap-2 mt-3">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => window.location.href = `/bookings/${booking.bookingId}`}
                    >
                      Xem chi tiết
                    </Button>
                    {booking.status === 'CONFIRMED' && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => {
                          if (confirm('Bạn có chắc muốn hủy đặt chỗ này?')) {
                            dispatch(cancelBooking(booking.bookingId));
                          }
                        }}
                      >
                        Hủy đặt chỗ
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-5">
            <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
            <h4 className="mt-3">Chưa có đặt chỗ nào</h4>
            <p className="text-muted">Bạn chưa có đặt chỗ nào. Hãy tham gia các sự kiện để đặt chỗ!</p>
            <Button 
              variant="primary"
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
