import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  registerUser,
  getGoogleLoginUrl,
  clearError,
  clearMessage 
} from '../../redux/auth/authSlice';
import './AuthPages.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    mssv: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  // Show toast notifications for errors and messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }
  }, [error, message, dispatch, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    
    dispatch(registerUser(formData));
  };

  const handleGoogleLogin = () => {
    dispatch(getGoogleLoginUrl());
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2 className="register-title">Tạo tài khoản SEATIFY</h2>
            <p className="register-subtitle">Đăng ký để tham gia sự kiện</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="mssv" className="form-label">
                    MSSV
                  </label>
                  <input
                    id="mssv"
                    name="mssv"
                    type="text"
                    className="form-control"
                    placeholder="Nhập MSSV"
                    value={formData.mssv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-control"
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Nhập địa chỉ email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Tối thiểu 6 ký tự"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Xác nhận mật khẩu
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-register"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
            </button>

            <div className="divider">
              <span>Hoặc đăng ký bằng</span>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="btn btn-outline-danger btn-social"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <i className="bi bi-google me-2"></i>
                Google
              </button>
            </div>

            <div className="text-center mt-4">
              <span className="text-muted">Đã có tài khoản? </span>
              <Link to="/login" className="login-link">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
