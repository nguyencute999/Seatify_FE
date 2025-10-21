import api from './apiService';

const userService = {
  getProfile: async () => {
    try {
      const res = await api.get('/users/profile');
      return res.data; 
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (payload) => {
    try {
      const res = await api.put('/users/update', payload);
      return res.data; // ResponseWrapper<String>
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  changePassword: async (payload) => {
    try {
      const res = await api.put('/users/change-password', payload);
      return res.data; // ResponseWrapper<String>
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default userService;
