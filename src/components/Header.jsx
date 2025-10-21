import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import './css/Header.css';
import logo from '../images/logo.jpg';
import userService from '../services/userService';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userEmail, roles } = useSelector(state => state.auth);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');

  // Navigation items configuration
  const navItems = [
    { id: 'home', label: 'Trang chủ', href: '/' },
    { id: 'events', label: 'Sự kiện', href: '/events' },
    { id: 'news', label: 'Tin tức', href: '/news' },
    { id: 'about', label: 'Giới thiệu', href: '/about' }
  ];

  // Scroll spy effect for in-page sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active nav on route/pathname change
  useEffect(() => {
    const currentNav = navItems.find(item => item.href === location.pathname);
    if (currentNav) {
      setActiveSection(currentNav.id);
    }
  }, [location.pathname]);

  // Fetch user profile to get avatar when authenticated
  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      if (!token) {
        setAvatarUrl('');
        setFullName('');
        return;
      }
      try {
        const res = await userService.getProfile();
        const data = res?.data;
        if (isMounted) {
          setAvatarUrl(data?.avatarUrl || '');
          setFullName(data?.fullName || '');
        }
      } catch (_) {
        if (isMounted) {
          setAvatarUrl('');
          setFullName('');
        }
      }
    };
    fetchProfile();
    return () => { isMounted = false; };
  }, [token]);

  // Handle navigation click
  const handleNavClick = (item) => {
    setActiveSection(item.id);
    
    // If it's a section on the same page, scroll to it
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <img 
              src={logo} 
              alt="Seatify Logo" 
              className="logo-image"
            />
          </div>
          <div className="brand-info">
            <h1 className="brand-name">SEATIFY</h1>
            {/* <p className="brand-subtitle">FPT Seminar Check-in</p> */}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li 
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <Link 
                  to={item.href} 
                  className="nav-link"
                  onClick={(e) => {
                    const element = document.getElementById(item.id);
                    if (element) {
                      e.preventDefault();
                      handleNavClick(item);
                    }
                    // Otherwise let Link navigate normally
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/User Section */}
        <div className="login-section">
          {token ? (
            <div className="user-info" ref={menuRef}>
              <button className="user-avatar-btn" onClick={() => setIsMenuOpen(v => !v)} aria-haspopup="menu" aria-expanded={isMenuOpen}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName || 'Avatar'}
                    className="user-avatar-img"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <i className="bi bi-person"></i>
                )}
              </button>
              {/* Hidden email text intentionally to keep header clean */}
              {isMenuOpen && (
                <div className="profile-menu" role="menu">
                  <Link to="/profile" className="profile-menu-item" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-info-circle me-2"></i>Thông tin cá nhân
                  </Link>
                  <Link to="/profile/update" className="profile-menu-item" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-pencil-square me-2"></i>Cập nhật thông tin
                  </Link>
                  <Link to="/profile/password" className="profile-menu-item" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-key me-2"></i>Đổi mật khẩu
                  </Link>
                  <Link to="/profile/bookings" className="profile-menu-item" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-clock-history me-2"></i>Lịch sử vé
                  </Link>
                  {roles.includes('ROLE_ADMIN') && (
                    <Link to="/admin/dashboard" className="profile-menu-item" onClick={() => setIsMenuOpen(false)}>
                      <i className="bi bi-gear me-2"></i>Admin
                    </Link>
                  )}
                  <button className="profile-menu-item danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="login-btn"
              onClick={handleLoginClick}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
