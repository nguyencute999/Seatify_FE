import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    avatarUrl: '',
    phone: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getProfile();
        const data = res?.data;
        if (data) {
          setFormData({
            fullName: data.fullName || '',
            avatarUrl: data.avatarUrl || '',
            phone: data.phone || ''
          });
        }
      } catch (err) {
        setError('Không thể tải thông tin hồ sơ');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return 'Vui lòng nhập họ và tên';
    }
    if (formData.fullName.trim().length < 2) {
      return 'Họ và tên phải có ít nhất 2 ký tự';
    }
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      return 'Số điện thoại không hợp lệ';
    }
    if (formData.avatarUrl && !/^https?:\/\/.+/.test(formData.avatarUrl)) {
      return 'URL ảnh đại diện phải bắt đầu bằng http:// hoặc https://';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        avatarUrl: formData.avatarUrl.trim() || '',
        phone: formData.phone.trim() || ''
      };

      const res = await userService.updateProfile(payload);
      const msg = res?.message || 'Cập nhật thông tin thành công';
      setMessage(msg);
    } catch (err) {
      setError(err?.message || 'Cập nhật thông tin thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">Đang tải thông tin...</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-3">Cập nhật thông tin</h3>

      {message && (
        <div className="alert alert-success" role="alert">{message}</div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="card p-4" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Họ và tên <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="avatarUrl" className="form-label">URL ảnh đại diện</label>
          <input
            type="url"
            id="avatarUrl"
            name="avatarUrl"
            className="form-control"
            value={formData.avatarUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/avatar.jpg"
          />
          {formData.avatarUrl && (
            <div className="mt-2">
              <small className="text-muted">Xem trước:</small>
              <div className="mt-1">
                <img 
                  src={formData.avatarUrl} 
                  alt="Preview" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '50%',
                    border: '1px solid #ddd'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={submitting}
          >
            {submitting ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}


