import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';

// Async thunks for user operations
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.get('/user/profile');
      // return response.data;
      
      // Tạm thời return mock data
      return {
        user_id: 1,
        full_name: "Nguyễn Văn A",
        email: "user@example.com",
        mssv: "SE123456",
        phone: "0123456789",
        avatar_url: null,
        status: "ACTIVE",
        verified: true,
        auth_provider: "LOCAL",
        created_at: "2024-01-01T00:00:00",
        updated_at: "2024-01-01T00:00:00"
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.put('/user/profile', userData);
      // return response.data;
      
      // Tạm thời return mock data
      return {
        ...userData,
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user profile');
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await api.put('/user/change-password', passwordData);
      // return { success: true };
      
      // Tạm thời return mock success
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.updateError = null;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (state.profile) {
        state.profile[field] = value;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateError = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  }
});

export const { clearError, clearProfile, updateProfileField } = userSlice.actions;

export default userSlice.reducer;
