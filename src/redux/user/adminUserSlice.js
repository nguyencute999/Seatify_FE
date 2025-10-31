import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';

// Async thunk lấy danh sách user cho admin
export const fetchAdminUsers = createAsyncThunk(
  'adminUsers/fetchAdminUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi lấy danh sách người dùng');
    }
  }
);

export const addAdminUser = createAsyncThunk(
  'adminUsers/addAdminUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // tạo formData
      const fd = new FormData();
      fd.append('fullName', data.fullName);
      fd.append('email', data.email);
      fd.append('password', data.password);
      fd.append('confirmPassword', data.confirmPassword);
      if (data.mssv) fd.append('mssv', data.mssv);
      if (data.phone) fd.append('phone', data.phone);
      if (Array.isArray(data.roles)) {
        data.roles.forEach(r => fd.append('roles', r));
      }
      if (data.avatarFile) fd.append('avatar', data.avatarFile);
      // gọi API
      await api.post('/admin/users/create', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(fetchAdminUsers());
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi thêm người dùng');
    }
  }
);

const adminUserSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
    addSuccess: false,
  },
  reducers: {
    // Thêm reducers nếu sau này cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm user
      .addCase(addAdminUser.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
        state.addSuccess = false;
      })
      .addCase(addAdminUser.fulfilled, (state) => {
        state.addLoading = false;
        state.addSuccess = true;
      })
      .addCase(addAdminUser.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
        state.addSuccess = false;
      })
  }
});


export default adminUserSlice.reducer;
