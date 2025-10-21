import React, { useState, useEffect } from 'react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    capacity: '',
    thumbnail: ''
  });

  // Mock data - sẽ thay thế bằng API calls thực tế
  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          eventName: 'Seminar AI & Machine Learning',
          description: 'Hội thảo về trí tuệ nhân tạo và học máy trong thời đại 4.0',
          startTime: '2024-01-20T09:00:00',
          endTime: '2024-01-20T17:00:00',
          location: 'Hội trường A, Tòa nhà FPT',
          capacity: 100,
          booked: 85,
          status: 'UPCOMING',
          thumbnail: '/images/event1.jpg',
          createdBy: 'Admin',
          createdAt: '2024-01-10T10:00:00'
        },
        {
          id: 2,
          eventName: 'Workshop React Development',
          description: 'Workshop thực hành phát triển ứng dụng web với React',
          startTime: '2024-01-18T14:00:00',
          endTime: '2024-01-18T18:00:00',
          location: 'Phòng Lab 301',
          capacity: 50,
          booked: 50,
          status: 'ONGOING',
          thumbnail: '/images/event2.jpg',
          createdBy: 'Admin',
          createdAt: '2024-01-08T15:30:00'
        },
        {
          id: 3,
          eventName: 'Conference Blockchain Technology',
          description: 'Hội nghị về công nghệ blockchain và ứng dụng thực tế',
          startTime: '2024-01-16T08:00:00',
          endTime: '2024-01-16T16:00:00',
          location: 'Trung tâm Hội nghị Quốc gia',
          capacity: 200,
          booked: 180,
          status: 'UPCOMING',
          thumbnail: '/images/event3.jpg',
          createdBy: 'Admin',
          createdAt: '2024-01-05T09:15:00'
        },
        {
          id: 4,
          eventName: 'Tech Talk: Cloud Computing',
          description: 'Buổi chia sẻ về điện toán đám mây và xu hướng công nghệ',
          startTime: '2024-01-12T19:00:00',
          endTime: '2024-01-12T21:00:00',
          location: 'Online - Zoom',
          capacity: 500,
          booked: 320,
          status: 'FINISHED',
          thumbnail: '/images/event4.jpg',
          createdBy: 'Admin',
          createdAt: '2024-01-01T14:20:00'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      'UPCOMING': 'badge bg-info',
      'ONGOING': 'badge bg-warning',
      'FINISHED': 'badge bg-success',
      'CANCELLED': 'badge bg-danger'
    };
    return badges[status] || 'badge bg-secondary';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setFormData({
      eventName: '',
      description: '',
      startTime: '',
      endTime: '',
      location: '',
      capacity: '',
      thumbnail: ''
    });
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      description: event.description,
      startTime: event.startTime.slice(0, 16), // Format for datetime-local input
      endTime: event.endTime.slice(0, 16),
      location: event.location,
      capacity: event.capacity.toString(),
      thumbnail: event.thumbnail
    });
    setShowModal(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData, capacity: parseInt(formData.capacity) }
          : event
      ));
    } else {
      // Create new event
      const newEvent = {
        id: Date.now(),
        ...formData,
        capacity: parseInt(formData.capacity),
        booked: 0,
        status: 'UPCOMING',
        createdBy: 'Admin',
        createdAt: new Date().toISOString()
      };
      setEvents(prev => [newEvent, ...prev]);
    }
    
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, status: newStatus }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    <div className="manage-events">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Quản lý sự kiện</h2>
          <p className="text-muted">Quản lý tất cả các sự kiện trong hệ thống</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleCreateEvent}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Tạo sự kiện mới
        </button>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên sự kiện hoặc địa điểm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="UPCOMING">Sắp diễn ra</option>
            <option value="ONGOING">Đang diễn ra</option>
            <option value="FINISHED">Đã kết thúc</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">
              <i className="bi bi-download me-1"></i>
              Xuất Excel
            </button>
            {/* <button className="btn btn-outline-secondary">
              <i className="bi bi-printer me-1"></i>
              In danh sách
            </button> */}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sự kiện</th>
                  <th>Thời gian</th>
                  <th>Địa điểm</th>
                  <th>Sức chứa</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td>
                      <img
                        src={event.thumbnail || '/images/default-event.jpg'}
                        alt={event.eventName}
                        className="rounded"
                        style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{event.eventName}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                          {event.description}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div><strong>Bắt đầu:</strong> {formatDate(event.startTime)}</div>
                        <div><strong>Kết thúc:</strong> {formatDate(event.endTime)}</div>
                      </div>
                    </td>
                    <td>{event.location}</td>
                    <td>
                      <div>
                        <div className="fw-bold">{event.booked}/{event.capacity}</div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${(event.booked / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(event.status)}>
                        {getStatusText(event.status)}
                      </span>
                    </td>
                    <td>{formatDate(event.createdAt)}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditEvent(event)}
                          title="Chỉnh sửa"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="Xem chi tiết"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            title="Thay đổi trạng thái"
                          >
                            <i className="bi bi-gear"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.id, 'UPCOMING')}
                              >
                                Sắp diễn ra
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.id, 'ONGOING')}
                              >
                                Đang diễn ra
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.id, 'FINISHED')}
                              >
                                Đã kết thúc
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.id, 'CANCELLED')}
                              >
                                Hủy sự kiện
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteEvent(event.id)}
                          title="Xóa"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3 text-muted">Không tìm thấy sự kiện nào</h5>
              <p className="text-muted">Thử thay đổi bộ lọc hoặc tạo sự kiện mới</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Event Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingEvent ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveEvent}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tên sự kiện *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.eventName}
                        onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Sức chứa *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Thời gian bắt đầu *</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Thời gian kết thúc *</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Địa điểm *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">URL hình ảnh</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingEvent ? 'Cập nhật' : 'Tạo sự kiện'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;