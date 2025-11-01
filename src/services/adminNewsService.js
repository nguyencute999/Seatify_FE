import apiService from './apiService';

const adminNewsService = {
  async getAll({ title = '', page = 0, size = 10, sortBy = 'newsId', desc = false } = {}) {
    const params = new URLSearchParams({
      title,
      page: page.toString(),
      size: size.toString(),
      sortBy,
      desc: desc.toString()
    });
    return apiService.get(`/admin/news?${params.toString()}`);
  },

  async getById(id) {
    return apiService.get(`/admin/news/${id}`);
  },

  async create(data) {
    // Backend expects JSON body at POST /admin/news/create
    return apiService.post('/admin/news/create', data);
  },

  async update(id, data) {
    // Backend expects JSON body at PUT /admin/news/update/{id}
    return apiService.put(`/admin/news/update/${id}`, data);
  },

  async remove(id) {
    return apiService.delete(`/admin/news/${id}`);
  },

  // Upload thumbnail cho tin tức
  async uploadThumbnail(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiService.post('/admin/news/upload-thumbnail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Publish tin tức
  async publish(id) {
    return apiService.put(`/admin/news/${id}/publish`);
  },

  // Unpublish tin tức
  async unpublish(id) {
    return apiService.put(`/admin/news/${id}/unpublish`);
  },
};

export default adminNewsService;


