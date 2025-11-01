import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminDashboardService from '../../services/adminDashboardService';

// Fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  'adminDashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminDashboardService.getStats();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải thống kê dashboard');
    }
  }
);

// Fetch recent bookings
export const fetchRecentBookings = createAsyncThunk(
  'adminDashboard/fetchRecentBookings',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const data = await adminDashboardService.getRecentBookings(limit);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải đặt chỗ gần đây');
    }
  }
);

// Fetch recent events
export const fetchRecentEvents = createAsyncThunk(
  'adminDashboard/fetchRecentEvents',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const data = await adminDashboardService.getRecentEvents(limit);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải sự kiện gần đây');
    }
  }
);

const initialState = {
  stats: null,
  recentBookings: [],
  recentEvents: [],
  loading: false,
  statsLoading: false,
  bookingsLoading: false,
  eventsLoading: false,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      })

      // Fetch recent bookings
      .addCase(fetchRecentBookings.pending, (state) => {
        state.bookingsLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false;
        state.recentBookings = action.payload || [];
      })
      .addCase(fetchRecentBookings.rejected, (state, action) => {
        state.bookingsLoading = false;
        state.error = action.payload;
      })

      // Fetch recent events
      .addCase(fetchRecentEvents.pending, (state) => {
        state.eventsLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.recentEvents = action.payload || [];
      })
      .addCase(fetchRecentEvents.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;

