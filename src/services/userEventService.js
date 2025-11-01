import api from './apiService';

const userEventService = {
  // Lấy tất cả sự kiện cho người dùng
  getAllEvents: async (params = {}) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  // Lấy sự kiện theo ID cho người dùng
  getEventById: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  // Lấy các sự kiện nổi bật
  getFeaturedEvents: async () => {
    const response = await api.get('/events/featured');
    return response.data;
  }
};

export default userEventService;
