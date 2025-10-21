import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedEvent, setSelectedEvent] = useState('ALL');
  const [reportType, setReportType] = useState('OVERVIEW');

  const [overviewStats, setOverviewStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    averageAttendance: 0,
    topEvent: null
  });

  const [eventStats, setEventStats] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Mock data - sẽ thay thế bằng API calls thực tế
  useEffect(() => {
    setTimeout(() => {
      setOverviewStats({
        totalEvents: 45,
        totalBookings: 3200,
        totalUsers: 1250,
        totalRevenue: 125000000,
        averageAttendance: 85.5,
        topEvent: 'Seminar AI & Machine Learning'
      });

      setEventStats([
        {
          id: 1,
          eventName: 'Seminar AI & Machine Learning',
          totalBookings: 850,
          attendance: 780,
          revenue: 25000000,
          status: 'FINISHED'
        },
        {
          id: 2,
          eventName: 'Workshop React Development',
          totalBookings: 500,
          attendance: 480,
          revenue: 15000000,
          status: 'FINISHED'
        },
        {
          id: 3,
          eventName: 'Conference Blockchain Technology',
          totalBookings: 1200,
          attendance: 1100,
          revenue: 40000000,
          status: 'FINISHED'
        },
        {
          id: 4,
          eventName: 'Tech Talk: Cloud Computing',
          totalBookings: 800,
          attendance: 720,
          revenue: 20000000,
          status: 'FINISHED'
        }
      ]);

      setUserStats([
        {
          month: '2024-01',
          newUsers: 150,
          activeUsers: 1200,
          totalBookings: 850
        },
        {
          month: '2023-12',
          newUsers: 120,
          activeUsers: 1100,
          totalBookings: 720
        },
        {
          month: '2023-11',
          newUsers: 180,
          activeUsers: 1050,
          totalBookings: 680
        },
        {
          month: '2023-10',
          newUsers: 200,
          activeUsers: 980,
          totalBookings: 650
        }
      ]);

      setBookingTrends([
        { date: '2024-01-01', bookings: 45 },
        { date: '2024-01-02', bookings: 52 },
        { date: '2024-01-03', bookings: 38 },
        { date: '2024-01-04', bookings: 67 },
        { date: '2024-01-05', bookings: 73 },
        { date: '2024-01-06', bookings: 89 },
        { date: '2024-01-07', bookings: 95 }
      ]);

      setAttendanceData([
        { eventName: 'Seminar AI', attendance: 91.8 },
        { eventName: 'React Workshop', attendance: 96.0 },
        { eventName: 'Blockchain Conf', attendance: 91.7 },
        { eventName: 'Cloud Tech Talk', attendance: 90.0 }
      ]);

      setLoading(false);
    }, 1000);
  }, [dateRange, selectedEvent]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const calculateAttendanceRate = (attendance, totalBookings) => {
    return totalBookings > 0 ? ((attendance / totalBookings) * 100).toFixed(1) : 0;
  };

  const generateReport = () => {
    // Logic để generate report dựa trên filters
    console.log('Generating report with:', { dateRange, selectedEvent, reportType });
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
    <div className="reports">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Báo cáo thống kê</h2>
          <p className="text-muted">Phân tích và báo cáo hoạt động hệ thống</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={generateReport}>
            <i className="bi bi-download me-2"></i>
            Xuất báo cáo
          </button>
          {/* <button className="btn btn-primary">
            <i className="bi bi-printer me-2"></i>
            In báo cáo
          </button> */}
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Loại báo cáo</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="OVERVIEW">Tổng quan</option>
                <option value="EVENTS">Sự kiện</option>
                <option value="USERS">Người dùng</option>
                <option value="BOOKINGS">Đặt chỗ</option>
                <option value="REVENUE">Doanh thu</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Từ ngày</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Đến ngày</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Sự kiện</label>
              <select
                className="form-select"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="ALL">Tất cả sự kiện</option>
                <option value="1">Seminar AI & Machine Learning</option>
                <option value="2">Workshop React Development</option>
                <option value="3">Conference Blockchain Technology</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      {reportType === 'OVERVIEW' && (
        <>
          <div className="row mb-4">
            <div className="col-md-2">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h3>{overviewStats.totalEvents}</h3>
                  <p className="mb-0">Sự kiện</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h3>{overviewStats.totalBookings.toLocaleString()}</h3>
                  <p className="mb-0">Đặt chỗ</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h3>{overviewStats.totalUsers.toLocaleString()}</h3>
                  <p className="mb-0">Người dùng</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h3>{formatCurrency(overviewStats.totalRevenue)}</h3>
                  <p className="mb-0">Doanh thu</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-secondary text-white">
                <div className="card-body text-center">
                  <h3>{overviewStats.averageAttendance}%</h3>
                  <p className="mb-0">Tỷ lệ tham gia</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-dark text-white">
                <div className="card-body text-center">
                  <h6 className="mb-0">Sự kiện hot</h6>
                  <small>{overviewStats.topEvent}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Xu hướng đặt chỗ</h5>
                </div>
                <div className="card-body">
                  <div className="text-center py-4">
                    <i className="bi bi-graph-up text-primary" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-2">Biểu đồ xu hướng đặt chỗ theo thời gian</p>
                    <small className="text-muted">(Sẽ tích hợp Chart.js hoặc D3.js)</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Tỷ lệ tham gia sự kiện</h5>
                </div>
                <div className="card-body">
                  <div className="text-center py-4">
                    <i className="bi bi-pie-chart text-success" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-2">Biểu đồ tỷ lệ tham gia theo sự kiện</p>
                    <small className="text-muted">(Sẽ tích hợp Chart.js hoặc D3.js)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Event Reports */}
      {reportType === 'EVENTS' && (
        <div className="card">
          <div className="card-header">
            <h5>Báo cáo sự kiện</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Tên sự kiện</th>
                    <th>Tổng đặt chỗ</th>
                    <th>Tham gia thực tế</th>
                    <th>Tỷ lệ tham gia</th>
                    <th>Doanh thu</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {eventStats.map(event => (
                    <tr key={event.id}>
                      <td className="fw-bold">{event.eventName}</td>
                      <td>{event.totalBookings.toLocaleString()}</td>
                      <td>{event.attendance.toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress me-2" style={{ width: '100px', height: '20px' }}>
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ width: `${calculateAttendanceRate(event.attendance, event.totalBookings)}%` }}
                            >
                              {calculateAttendanceRate(event.attendance, event.totalBookings)}%
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(event.revenue)}</td>
                      <td>
                        <span className="badge bg-success">Hoàn thành</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Reports */}
      {reportType === 'USERS' && (
        <div className="card">
          <div className="card-header">
            <h5>Báo cáo người dùng</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Tháng</th>
                    <th>Người dùng mới</th>
                    <th>Người dùng hoạt động</th>
                    <th>Tổng đặt chỗ</th>
                    <th>Tỷ lệ tăng trưởng</th>
                  </tr>
                </thead>
                <tbody>
                  {userStats.map((stat, index) => (
                    <tr key={stat.month}>
                      <td className="fw-bold">{stat.month}</td>
                      <td>{stat.newUsers.toLocaleString()}</td>
                      <td>{stat.activeUsers.toLocaleString()}</td>
                      <td>{stat.totalBookings.toLocaleString()}</td>
                      <td>
                        {index > 0 && (
                          <span className={`badge ${stat.newUsers > userStats[index - 1].newUsers ? 'bg-success' : 'bg-danger'}`}>
                            {stat.newUsers > userStats[index - 1].newUsers ? '+' : ''}
                            {((stat.newUsers - userStats[index - 1].newUsers) / userStats[index - 1].newUsers * 100).toFixed(1)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Booking Reports */}
      {reportType === 'BOOKINGS' && (
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Xu hướng đặt chỗ 7 ngày gần đây</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Số đặt chỗ</th>
                        <th>Biểu đồ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingTrends.map(trend => (
                        <tr key={trend.date}>
                          <td>{formatDate(trend.date)}</td>
                          <td>{trend.bookings}</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${(trend.bookings / 100) * 100}%` }}
                              >
                                {trend.bookings}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Tỷ lệ tham gia theo sự kiện</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Sự kiện</th>
                        <th>Tỷ lệ tham gia</th>
                        <th>Biểu đồ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.eventName}</td>
                          <td>{data.attendance}%</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${data.attendance}%` }}
                              >
                                {data.attendance}%
                              </div>
                            </div>
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
      )}

      {/* Revenue Reports */}
      {reportType === 'REVENUE' && (
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Doanh thu theo sự kiện</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Sự kiện</th>
                        <th>Doanh thu</th>
                        <th>Tỷ lệ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventStats.map(event => (
                        <tr key={event.id}>
                          <td>{event.eventName}</td>
                          <td className="fw-bold">{formatCurrency(event.revenue)}</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${(event.revenue / 40000000) * 100}%` }}
                              >
                                {((event.revenue / 40000000) * 100).toFixed(1)}%
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Tổng kết doanh thu</h5>
              </div>
              <div className="card-body text-center">
                <h2 className="text-primary">{formatCurrency(overviewStats.totalRevenue)}</h2>
                <p className="text-muted">Tổng doanh thu trong khoảng thời gian đã chọn</p>
                <div className="row mt-4">
                  <div className="col-6">
                    <div className="border-end">
                      <h4 className="text-success">{formatCurrency(25000000)}</h4>
                      <small className="text-muted">Cao nhất</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <h4 className="text-info">{formatCurrency(15000000)}</h4>
                    <small className="text-muted">Trung bình</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;