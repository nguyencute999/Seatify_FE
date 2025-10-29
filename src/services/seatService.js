import api from './apiService';

const seatService = {
  // Lấy danh sách ghế theo eventId
  getSeatsByEventId: async (eventId) => {
    try {
      const response = await api.get(`/seats/event/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching seats:', error);
      throw error;
    }
  }
};

export default seatService;
