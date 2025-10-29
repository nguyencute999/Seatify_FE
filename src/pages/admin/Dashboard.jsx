import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    cancelledEvents: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalEvents: 45,
        totalBookings: 3200,
        totalRevenue: 125000000, // VND
        activeEvents: 8,
        upcomingEvents: 12,
        completedEvents: 20,
        cancelledEvents: 5
      });

      setRecentBookings([
        {
          id: 1,
          user: 'Nguyễn Văn A',
          event: 'Seminar AI & Machine Learning',
          bookingTime: '2024-01-15 10:30:00',
          status: 'BOOKED'
        },
        {
          id: 2,
          user: 'Trần Thị B',
          event: 'Workshop React Development',
          bookingTime: '2024-01-15 09:15:00',
          status: 'CHECKED_IN'
        },
        {
          id: 3,
          user: 'Lê Văn C',
          event: 'Conference Blockchain',
          bookingTime: '2024-01-14 16:45:00',
          status: 'BOOKED'
        }
      ]);

      setRecentEvents([
        {
          id: 1,
          name: 'Seminar AI & Machine Learning',
          startTime: '2024-01-20 09:00:00',
          capacity: 100,
          booked: 85,
          status: 'UPCOMING'
        },
        {
          id: 2,
          name: 'Workshop React Development',
          startTime: '2024-01-18 14:00:00',
          capacity: 50,
          booked: 50,
          status: 'ONGOING'
        },
        {
          id: 3,
          name: 'Conference Blockchain',
          startTime: '2024-01-16 08:00:00',
          capacity: 200,
          booked: 180,
          status: 'UPCOMING'
        }
      ]);


      setLoading(false);
    }, 1000);
  }, []);

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
                    {stats.totalUsers.toLocaleString()}
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
                    {stats.totalEvents}
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
                    {stats.totalBookings.toLocaleString()}
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
                    {formatCurrency(stats.totalRevenue)}
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
                    {stats.upcomingEvents}
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
                    {stats.activeEvents}
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
                    {stats.completedEvents}
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
                    {stats.cancelledEvents}
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
              <a href="/admin/bookings" className="btn btn-sm btn-primary">
                Xem tất cả
              </a>
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
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.user}</td>
                        <td className="text-truncate" style={{ maxWidth: '150px' }} title={booking.event}>
                          {booking.event}
                        </td>
                        <td>{formatDate(booking.bookingTime)}</td>
                        <td>
                          <span className={getStatusBadge(booking.status)}>
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
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
              <a href="/admin/events" className="btn btn-sm btn-primary">
                Xem tất cả
              </a>
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
                    {recentEvents.map(event => (
                      <tr key={event.id}>
                        <td className="text-truncate" style={{ maxWidth: '150px' }} title={event.name}>
                          {event.name}
                        </td>
                        <td>{formatDate(event.startTime)}</td>
                        <td>
                          <div className="progress" style={{ height: '20px' }}>
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ width: `${(event.booked / event.capacity) * 100}%` }}
                            >
                              {event.booked}/{event.capacity}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={getStatusBadge(event.status)}>
                            {getStatusText(event.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
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