import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminBookingService from '../../services/adminBookingService';

export const fetchAdminBookings = createAsyncThunk(
  'adminBookings/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await adminBookingService.getAllBookings(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải danh sách đặt chỗ');
    }
  }
);

const adminBookingSlice = createSlice({
  name: 'adminBookings',
  initialState: {
    data: [],
    totalElements: 0,
    loading: false,
    error: null,
    pagination: {
      page: 0,
      size: 20,
      totalPages: 1,
      totalElements: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.content || [];
        state.pagination = {
          page: action.payload.number ?? 0,
          size: action.payload.size ?? 20,
          totalPages: action.payload.totalPages ?? 1,
          totalElements: action.payload.totalElements ?? 0,
        };
      })
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default adminBookingSlice.reducer;
