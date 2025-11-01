import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchDashboardStats,
  fetchRecentBookings,
  fetchRecentEvents,
} from '../../redux/admin/adminDashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    stats,
    recentBookings,
    recentEvents,
    statsLoading,
    bookingsLoading,
    eventsLoading,
    error,
  } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    // Fetch all dashboard data when component mounts
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentBookings(10));
    dispatch(fetchRecentEvents(10));
  }, [dispatch]);

  const loading = statsLoading || bookingsLoading || eventsLoading;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'BOOKED': 'badge bg-primary',
      'CHECKED_IN': 'badge bg-success',
      'CANCELLED': 'badge bg-danger',
      'UPCOMING': 'badge bg-info',
      'ONGOING': 'badge bg-warning',
      'FINISHED': 'badge bg-secondary'
    };
    return badges[status] || 'badge bg-secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      'BOOKED': 'Đã đặt',
      'CHECKED_IN': 'Đã check-in',
      'CANCELLED': 'Đã hủy',
      'UPCOMING': 'Sắp diễn ra',
      'ONGOING': 'Đang diễn ra',
      'FINISHED': 'Đã kết thúc'
    };
    return texts[status] || status;
  };

  if (loading && !stats && recentBookings.length === 0 && recentEvents.length === 0) {
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
      <div className="alert alert-danger">
        <strong>Lỗi:</strong> {error}
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Tổng người dùng
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats?.totalUsers?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-people text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Tổng sự kiện
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats?.totalEvents || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-calendar-event text-success" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Tổng đặt chỗ
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {stats?.totalBookings?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-ticket-perforated text-info" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Doanh thu
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {formatCurrency(stats?.totalRevenue || 0)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-currency-dollar text-warning" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Status Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1">
                    Sự kiện sắp diễn ra
                  </div>
                  <div className="h5 mb-0 font-weight-bold">
                    {stats?.upcomingEvents || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-calendar-plus" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card bg-warning text-white shadow">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1">
                    Đang diễn ra
                  </div>
                  <div className="h5 mb-0 font-weight-bold">
                    {stats?.activeEvents || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-play-circle" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1">
                    Đã hoàn thành
                  </div>
                  <div className="h5 mb-0 font-weight-bold">
                    {stats?.completedEvents || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-check-circle" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-uppercase mb-1">
                    Đã hủy
                  </div>
                  <div className="h5 mb-0 font-weight-bold">
                    {stats?.cancelledEvents || 0}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-x-circle" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Recent Activity */}
      <div className="row">
        {/* Recent Bookings */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Đặt chỗ gần đây</h6>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => navigate('/admin/bookings')}
              >
                Xem tất cả
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Người dùng</th>
                      <th>Sự kiện</th>
                      <th>Thời gian</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          {bookingsLoading ? 'Đang tải...' : 'Chưa có đặt chỗ nào'}
                        </td>
                      </tr>
                    ) : (
                      recentBookings.map((booking) => (
                        <tr key={booking.bookingId || booking.id}>
                          <td>{booking.userName || booking.user?.fullName || booking.user}</td>
                          <td className="text-truncate" style={{ maxWidth: '150px' }} title={booking.eventName || booking.event?.eventName || booking.event}>
                            {booking.eventName || booking.event?.eventName || booking.event}
                          </td>
                          <td>{formatDate(booking.bookingTime || booking.createdAt)}</td>
                          <td>
                            <span className={getStatusBadge(booking.status)}>
                              {getStatusText(booking.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Sự kiện gần đây</h6>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => navigate('/admin/events')}
              >
                Xem tất cả
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Tên sự kiện</th>
                      <th>Thời gian</th>
                      <th>Đặt chỗ</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          {eventsLoading ? 'Đang tải...' : 'Chưa có sự kiện nào'}
                        </td>
                      </tr>
                    ) : (
                      recentEvents.map((event) => (
                        <tr key={event.eventId || event.id}>
                          <td className="text-truncate" style={{ maxWidth: '150px' }} title={event.eventName || event.name}>
                            {event.eventName || event.name}
                          </td>
                          <td>{formatDate(event.startTime)}</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${event.capacity > 0 ? ((event.bookedCount || event.booked || 0) / event.capacity) * 100 : 0}%` }}
                              >
                                {event.bookedCount || event.booked || 0}/{event.capacity || 0}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={getStatusBadge(event.status)}>
                              {getStatusText(event.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .border-left-primary {
          border-left: 0.25rem solid #4e73df !important;
        }
        .border-left-success {
          border-left: 0.25rem solid #1cc88a !important;
        }
        .border-left-info {
          border-left: 0.25rem solid #36b9cc !important;
        }
        .border-left-warning {
          border-left: 0.25rem solid #f6c23e !important;
        }
        .text-xs {
          font-size: 0.7rem;
        }
        .text-gray-800 {
          color: #5a5c69 !important;
        }
        .shadow {
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;