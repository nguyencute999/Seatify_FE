import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchAdminEvents, 
  createAdminEvent, 
  updateAdminEvent, 
  deleteAdminEvent,
  clearAdminError,
  updateAdminEventStatus
} from '../../redux/event/eventSlice';
import adminEventService from '../../services/adminEventService';

const ManageEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminEvents } = useSelector(state => state.events);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    capacity: '',
    seatsPerRow: '',
    rows: '',
    thumbnail: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Load events from API
  useEffect(() => {
    dispatch(fetchAdminEvents({
      name: searchTerm,
      page: 0,
      size: 9999,
      sortBy: 'eventId',
      desc: false
    }));
  }, [dispatch, searchTerm]);

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

  // Helper function để tính capacity tự động
  const calculateCapacity = (rows, seatsPerRow) => {
    return parseInt(rows) * parseInt(seatsPerRow);
  };

  // Handle file selection for thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  // Upload thumbnail and get URL
  const uploadThumbnail = async (file) => {
    try {
      setIsUploading(true);
      const response = await adminEventService.uploadThumbnail(file);
      return response; // This should be the image URL
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
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
      seatsPerRow: '',
      rows: '',
      thumbnail: ''
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
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
      seatsPerRow: event.seatsPerRow?.toString() || '',
      rows: event.rows?.toString() || '',
      thumbnail: event.thumbnail
    });
    setThumbnailFile(null);
    setThumbnailPreview(event.thumbnail || '');
    setShowModal(true);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.rows || !formData.seatsPerRow) {
      alert('Vui lòng nhập đầy đủ số hàng ghế và số ghế mỗi hàng!');
      return;
    }

    try {
      let thumbnailUrl = formData.thumbnail;
      
      // Upload thumbnail if a new file is selected
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      if (editingEvent) {
        // Update existing event
        await dispatch(updateAdminEvent({
          eventId: editingEvent.eventId,
          eventData: {
            eventName: formData.eventName,
            description: formData.description,
            startTime: formData.startTime,
            endTime: formData.endTime,
            location: formData.location,
            capacity: parseInt(formData.capacity),
            seatsPerRow: parseInt(formData.seatsPerRow),
            rows: parseInt(formData.rows),
            thumbnail: thumbnailUrl
          }
        })).unwrap();
      } else {
        // Create new event
        const eventData = {
          eventName: formData.eventName,
          description: formData.description,
          startTime: formData.startTime,
          endTime: formData.endTime,
          location: formData.location,
          capacity: parseInt(formData.capacity),
          seatsPerRow: parseInt(formData.seatsPerRow),
          rows: parseInt(formData.rows),
          // Alternative field names that backend might expect
          seatRows: parseInt(formData.rows),
          numberOfRows: parseInt(formData.rows),
          seatsPerRowCount: parseInt(formData.seatsPerRow),
          thumbnail: thumbnailUrl,
          status: 'UPCOMING'
        };
        
        await dispatch(createAdminEvent(eventData)).unwrap();
      }
      
      setShowModal(false);
      setSuccessMessage(editingEvent ? 'Cập nhật sự kiện thành công!' : 'Tạo sự kiện thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refresh events list
      dispatch(fetchAdminEvents({
        name: searchTerm,
        page: 0,
        size: 9999,
        sortBy: 'eventId',
        desc: false
      }));
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Có lỗi xảy ra khi lưu sự kiện. Vui lòng thử lại.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      try {
        await dispatch(deleteAdminEvent(eventId)).unwrap();
        setSuccessMessage('Xóa sự kiện thành công!');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Refresh events list
        dispatch(fetchAdminEvents({
          name: searchTerm,
          page: 0,
          size: 9999,
          sortBy: 'eventId',
          desc: false
        }));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await dispatch(updateAdminEvent({
        eventId: eventId,
        eventData: { status: newStatus }
      })).unwrap();
      
      // Update local state immediately for better UX
      dispatch(updateAdminEventStatus({ eventId, status: newStatus }));
      setSuccessMessage('Cập nhật trạng thái thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };

  const filteredEvents = adminEvents.data.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (adminEvents.loading) {
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
      {/* Success Alert */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Thành công:</strong> {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage('')}
          ></button>
        </div>
      )}

      {/* Error Alert */}
      {adminEvents.error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Lỗi:</strong> {adminEvents.error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => dispatch(clearAdminError())}
          ></button>
        </div>
      )}

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
                  <tr key={event.eventId}>
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
                        <div className="fw-bold">{event.capacity}</div>
                        <small className="text-muted">Sức chứa</small>
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
                        <button
                          className="btn btn-sm btn-outline-warning"
                          title="Quản lý ghế"
                          onClick={() => navigate(`/admin/events/${event.eventId}/seats`)}
                        >
                          <i className="bi bi-grid-3x3-gap"></i>
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
                                onClick={() => handleStatusChange(event.eventId, 'UPCOMING')}
                              >
                                Sắp diễn ra
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.eventId, 'ONGOING')}
                              >
                                Đang diễn ra
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.eventId, 'FINISHED')}
                              >
                                Đã kết thúc
                              </button>
                            </li>
                            <li>
                              <button 
                                className="dropdown-item"
                                onClick={() => handleStatusChange(event.eventId, 'CANCELLED')}
                              >
                                Hủy sự kiện
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteEvent(event.eventId)}
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
                        readOnly
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                      <small className="text-muted">Tự động tính từ số hàng × số ghế mỗi hàng</small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số hàng ghế *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.rows}
                        onChange={(e) => {
                          const rows = e.target.value;
                          setFormData(prev => ({ 
                            ...prev, 
                            rows: rows,
                            capacity: rows && prev.seatsPerRow ? calculateCapacity(rows, prev.seatsPerRow).toString() : prev.capacity
                          }));
                        }}
                        min="1"
                        max="50"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số ghế mỗi hàng *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.seatsPerRow}
                        onChange={(e) => {
                          const seatsPerRow = e.target.value;
                          setFormData(prev => ({ 
                            ...prev, 
                            seatsPerRow: seatsPerRow,
                            capacity: prev.rows && seatsPerRow ? calculateCapacity(prev.rows, seatsPerRow).toString() : prev.capacity
                          }));
                        }}
                        min="1"
                        max="50"
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
                    <label className="form-label">Hình ảnh sự kiện</label>
                    <div className="mb-2">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                      />
                      <small className="text-muted">Chọn file hình ảnh (JPG, PNG, GIF)</small>
                    </div>
                    {thumbnailPreview && (
                      <div className="mt-2">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="img-thumbnail"
                          style={{ maxWidth: '200px', maxHeight: '150px' }}
                        />
                      </div>
                    )}
                    {isUploading && (
                      <div className="mt-2">
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Uploading...</span>
                        </div>
                        <small className="text-muted">Đang tải lên hình ảnh...</small>
                      </div>
                    )}
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