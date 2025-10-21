import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthFromStorage } from '../redux/auth/authSlice';

// Tạo AuthContext
const AuthContext = createContext();

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy thông tin auth từ Redux store
  const { token, roles, userEmail, loading } = useSelector(state => state.auth);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        if (parsedAuth.token && parsedAuth.email) {
          // Check if token is not expired (optional: add timestamp check)
          dispatch(setAuthFromStorage(parsedAuth));
        }
      } catch (error) {
        console.error('Error parsing auth data from localStorage:', error);
        localStorage.removeItem('auth');
      }
    }
  }, [dispatch]);

  // Xử lý redirect tự động
  useEffect(() => {
    // Chỉ xử lý khi không đang loading và có thông tin user
    if (!loading && token && roles && roles.length > 0 && userEmail) {
      const isAdmin = roles.includes('ROLE_ADMIN');
      const isOnAdminPage = location.pathname.startsWith('/admin');
      const isOnAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
      
      console.log('AuthProvider - User info:', { 
        isAdmin, 
        isOnAdminPage, 
        isOnAuthPage,
        currentPath: location.pathname 
      });
      
      // Nếu đã đăng nhập và đang ở trang auth, redirect đi
      if (isOnAuthPage) {
        if (isAdmin) {
          console.log('Redirecting authenticated admin from auth page to /admin/dashboard');
          navigate('/admin/dashboard', { replace: true });
        } else {
          console.log('Redirecting authenticated user from auth page to home');
          navigate('/', { replace: true });
        }
      }
      // Nếu là admin và không đang ở trang admin, redirect đến admin
      else if (isAdmin && !isOnAdminPage) {
        console.log('Redirecting admin to /admin/dashboard');
        navigate('/admin/dashboard', { replace: true });
      }
      // Nếu là user thường và đang ở trang admin, redirect về trang chủ
      else if (!isAdmin && isOnAdminPage) {
        console.log('Redirecting regular user to home');
        navigate('/', { replace: true });
      }
    }
  }, [token, roles, userEmail, loading, navigate, location.pathname]);

  // Giá trị context
  const value = {
    token,
    roles,
    userEmail,
    loading,
    isAuthenticated: !!token,
    isAdmin: roles?.includes('ROLE_ADMIN') || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
