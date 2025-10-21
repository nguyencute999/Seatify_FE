
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import AboutPage from '../pages/AboutPage';
import OAuth2RedirectPage from '../pages/OAuth2RedirectPage';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/user/HomePage';
import Events from '../pages/user/Events';
import EventDetail from '../pages/user/EventDetail';
import Profile from '../pages/user/Profile';
import UpdateProfile from '../pages/user/UpdateProfile';
import ChangePassword from '../pages/user/ChangePassword';
import BookingHistory from '../pages/user/BookingHistory';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

// Admin components
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import ManageEvents from '../pages/admin/ManageEvents';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageBookings from '../pages/admin/ManageBookings';
import Reports from '../pages/admin/Reports';

// Temporary placeholders until real pages are implemented
function NewsPage() {
  return <div style={{ padding: 24 }}>News page</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes - Standalone pages without App layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Main App Routes */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="profile/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />
        <Route path="profile/password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
        <Route path="profile/bookings" element={
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      
      <Route path="/oauth2/redirect" element={<OAuth2RedirectPage />} />
    </Routes>
  );
}