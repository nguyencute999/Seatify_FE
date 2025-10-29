import api from './apiService';

const userSeatService = {
  // Lấy danh sách ghế theo eventId cho user
  getSeatsByEventId: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/seats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  }
};

export default userSeatService;
