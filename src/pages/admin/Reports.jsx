import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOverviewStats,
  fetchEventStats,
  fetchUserStats,
  fetchBookingTrends,
  fetchAttendanceData,
  fetchRevenueStats,
  clearError,
} from '../../redux/admin/adminReportSlice';

const Reports = () => {
  const dispatch = useDispatch();
  const {
    overviewStats,
    eventStats,
    userStats,
    bookingTrends,
    attendanceData,
    revenueStats,
    overviewStatsLoading,
    eventStatsLoading,
    userStatsLoading,
    bookingTrendsLoading,
    attendanceDataLoading,
    revenueStatsLoading,
    error,
  } = useSelector((state) => state.adminReport);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedEvent, setSelectedEvent] = useState('ALL');
  const [reportType, setReportType] = useState('OVERVIEW');

  // Convert selectedEvent to number or null
  const eventId = selectedEvent === 'ALL' ? null : Number(selectedEvent);

  // Fetch data based on report type and filters
  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const fetchData = () => {
      switch (reportType) {
        case 'OVERVIEW':
          dispatch(fetchOverviewStats({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventId,
          }));
          // Also fetch booking trends and attendance for overview charts
          dispatch(fetchBookingTrends({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }));
          dispatch(fetchAttendanceData({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventId,
          }));
          break;
        case 'EVENTS':
          dispatch(fetchEventStats({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventId,
          }));
          break;
        case 'USERS':
          dispatch(fetchUserStats({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }));
          break;
        case 'BOOKINGS':
          dispatch(fetchBookingTrends({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }));
          dispatch(fetchAttendanceData({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventId,
          }));
          break;
        case 'REVENUE':
          dispatch(fetchRevenueStats({
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventId,
          }));
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [dateRange, selectedEvent, reportType, dispatch]);

  // Get loading state based on report type
  const getLoadingState = () => {
    switch (reportType) {
      case 'OVERVIEW':
        return overviewStatsLoading || bookingTrendsLoading || attendanceDataLoading;
      case 'EVENTS':
        return eventStatsLoading;
      case 'USERS':
        return userStatsLoading;
      case 'BOOKINGS':
        return bookingTrendsLoading || attendanceDataLoading;
      case 'REVENUE':
        return revenueStatsLoading;
      default:
        return false;
    }
  };

  const loading = getLoadingState();

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const calculateAttendanceRate = (attendance, totalBookings) => {
    if (!totalBookings || totalBookings === 0) return 0;
    return ((attendance / totalBookings) * 100).toFixed(1);
  };

  const generateReport = () => {
    // Logic để generate report dựa trên filters
    console.log('Generating report with:', { dateRange, selectedEvent, reportType });
  };

  // Get default overview stats to avoid null reference errors
  const defaultOverviewStats = {
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    averageAttendance: 0,
    topEvent: null
  };

  const displayOverviewStats = overviewStats || defaultOverviewStats;

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

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Lỗi:</strong> {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => dispatch(clearError())}
          ></button>
        </div>
      )}

      {/* Overview Stats */}
      {reportType === 'OVERVIEW' && (
        <>
          <div className="row mb-4">
            <div className="col-md-2">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h3>{displayOverviewStats.totalEvents || 0}</h3>
                  <p className="mb-0">Sự kiện</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h3>{(displayOverviewStats.totalBookings || 0).toLocaleString()}</h3>
                  <p className="mb-0">Đặt chỗ</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-info text-white">
                <div className="card-body text-center">
                  <h3>{(displayOverviewStats.totalUsers || 0).toLocaleString()}</h3>
                  <p className="mb-0">Người dùng</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h3>{formatCurrency(displayOverviewStats.totalRevenue)}</h3>
                  <p className="mb-0">Doanh thu</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-secondary text-white">
                <div className="card-body text-center">
                  <h3>{displayOverviewStats.averageAttendance || 0}%</h3>
                  <p className="mb-0">Tỷ lệ tham gia</p>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card bg-dark text-white">
                <div className="card-body text-center">
                  <h6 className="mb-0">Sự kiện hot</h6>
                  <small>{displayOverviewStats.topEvent || 'N/A'}</small>
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
                  {eventStats.length === 0 && !eventStatsLoading && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                  {eventStats.map((event, index) => (
                    <tr key={event.id || event.eventId || index}>
                      <td className="fw-bold">{event.eventName || 'N/A'}</td>
                      <td>{(event.totalBookings || 0).toLocaleString()}</td>
                      <td>{(event.attendance || 0).toLocaleString()}</td>
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
                        <span className={`badge ${event.status === 'FINISHED' ? 'bg-success' : 'bg-warning'}`}>
                          {event.status === 'FINISHED' ? 'Hoàn thành' : event.status || 'N/A'}
                        </span>
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
                  {userStats.length === 0 && !userStatsLoading && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                  {userStats.map((stat, index) => (
                    <tr key={stat.month || index}>
                      <td className="fw-bold">{stat.month || 'N/A'}</td>
                      <td>{(stat.newUsers || 0).toLocaleString()}</td>
                      <td>{(stat.activeUsers || 0).toLocaleString()}</td>
                      <td>{(stat.totalBookings || 0).toLocaleString()}</td>
                      <td>
                        {index > 0 && userStats[index - 1]?.newUsers > 0 && (
                          <span className={`badge ${stat.newUsers > userStats[index - 1].newUsers ? 'bg-success' : 'bg-danger'}`}>
                            {stat.newUsers > userStats[index - 1].newUsers ? '+' : ''}
                            {((stat.newUsers - userStats[index - 1].newUsers) / userStats[index - 1].newUsers * 100).toFixed(1)}%
                          </span>
                        )}
                        {index === 0 && <span className="text-muted">-</span>}
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
                      {bookingTrends.length === 0 && !bookingTrendsLoading && (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      {bookingTrends.map((trend, index) => {
                        const maxBookings = Math.max(...bookingTrends.map(t => t.bookings || 0), 1);
                        return (
                          <tr key={trend.date || index}>
                            <td>{formatDate(trend.date)}</td>
                            <td>{trend.bookings || 0}</td>
                            <td>
                              <div className="progress" style={{ height: '20px' }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ width: `${((trend.bookings || 0) / maxBookings) * 100}%` }}
                                >
                                  {trend.bookings || 0}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
                      {attendanceData.length === 0 && !attendanceDataLoading && (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      {attendanceData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.eventName || 'N/A'}</td>
                          <td>{data.attendance || data.attendanceRate || 0}%</td>
                          <td>
                            <div className="progress" style={{ height: '20px' }}>
                              <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{ width: `${data.attendance || data.attendanceRate || 0}%` }}
                              >
                                {data.attendance || data.attendanceRate || 0}%
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
                      {revenueStats.length === 0 && !revenueStatsLoading && (
                        <tr>
                          <td colSpan="3" className="text-center text-muted">
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                      {revenueStats.map((stat, index) => {
                        const maxRevenue = Math.max(...revenueStats.map(s => s.revenue || 0), 1);
                        return (
                          <tr key={stat.eventId || stat.id || index}>
                            <td>{stat.eventName || 'N/A'}</td>
                            <td className="fw-bold">{formatCurrency(stat.revenue)}</td>
                            <td>
                              <div className="progress" style={{ height: '20px' }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ width: `${((stat.revenue || 0) / maxRevenue) * 100}%` }}
                                >
                                  {(((stat.revenue || 0) / maxRevenue) * 100).toFixed(1)}%
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
                <h2 className="text-primary">{formatCurrency(displayOverviewStats.totalRevenue)}</h2>
                <p className="text-muted">Tổng doanh thu trong khoảng thời gian đã chọn</p>
                {revenueStats.length > 0 && (
                  <div className="row mt-4">
                    <div className="col-6">
                      <div className="border-end">
                        <h4 className="text-success">
                          {formatCurrency(Math.max(...revenueStats.map(s => s.revenue || 0)))}
                        </h4>
                        <small className="text-muted">Cao nhất</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h4 className="text-info">
                        {formatCurrency(
                          revenueStats.reduce((sum, s) => sum + (s.revenue || 0), 0) / revenueStats.length
                        )}
                      </h4>
                      <small className="text-muted">Trung bình</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;