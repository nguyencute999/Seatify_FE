import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';

// Đăng nhập
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', userData);
      // backend trả về accessToken trực tiếp trong response.data
      return {
        token: response.data.accessToken,
        roles: response.data.roles,
        email: userData.email,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Quên mật khẩu
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/forgot-password/otp', { email });
      // API trả về message trong res.data.message hoặc res.data
      return res.data.message || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Đặt lại mật khẩu
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/reset-password/otp', { email, otp, newPassword, confirmPassword });
      return res.data.message || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Đăng ký
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Google Login - Get redirect URL
export const getGoogleLoginUrl = createAsyncThunk(
  'auth/getGoogleLoginUrl',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/google-login');
      return response.data.redirectUrl;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Google Login - Exchange code for token
export const googleLoginWithCode = createAsyncThunk(
  'auth/googleLoginWithCode',
  async ({ code, redirectUri }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/google/code', { code, redirectUri });
      return {
        token: response.data.accessToken,
        roles: response.data.roles,
        email: response.data.email,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userEmail: null,
    token: null,
    roles: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.userEmail = null;
      state.token = null;
      state.roles = [];
      state.error = null;
      state.message = null;
      localStorage.removeItem('auth');
    },
    setAuthFromStorage: (state, action) => {
      state.userEmail = action.payload.email;
      state.token = action.payload.token;
      state.roles = action.payload.roles || [];
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.token = action.payload.token;
        state.roles = action.payload.roles || [];
        localStorage.setItem('auth', JSON.stringify({ 
          token: action.payload.token, 
          email: action.payload.email, 
          roles: action.payload.roles || [] 
        }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Email hoặc mật khẩu không đúng';
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.message = 'Đăng ký thành công! Vui lòng đăng nhập.';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Đăng ký thất bại';
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Có lỗi xảy ra';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Có lỗi xảy ra';
      })

      // Google Login URL
      .addCase(getGoogleLoginUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGoogleLoginUrl.fulfilled, (state, action) => {
        state.loading = false;
        // Redirect to Google login URL
        window.location.href = action.payload;
      })
      .addCase(getGoogleLoginUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Có lỗi xảy ra khi đăng nhập Google';
      })

      // Google Login with Code
      .addCase(googleLoginWithCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginWithCode.fulfilled, (state, action) => {
        state.loading = false;
        state.userEmail = action.payload.email;
        state.token = action.payload.token;
        state.roles = action.payload.roles || [];
        localStorage.setItem('auth', JSON.stringify({ 
          token: action.payload.token, 
          email: action.payload.email, 
          roles: action.payload.roles || [] 
        }));
      })
      .addCase(googleLoginWithCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Đăng nhập Google thất bại';
      });
  },
});

export const { logout, setAuthFromStorage, clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;