import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  loginUser, 
  getGoogleLoginUrl,
  clearError,
  clearMessage 
} from '../../redux/auth/authSlice';
import './AuthPages.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, token, roles } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Clear errors and messages when component mounts
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
    }
  }, [error, message, dispatch]);

  // Handle successful login - redirect based on user role
  useEffect(() => {
    if (token && roles && roles.length > 0) {
      // Save to localStorage
      localStorage.setItem('auth', JSON.stringify({
        token,
        roles,
        email: formData.email,
        timestamp: Date.now()
      }));

      if (roles.includes('ROLE_ADMIN')) {
        toast.success('Đăng nhập thành công! Chuyển hướng đến Admin Dashboard...');
        navigate('/admin/dashboard', { replace: true });
      } else {
        toast.success('Đăng nhập thành công!');
        navigate('/', { replace: true });
      }
    }
  }, [token, roles, navigate, formData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleGoogleLogin = () => {
    dispatch(getGoogleLoginUrl());
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Chào mừng đến với SEATIFY</h2>
            <p className="login-subtitle">Đăng nhập để tham gia seminar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="student@fpt.edu.vn"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-login"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>

            <div className="text-center mt-3">
              <Link to="/forgot-password" className="forgot-password-link">
                Quên mật khẩu?
              </Link>
            </div>

            <div className="divider">
              <span>Hoặc đăng nhập bằng</span>
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
              <span className="text-muted">Chưa có tài khoản? </span>
              <Link to="/register" className="register-link">
                Đăng ký ngay
              </Link>
            </div>

            <div className="text-center mt-3">
              <Link to="/" className="back-home-link">
                ← Quay lại trang chủ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
