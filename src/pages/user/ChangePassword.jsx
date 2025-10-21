import React, { useState } from 'react';
import userService from '../../services/userService';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const validate = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return 'Vui lòng điền đầy đủ các trường.';
    }
    if (newPassword.length < 6) {
      return 'Mật khẩu mới phải có ít nhất 6 ký tự.';
    }
    if (newPassword !== confirmNewPassword) {
      return 'Xác nhận mật khẩu mới không khớp.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await userService.changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      const msg = res?.message || 'Đổi mật khẩu thành công';
      setMessage(msg);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Đổi mật khẩu</h3>

      {message && (
        <div className="alert alert-success" role="alert">{message}</div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="card p-3" style={{ maxWidth: '480px' }}>
        <div className="mb-3">
          <label className="form-label">Mật khẩu hiện tại</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang đổi...' : 'Đổi mật khẩu'}
        </button>
      </form>
    </div>
  );
}


