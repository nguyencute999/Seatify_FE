import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminEvents } from '../../redux/event/eventSlice';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import './css/ManageSeatLayouts.css';

const ManageSeatLayouts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminEvents, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchAdminEvents());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'UPCOMING': 'info',
      'ONGOING': 'warning',
      'FINISHED': 'success',
      'CANCELLED': 'danger'
    };
    return badges[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      'UPCOMING': 'Sắp diễn ra',
      'ONGOING': 'Đang diễn ra',
      'FINISHED': 'Đã kết thúc',
      'CANCELLED': 'Đã hủy'
    };
    return texts[status] || status;
  };

  const handleViewSeatLayout = (eventId) => {
    navigate(`/admin/events/${eventId}/seats`);
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

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Lỗi!</h4>
        <p>{error}</p>
        <hr />
        <Button variant="primary" onClick={() => dispatch(fetchAdminEvents())}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <div className="manage-seat-layouts">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Quản lý sơ đồ ghế
          </h2>
          <p className="text-muted mb-0">Xem và quản lý sơ đồ ghế của các sự kiện</p>
        </div>
      </div>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="bi bi-calendar-event me-2"></i>
            Danh sách sự kiện
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="alert alert-info mb-4">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Lưu ý:</strong> Sơ đồ ghế được tự động tạo khi admin tạo sự kiện mới. Bạn có thể xem và theo dõi trạng thái đặt ghế tại đây.
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tên sự kiện</th>
                  <th>Thời gian</th>
                  <th>Sức chứa</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {adminEvents.data?.map(event => (
                  <tr key={event.eventId}>
                    <td>
                      <div>
                        <strong>{event.eventName}</strong>
                        {event.description && (
                          <div className="text-muted small mt-1">
                            {event.description.substring(0, 100)}...
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="small">
                        <div><strong>Bắt đầu:</strong> {formatDate(event.startTime)}</div>
                        <div><strong>Kết thúc:</strong> {formatDate(event.endTime)}</div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="info">{event.capacity} chỗ</Badge>
                    </td>
                    <td>
                      <Badge variant={getStatusBadge(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleViewSeatLayout(event.eventId)}
                      >
                        <i className="bi bi-grid-3x3-gap me-1"></i>
                        Xem sơ đồ ghế
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {adminEvents.data?.length === 0 && (
            <div className="text-center py-4">
              <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
              <h5 className="mt-3">Không có sự kiện</h5>
              <p className="text-muted">Tạo sự kiện mới để tự động tạo sơ đồ ghế.</p>
              <Button 
                variant="primary"
                onClick={() => navigate('/admin/events')}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Tạo sự kiện mới
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSeatLayouts;
