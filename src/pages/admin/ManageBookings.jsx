import React, { useState, useEffect } from 'react';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [eventFilter, setEventFilter] = useState('ALL');
  const [selectedBookings, setSelectedBookings] = useState([]);

  // Mock data - sẽ thay thế bằng API calls thực tế
  useEffect(() => {
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          user: {
            id: 1,
            fullName: 'Nguyễn Văn A',
            email: 'nguyenvana@fpt.edu.vn',
            mssv: 'SE123456'
          },
          event: {
            id: 1,
            eventName: 'Seminar AI & Machine Learning',
            startTime: '2024-01-20T09:00:00',
            location: 'Hội trường A, Tòa nhà FPT'
          },
          seat: {
            id: 1,
            seatRow: 'A',
            seatNumber: 1
          },
          bookingTime: '2024-01-15T10:30:00',
          checkInTime: null,
          checkOutTime: null,
          status: 'BOOKED',
          qrCode: 'QR123456789'
        },
        {
          id: 2,
          user: {
            id: 2,
            fullName: 'Trần Thị B',
            email: 'tranthib@fpt.edu.vn',
            mssv: 'SE123457'
          },
          event: {
            id: 2,
            eventName: 'Workshop React Development',
            startTime: '2024-01-18T14:00:00',
            location: 'Phòng Lab 301'
          },
          seat: {
            id: 2,
            seatRow: 'B',
            seatNumber: 5
          },
          bookingTime: '2024-01-15T09:15:00',
          checkInTime: '2024-01-18T13:45:00',
          checkOutTime: null,
          status: 'CHECKED_IN',
          qrCode: 'QR123456790'
        },
        {
          id: 3,
          user: {
            id: 3,
            fullName: 'Lê Văn C',
            email: 'levanc@fpt.edu.vn',
            mssv: 'SE123458'
          },
          event: {
            id: 3,
            eventName: 'Conference Blockchain Technology',
            startTime: '2024-01-16T08:00:00',
            location: 'Trung tâm Hội nghị Quốc gia'
          },
          seat: {
            id: 3,
            seatRow: 'C',
            seatNumber: 10
          },
          bookingTime: '2024-01-14T16:45:00',
          checkInTime: '2024-01-16T07:30:00',
          checkOutTime: '2024-01-16T16:30:00',
          status: 'CHECKED_IN',
          qrCode: 'QR123456791'
        },
        {
          id: 4,
          user: {
            id: 4,
            fullName: 'Phạm Thị D',
            email: 'phamthid@fpt.edu.vn',
            mssv: 'SE123459'
          },
          event: {
            id: 1,
            eventName: 'Seminar AI & Machine Learning',
            startTime: '2024-01-20T09:00:00',
            location: 'Hội trường A, Tòa nhà FPT'
          },
          seat: {
            id: 4,
            seatRow: 'A',
            seatNumber: 15
          },
          bookingTime: '2024-01-16T11:20:00',
          checkInTime: null,
          checkOutTime: null,
          status: 'CANCELLED',
          qrCode: 'QR123456792'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      'BOOKED': 'badge bg-primary',
      'CHECKED_IN': 'badge bg-success',
      'CANCELLED': 'badge bg-danger'
    };
    return badges[status] || 'badge bg-secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      'BOOKED': 'Đã đặt',
      'CHECKED_IN': 'Đã check-in',
      'CANCELLED': 'Đã hủy'
    };
    return texts[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { 
            ...booking, 
            status: newStatus,
            checkInTime: newStatus === 'CHECKED_IN' && !booking.checkInTime 
              ? new Date().toISOString() 
              : booking.checkInTime,
            checkOutTime: newStatus === 'CANCELLED' && booking.checkInTime
              ? new Date().toISOString()
              : booking.checkOutTime
          }
        : booking
    ));
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedBookings.length === 0) {
      alert('Vui lòng chọn ít nhất một đặt chỗ');
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái của ${selectedBookings.length} đặt chỗ thành "${getStatusText(newStatus)}"?`)) {
      setBookings(prev => prev.map(booking => 
        selectedBookings.includes(booking.id)
          ? { 
              ...booking, 
              status: newStatus,
              checkInTime: newStatus === 'CHECKED_IN' && !booking.checkInTime 
                ? new Date().toISOString() 
                : booking.checkInTime,
              checkOutTime: newStatus === 'CANCELLED' && booking.checkInTime
                ? new Date().toISOString()
                : booking.checkOutTime
            }
          : booking
      ));
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(booking => booking.id));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.user.mssv.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event.eventName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
    const matchesEvent = eventFilter === 'ALL' || booking.event.id.toString() === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const uniqueEvents = [...new Set(bookings.map(booking => booking.event))];

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
    <div className="manage-bookings">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Quản lý đặt chỗ</h2>
          <p className="text-muted">Quản lý tất cả đặt chỗ trong hệ thống</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Xuất Excel
          </button>
          {/* <button className="btn btn-outline-secondary">
            <i className="bi bi-printer me-2"></i>
            In danh sách
          </button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{bookings.length}</h4>
                  <p className="mb-0">Tổng đặt chỗ</p>
                </div>
                <i className="bi bi-ticket-perforated" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{bookings.filter(b => b.status === 'BOOKED').length}</h4>
                  <p className="mb-0">Đã đặt</p>
                </div>
                <i className="bi bi-calendar-check" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{bookings.filter(b => b.status === 'CHECKED_IN').length}</h4>
                  <p className="mb-0">Đã check-in</p>
                </div>
                <i className="bi bi-person-check" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{bookings.filter(b => b.status === 'CANCELLED').length}</h4>
                  <p className="mb-0">Đã hủy</p>
                </div>
                <i className="bi bi-x-circle" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên, email, MSSV hoặc sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="BOOKED">Đã đặt</option>
            <option value="CHECKED_IN">Đã check-in</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="ALL">Tất cả sự kiện</option>
            {uniqueEvents.map(event => (
              <option key={event.id} value={event.id}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-success"
              onClick={() => handleBulkStatusChange('CHECKED_IN')}
              disabled={selectedBookings.length === 0}
            >
              <i className="bi bi-check-circle me-1"></i>
              Check-in hàng loạt
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => handleBulkStatusChange('CANCELLED')}
              disabled={selectedBookings.length === 0}
            >
              <i className="bi bi-x-circle me-1"></i>
              Hủy hàng loạt
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Người dùng</th>
                  <th>Sự kiện</th>
                  <th>Ghế</th>
                  <th>Thời gian đặt</th>
                  <th>Check-in/out</th>
                  <th>Trạng thái</th>
                  {/* <th>QR Code</th> */}
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => handleSelectBooking(booking.id)}
                      />
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{booking.user.fullName}</div>
                        <div className="text-muted small">
                          <div><i className="bi bi-envelope me-1"></i>{booking.user.email}</div>
                          <div><i className="bi bi-person-badge me-1"></i>{booking.user.mssv}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{booking.event.eventName}</div>
                        <div className="text-muted small">
                          <div><i className="bi bi-calendar me-1"></i>{formatDate(booking.event.startTime)}</div>
                          <div><i className="bi bi-geo-alt me-1"></i>{booking.event.location}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {booking.seat.seatRow}{booking.seat.seatNumber}
                      </span>
                    </td>
                    <td>{formatDate(booking.bookingTime)}</td>
                    <td>
                      <div className="small">
                        {booking.checkInTime && (
                          <div><strong>Check-in:</strong> {formatDate(booking.checkInTime)}</div>
                        )}
                        {booking.checkOutTime && (
                          <div><strong>Check-out:</strong> {formatDate(booking.checkOutTime)}</div>
                        )}
                        {!booking.checkInTime && !booking.checkOutTime && (
                          <span className="text-muted">Chưa check-in</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(booking.status)}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    {/* <td>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        title="Xem QR Code"
                      >
                        <i className="bi bi-qr-code"></i>
                      </button>
                    </td> */}
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="Xem chi tiết"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {booking.status === 'BOOKED' && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleStatusChange(booking.id, 'CHECKED_IN')}
                            title="Check-in"
                          >
                            <i className="bi bi-check-circle"></i>
                          </button>
                        )}
                        {booking.status === 'CHECKED_IN' && (
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                            title="Check-out"
                          >
                            <i className="bi bi-box-arrow-right"></i>
                          </button>
                        )}
                        {booking.status !== 'CANCELLED' && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                            title="Hủy đặt chỗ"
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-ticket-perforated text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3 text-muted">Không tìm thấy đặt chỗ nào</h5>
              <p className="text-muted">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Bookings Info */}
      {selectedBookings.length > 0 && (
        <div className="alert alert-info mt-3">
          <i className="bi bi-info-circle me-2"></i>
          Đã chọn {selectedBookings.length} đặt chỗ. 
          <button 
            className="btn btn-sm btn-outline-primary ms-2"
            onClick={() => setSelectedBookings([])}
          >
            Bỏ chọn tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
