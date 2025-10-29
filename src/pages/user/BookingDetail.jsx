import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingById, cancelBooking, clearError, clearMessage } from '../../redux/booking/bookingSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const BookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBooking, loading, error, message } = useSelector(state => state.booking);

  useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    }
  }, [dispatch, bookingId]);

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

  const handleCancelBooking = () => {
    if (confirm('Bạn có chắc muốn hủy đặt chỗ này?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'CONFIRMED': 'success',
      'CANCELLED': 'danger',
      'PENDING': 'warning',
      'COMPLETED': 'primary'
    };
    return (
      <Badge variant={variants[status] || 'secondary'} size="lg">
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

  if (error || !currentBooking) {
    return (
      <div className="alert alert-danger">
        <h4>Không tìm thấy đặt chỗ</h4>
        <p>Đặt chỗ không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => navigate('/bookings')}>
          Quay lại danh sách đặt chỗ
        </Button>
      </div>
    );
  }

  return (
    <div className="booking-detail-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Chi tiết đặt chỗ #{currentBooking.bookingId}</h2>
        <Button 
          variant="outline-secondary"
          onClick={() => navigate('/bookings')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Quay lại
        </Button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="d-flex justify-content-between align-items-center">
                <span>Thông tin đặt chỗ</span>
                {getStatusBadge(currentBooking.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="row">
                <div className="col-md-6">
                  <h6>Thông tin sự kiện</h6>
                  <p><strong>Tên sự kiện:</strong> {currentBooking.eventName}</p>
                  <p><strong>Địa điểm:</strong> {currentBooking.location}</p>
                  {currentBooking.eventDate && (
                    <p><strong>Ngày sự kiện:</strong> {formatDate(currentBooking.eventDate)}</p>
                  )}
                </div>
                <div className="col-md-6">
                  <h6>Thông tin ghế</h6>
                  <p><strong>Ghế đã đặt:</strong> {currentBooking.seatNumbers?.join(', ') || 'N/A'}</p>
                  <p><strong>Số lượng ghế:</strong> {currentBooking.seatCount}</p>
                  <p><strong>Tổng tiền:</strong> 
                    {currentBooking.totalPrice > 0 
                      ? `${currentBooking.totalPrice.toLocaleString('vi-VN')}đ` 
                      : 'Miễn phí'
                    }
                  </p>
                </div>
              </div>
              
              {currentBooking.notes && (
                <div className="mt-3">
                  <h6>Ghi chú</h6>
                  <p>{currentBooking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Ngày đặt chỗ:</strong> {formatDate(currentBooking.createdAt)}</p>
                </div>
                {currentBooking.updatedAt && (
                  <div className="col-md-6">
                    <p><strong>Cập nhật lần cuối:</strong> {formatDate(currentBooking.updatedAt)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-lg-4">
          <Card className="sticky-top">
            <CardHeader>
              <CardTitle>Thao tác</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-primary"
                  onClick={() => window.location.href = `/events/${currentBooking.eventId}`}
                >
                  <i className="bi bi-calendar-event me-2"></i>
                  Xem sự kiện
                </Button>
                
                {currentBooking.status === 'CONFIRMED' && (
                  <Button 
                    variant="outline-danger"
                    onClick={handleCancelBooking}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Hủy đặt chỗ
                  </Button>
                )}
                
                <Button 
                  variant="outline-secondary"
                  onClick={() => window.print()}
                >
                  <i className="bi bi-printer me-2"></i>
                  In vé
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-3">
            <CardHeader>
              <CardTitle>Trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="status-info">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Trạng thái:</span>
                  {getStatusBadge(currentBooking.status)}
                </div>
                
                <div className="status-description">
                  {currentBooking.status === 'CONFIRMED' && (
                    <p className="text-success mb-0">
                      <i className="bi bi-check-circle me-1"></i>
                      Đặt chỗ đã được xác nhận
                    </p>
                  )}
                  {currentBooking.status === 'CANCELLED' && (
                    <p className="text-danger mb-0">
                      <i className="bi bi-x-circle me-1"></i>
                      Đặt chỗ đã bị hủy
                    </p>
                  )}
                  {currentBooking.status === 'PENDING' && (
                    <p className="text-warning mb-0">
                      <i className="bi bi-clock me-1"></i>
                      Đang chờ xác nhận
                    </p>
                  )}
                  {currentBooking.status === 'COMPLETED' && (
                    <p className="text-primary mb-0">
                      <i className="bi bi-check-all me-1"></i>
                      Sự kiện đã hoàn thành
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
