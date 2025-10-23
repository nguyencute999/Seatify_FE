import api from './apiService';

const userEventService = {
  // Lấy tất cả sự kiện cho người dùng
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  // Lấy sự kiện theo ID cho người dùng
  getEventById: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  }
};

export default userEventService;
