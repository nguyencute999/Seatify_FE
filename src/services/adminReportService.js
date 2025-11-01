import api from './apiService';

const adminReportService = {
  /**
   * Lấy thống kê tổng quan
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   * @param {number|null} eventId - ID sự kiện (tùy chọn, null nếu lấy tất cả)
   */
  getOverviewStats: async (startDate, endDate, eventId = null) => {
    const params = {
      startDate,
      endDate,
    };
    if (eventId) {
      params.eventId = eventId;
    }
    const response = await api.get('/admin/reports/overview', { params });
    return response.data;
  },

  /**
   * Lấy thống kê sự kiện
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   * @param {number|null} eventId - ID sự kiện (tùy chọn, null nếu lấy tất cả)
   */
  getEventStats: async (startDate, endDate, eventId = null) => {
    const params = {
      startDate,
      endDate,
    };
    if (eventId) {
      params.eventId = eventId;
    }
    const response = await api.get('/admin/reports/events', { params });
    return response.data;
  },

  /**
   * Lấy thống kê người dùng theo tháng
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   */
  getUserStats: async (startDate, endDate) => {
    const response = await api.get('/admin/reports/users', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  /**
   * Lấy xu hướng đặt chỗ theo ngày
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   */
  getBookingTrends: async (startDate, endDate) => {
    const response = await api.get('/admin/reports/booking-trends', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  /**
   * Lấy dữ liệu tỷ lệ tham gia theo sự kiện
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   * @param {number|null} eventId - ID sự kiện (tùy chọn, null nếu lấy tất cả)
   */
  getAttendanceData: async (startDate, endDate, eventId = null) => {
    const params = {
      startDate,
      endDate,
    };
    if (eventId) {
      params.eventId = eventId;
    }
    const response = await api.get('/admin/reports/attendance', { params });
    return response.data;
  },

  /**
   * Lấy thống kê doanh thu theo sự kiện
   * @param {string} startDate - Ngày bắt đầu (format: yyyy-MM-dd)
   * @param {string} endDate - Ngày kết thúc (format: yyyy-MM-dd)
   * @param {number|null} eventId - ID sự kiện (tùy chọn, null nếu lấy tất cả)
   */
  getRevenueStats: async (startDate, endDate, eventId = null) => {
    const params = {
      startDate,
      endDate,
    };
    if (eventId) {
      params.eventId = eventId;
    }
    const response = await api.get('/admin/reports/revenue', { params });
    return response.data;
  },
};

export default adminReportService;

