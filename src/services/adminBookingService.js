import api from './apiService';

const adminBookingService = {
  // Lấy tất cả booking (admin)
  getAllBookings: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const res = await api.get(`/admin/bookings?${queryString}`);
    return res.data;
  },
};

export default adminBookingService;
