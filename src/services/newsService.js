import apiService from './apiService';

const newsService = {
  // Get all news with pagination
  async getNews(page = 0, size = 10) {
    try {
      const response = await apiService.get(`/news?page=${page}&size=${size}`);
      return response;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Get news by ID
  async getNewsById(newsId) {
    try {
      const response = await apiService.get(`/news/${newsId}`);
      return response;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw error;
    }
  },

  // Get news by event ID
  async getNewsByEventId(eventId) {
    try {
      const response = await apiService.get(`/news/event/${eventId}`);
      return response;
    } catch (error) {
      console.error('Error fetching news by event ID:', error);
      throw error;
    }
  },

  // Create new news (Admin only)
  async createNews(newsData) {
    try {
      const response = await apiService.post('/news', newsData);
      return response;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  // Update news (Admin only)
  async updateNews(newsId, newsData) {
    try {
      const response = await apiService.put(`/news/${newsId}`, newsData);
      return response;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  },

  // Delete news (Admin only)
  async deleteNews(newsId) {
    try {
      const response = await apiService.delete(`/news/${newsId}`);
      return response;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },

  // Get latest news (for homepage)
  async getLatestNews(limit = 5) {
    try {
      const response = await apiService.get(`/news/latest?limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching latest news:', error);
      throw error;
    }
  }
};

export default newsService;
