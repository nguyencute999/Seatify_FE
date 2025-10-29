import api from './apiService';

const bookingService = {
  // Tạo đặt chỗ mới
  createBooking: async (bookingData) => {
    console.log('Creating booking with data:', bookingData);
    console.log('Data types:', {
      eventId: typeof bookingData.eventId,
      seatIds: Array.isArray(bookingData.seatIds) ? 'array' : typeof bookingData.seatIds,
      totalPrice: typeof bookingData.totalPrice,
      notes: typeof bookingData.notes
    });
    
    try {
      const response = await api.post('/user/bookings', bookingData);
      console.log('Booking created successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Booking creation error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      throw error;
    }
  },

  // Lấy danh sách đặt chỗ của user
  getUserBookings: async () => {
    console.log('Fetching user bookings...');
    try {
      const response = await api.get('/user/bookings');
      console.log('User bookings fetched:', response.data);
      return response;
    } catch (error) {
      console.error('Get bookings error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  // Lấy chi tiết đặt chỗ theo ID
  getBookingById: async (bookingId) => {
    console.log('Fetching booking by ID:', bookingId);
    try {
      const response = await api.get(`/user/bookings/${bookingId}`);
      console.log('Booking details fetched:', response.data);
      return response;
    } catch (error) {
      console.error('Get booking by ID error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  // Hủy đặt chỗ
  cancelBooking: async (bookingId) => {
    console.log('Cancelling booking:', bookingId);
    try {
      const response = await api.put(`/user/bookings/${bookingId}/cancel`);
      console.log('Booking cancelled:', response.data);
      return response;
    } catch (error) {
      console.error('Cancel booking error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },
};

export default bookingService;
