import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import seatService from '../../services/seatService';

// Async thunks
export const fetchSeatsByEventId = createAsyncThunk(
  'seats/fetchSeatsByEventId',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await seatService.getSeatsByEventId(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi tải danh sách ghế');
    }
  }
);

const initialState = {
  seats: [],
  loading: false,
  error: null
};

const seatSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    clearSeats: (state) => {
      state.seats = [];
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch seats
      .addCase(fetchSeatsByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatsByEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = action.payload.map(seat => ({
          id: seat.seatId,
          row: seat.seatRow,
          number: seat.seatNumber,
          isAvailable: seat.isAvailable,
          isBooked: !seat.isAvailable, // Nếu không available thì đã được đặt
          price: 0 // Mặc định giá 0
        }));
      })
      .addCase(fetchSeatsByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearSeats,
  clearError
} = seatSlice.actions;

export default seatSlice.reducer;
