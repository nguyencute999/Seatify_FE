import api from './apiService';

const authService = {
  // Login user
  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password/otp', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Reset password
  resetPassword: async (email, otp, newPassword, confirmPassword) => {
    try {
      const response = await api.post('/auth/reset-password/otp', { email, otp, newPassword, confirmPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get Google login URL
  getGoogleLoginUrl: async () => {
    try {
      const response = await api.get('/auth/google-login');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Google login with code
  googleLoginWithCode: async (code, redirectUri) => {
    try {
      const response = await api.post('/auth/google/code', { code, redirectUri });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user profile
  // getUserProfile: async () => {
  //   try {
  //     const response = await api.get('/auth/profile-user');
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  // Update user profile
  // updateUserProfile: async (userData) => {
  //   try {
  //     const response = await api.put('/auth/profile-user/update', userData);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  // Change password
  // changePassword: async (passwordData) => {
  //   try {
  //     const response = await api.put('/auth/change-password', passwordData);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default authService;