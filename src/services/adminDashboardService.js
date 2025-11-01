import api from './apiService';

const adminDashboardService = {
  // Lấy thống kê tổng quan cho dashboard
  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Lấy danh sách đặt chỗ gần đây
  getRecentBookings: async (limit = 10) => {
    const response = await api.get(`/admin/dashboard/recent-bookings?limit=${limit}`);
    return response.data;
  },

  // Lấy danh sách sự kiện gần đây
  getRecentEvents: async (limit = 10) => {
    const response = await api.get(`/admin/dashboard/recent-events?limit=${limit}`);
    return response.data;
  },
};

export default adminDashboardService;

