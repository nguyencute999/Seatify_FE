import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminFetchNews,
  adminCreateNews,
  adminUpdateNews,
  adminDeleteNews,
  adminPublishNews,
  adminUnpublishNews,
  clearAdminNewsError,
} from '../../redux/news/adminNewsSlice';
import { fetchAdminEvents } from '../../redux/event/eventSlice';
import adminNewsService from '../../services/adminNewsService';

export default function AdminNewsSlide() {
  const dispatch = useDispatch();
  const { items, loading, createLoading, updateLoading, deleteLoading, error, pagination } = useSelector((s) => s.adminNews);
  const { adminEvents } = useSelector((s) => s.events);
  
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [query, setQuery] = useState({ title: '', page: 0, size: 10, sortBy: 'newsId', desc: false });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    eventId: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch events for dropdown
  useEffect(() => {
    dispatch(fetchAdminEvents({
      name: '',
      page: 0,
      size: 9999,
      sortBy: 'eventId',
      desc: false
    }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(adminFetchNews(query));
  }, [dispatch, query.title, query.page, query.size, query.sortBy, query.desc]);

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
      const response = await adminNewsService.uploadThumbnail(file);
      return response; // This should be the image URL (string)
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateNews = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      content: '',
      thumbnail: '',
      eventId: ''
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setShowModal(true);
  };

  const handleEditNews = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title || '',
      content: news.content || '',
      thumbnail: news.thumbnail || '',
      eventId: news.eventId ? String(news.eventId) : ''
    });
    setThumbnailFile(null);
    setThumbnailPreview(news.thumbnail || '');
    setShowModal(true);
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();

    try {
      let thumbnailUrl = formData.thumbnail;
      
      // Upload thumbnail if a new file is selected
      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile);
      }

      const payload = {
        title: formData.title?.trim(),
        content: formData.content?.trim(),
        thumbnail: thumbnailUrl?.trim() || '',
        eventId: formData.eventId ? Number(formData.eventId) : null,
      };

      if (editingNews) {
        // Update existing news
        await dispatch(adminUpdateNews({
          id: editingNews.newsId,
          data: payload
        })).unwrap();
        setSuccessMessage('Cập nhật tin tức thành công!');
      } else {
        // Create new news
        await dispatch(adminCreateNews(payload)).unwrap();
        setSuccessMessage('Tạo tin tức thành công!');
      }
      
      setShowModal(false);
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refresh news list
      dispatch(adminFetchNews(query));
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Có lỗi xảy ra khi lưu tin tức. Vui lòng thử lại.');
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        await dispatch(adminDeleteNews(newsId)).unwrap();
        setSuccessMessage('Xóa tin tức thành công!');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Refresh news list
        dispatch(adminFetchNews(query));
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handlePublishNews = async (newsId) => {
    try {
      await dispatch(adminPublishNews(newsId)).unwrap();
      setSuccessMessage('Công bố tin tức thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refresh news list
      dispatch(adminFetchNews(query));
    } catch (error) {
      console.error('Error publishing news:', error);
      alert('Có lỗi xảy ra khi công bố tin tức. Vui lòng thử lại.');
    }
  };

  const handleUnpublishNews = async (newsId) => {
    try {
      await dispatch(adminUnpublishNews(newsId)).unwrap();
      setSuccessMessage('Hủy công bố tin tức thành công!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Refresh news list
      dispatch(adminFetchNews(query));
    } catch (error) {
      console.error('Error unpublishing news:', error);
      alert('Có lỗi xảy ra khi hủy công bố tin tức. Vui lòng thử lại.');
    }
  };

  const filteredNews = items.filter(news => {
    return news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           news.content?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading && items.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-news">
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
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Lỗi:</strong> {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => dispatch(clearAdminNewsError())}
              ></button>
            </div>
          )}

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Quản lý tin tức</h2>
              <p className="text-muted">Quản lý tất cả các tin tức trong hệ thống</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleCreateNews}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Tạo tin tức mới
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
                  placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={query.size}
                onChange={(e) => setQuery({ ...query, page: 0, size: Number(e.target.value) })}
              >
                <option value={5}>5 mục/trang</option>
                <option value={10}>10 mục/trang</option>
                <option value={20}>20 mục/trang</option>
                <option value={50}>50 mục/trang</option>
              </select>
            </div>
          </div>

          {/* News Table */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tiêu đề</th>
                      <th>Nội dung</th>
                      <th>Sự kiện</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          <div className="spinner-border spinner-border-sm me-2"></div>
                          Đang tải...
                        </td>
                      </tr>
                    ) : filteredNews.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          <i className="bi bi-newspaper text-muted" style={{ fontSize: '3rem' }}></i>
                          <h5 className="mt-3 text-muted">Không tìm thấy tin tức nào</h5>
                          <p className="text-muted">Thử thay đổi bộ lọc hoặc tạo tin tức mới</p>
                        </td>
                      </tr>
                    ) : (
                      filteredNews.map(news => (
                        <tr key={news.newsId}>
                          <td>
                            {news.thumbnail ? (
                              <img
                                src={news.thumbnail}
                                alt={news.title}
                                className="rounded"
                                style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/images/default-news.jpg';
                                }}
                              />
                            ) : (
                              <div className="rounded bg-secondary d-flex align-items-center justify-content-center text-white" 
                                   style={{ width: '60px', height: '40px' }}>
                                <i className="bi bi-image"></i>
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              <div className="fw-bold">{news.title}</div>
                            </div>
                          </td>
                          <td>
                            <div className="text-muted text-truncate" style={{ maxWidth: '300px' }}>
                              {news.content}
                            </div>
                          </td>
                          <td>
                            {news.eventId ? (
                              adminEvents.data?.find(e => e.eventId === news.eventId)?.eventName || news.eventId
                            ) : '-'}
                          </td>
                          <td>
                            {news.isPublished ? (
                              <span className="badge bg-success">Đã công bố</span>
                            ) : (
                              <span className="badge bg-secondary">Chưa công bố</span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditNews(news)}
                                title="Chỉnh sửa"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handlePublishNews(news.newsId)}
                                title="Công bố"
                                disabled={news.isPublished}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => handleUnpublishNews(news.newsId)}
                                title="Hủy công bố"
                                disabled={!news.isPublished}
                              >
                                <i className="bi bi-eye-slash"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteNews(news.newsId)}
                                disabled={deleteLoading}
                                title="Xóa"
                              >
                                {deleteLoading ? (
                                  <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                  <i className="bi bi-trash"></i>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && items.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="small text-muted">
                    Trang {pagination.number + 1} / {pagination.totalPages || 1} • Tổng {pagination.totalElements || items.length}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      disabled={query.page <= 0 || loading}
                      onClick={() => setQuery({ ...query, page: Math.max(0, query.page - 1) })}
                    >
                      <i className="bi bi-chevron-left"></i> Trước
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      disabled={pagination.totalPages === 0 || query.page >= pagination.totalPages - 1 || loading}
                      onClick={() => setQuery({ ...query, page: query.page + 1 })}
                    >
                      Sau <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Create/Edit News Modal */}
          {showModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {editingNews ? 'Chỉnh sửa tin tức' : 'Tạo tin tức mới'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <form onSubmit={handleSaveNews}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Tiêu đề *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Nội dung *</label>
                        <textarea
                          className="form-control"
                          rows="6"
                          value={formData.content}
                          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                          required
                        ></textarea>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Sự kiện</label>
                          <select
                            className="form-select"
                            value={formData.eventId || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, eventId: e.target.value }))}
                          >
                            <option value="">Không chọn sự kiện</option>
                            {adminEvents.data && adminEvents.data.map(event => (
                              <option key={event.eventId} value={event.eventId}>
                                {event.eventName}
                              </option>
                            ))}
                          </select>
                          <small className="text-muted">Chọn sự kiện liên quan (tùy chọn)</small>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Hình ảnh thumbnail</label>
                        <div className="mb-2">
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                          />
                          <small className="text-muted">Chọn file hình ảnh (JPG, PNG, GIF) hoặc nhập URL trực tiếp</small>
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
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isUploading || createLoading || updateLoading}
                      >
                        {isUploading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Đang upload...
                          </>
                        ) : editingNews ? (
                          updateLoading ? 'Đang cập nhật...' : 'Cập nhật'
                        ) : (
                          createLoading ? 'Đang tạo...' : 'Tạo tin tức'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
