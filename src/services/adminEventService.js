import api from './apiService';

const adminEventService = {
  // Lấy tất cả sự kiện với phân trang và tìm kiếm
  getAllEvents: async (params = {}) => {
    const {
      name = '',
      page = 0,
      size = 9999,
      sortBy = 'eventId',
      desc = false
    } = params;

    const queryParams = new URLSearchParams({
      name,
      page: page.toString(),
      size: size.toString(),
      sortBy,
      desc: desc.toString()
    });

    const response = await api.get(`/admin/events?${queryParams}`);
    return response.data;
  },

  // Lấy sự kiện theo ID
  getEventById: async (id) => {
    const response = await api.get(`/admin/events/${id}`);
    return response.data;
  },

  // Tạo sự kiện mới
  createEvent: async (eventData) => {
    const response = await api.post('/admin/events/create', eventData);
    return response.data;
  },

  // Cập nhật sự kiện
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/admin/events/update/${id}`, eventData);
    return response.data;
  },

  // Xóa sự kiện
  deleteEvent: async (id) => {
    const response = await api.delete(`/admin/events/${id}`);
    return response.data;
  }
};

export default adminEventService;
