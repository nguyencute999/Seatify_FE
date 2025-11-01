import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/bookingService';

// Lịch sử đặt chỗ của user
export const getUserBookingHistory = createAsyncThunk(
  'booking/getUserBookingHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getUserBookingHistory();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Tạo đặt chỗ mới
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingService.createBooking(bookingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Lấy danh sách đặt chỗ của user
export const getUserBookings = createAsyncThunk(
  'booking/getUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getUserBookings();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Lấy chi tiết đặt chỗ theo ID
export const getBookingById = createAsyncThunk(
  'booking/getBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookingById(bookingId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

// Hủy đặt chỗ
export const cancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await bookingService.cancelBooking(bookingId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Server error' });
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    // Thêm booking mới vào danh sách (sau khi tạo thành công)
    addBooking: (state, action) => {
      state.bookings.unshift(action.payload);
    },
    // Cập nhật booking trong danh sách (sau khi hủy)
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(booking => booking.bookingId === action.payload.bookingId);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.message = 'Đặt chỗ thành công!';
        // Thêm booking mới vào đầu danh sách
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Đặt chỗ thất bại';
      })

      // Get User Bookings
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Không thể tải danh sách đặt chỗ';
      })

      // Get User Booking History
      .addCase(getUserBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getUserBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Không thể tải lịch sử đặt chỗ';
      })

      // Get Booking By ID
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Không thể tải chi tiết đặt chỗ';
      })

      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Hủy đặt chỗ thành công!';
        // Cập nhật booking trong danh sách
        const index = state.bookings.findIndex(booking => booking.bookingId === action.payload.bookingId);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        // Cập nhật current booking nếu đang xem chi tiết
        if (state.currentBooking && state.currentBooking.bookingId === action.payload.bookingId) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Hủy đặt chỗ thất bại';
      });
  },
});

export const { 
  clearError, 
  clearMessage, 
  clearCurrentBooking, 
  addBooking, 
  updateBooking 
} = bookingSlice.actions;

export default bookingSlice.reducer;
