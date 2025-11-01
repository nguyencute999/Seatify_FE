import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminReportService from '../../services/adminReportService';

// Fetch overview stats
export const fetchOverviewStats = createAsyncThunk(
  'adminReport/fetchOverviewStats',
  async ({ startDate, endDate, eventId = null }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getOverviewStats(startDate, endDate, eventId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải thống kê tổng quan');
    }
  }
);

// Fetch event stats
export const fetchEventStats = createAsyncThunk(
  'adminReport/fetchEventStats',
  async ({ startDate, endDate, eventId = null }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getEventStats(startDate, endDate, eventId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải thống kê sự kiện');
    }
  }
);

// Fetch user stats
export const fetchUserStats = createAsyncThunk(
  'adminReport/fetchUserStats',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getUserStats(startDate, endDate);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải thống kê người dùng');
    }
  }
);

// Fetch booking trends
export const fetchBookingTrends = createAsyncThunk(
  'adminReport/fetchBookingTrends',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getBookingTrends(startDate, endDate);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải xu hướng đặt chỗ');
    }
  }
);

// Fetch attendance data
export const fetchAttendanceData = createAsyncThunk(
  'adminReport/fetchAttendanceData',
  async ({ startDate, endDate, eventId = null }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getAttendanceData(startDate, endDate, eventId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải dữ liệu tỷ lệ tham gia');
    }
  }
);

// Fetch revenue stats
export const fetchRevenueStats = createAsyncThunk(
  'adminReport/fetchRevenueStats',
  async ({ startDate, endDate, eventId = null }, { rejectWithValue }) => {
    try {
      const data = await adminReportService.getRevenueStats(startDate, endDate, eventId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi khi tải thống kê doanh thu');
    }
  }
);

const initialState = {
  overviewStats: null,
  eventStats: [],
  userStats: [],
  bookingTrends: [],
  attendanceData: [],
  revenueStats: [],
  
  // Loading states
  overviewStatsLoading: false,
  eventStatsLoading: false,
  userStatsLoading: false,
  bookingTrendsLoading: false,
  attendanceDataLoading: false,
  revenueStatsLoading: false,
  
  // Error states
  error: null,
};

const adminReportSlice = createSlice({
  name: 'adminReport',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAllData: (state) => {
      state.overviewStats = null;
      state.eventStats = [];
      state.userStats = [];
      state.bookingTrends = [];
      state.attendanceData = [];
      state.revenueStats = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch overview stats
      .addCase(fetchOverviewStats.pending, (state) => {
        state.overviewStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.overviewStatsLoading = false;
        state.overviewStats = action.payload;
      })
      .addCase(fetchOverviewStats.rejected, (state, action) => {
        state.overviewStatsLoading = false;
        state.error = action.payload;
      })

      // Fetch event stats
      .addCase(fetchEventStats.pending, (state) => {
        state.eventStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchEventStats.fulfilled, (state, action) => {
        state.eventStatsLoading = false;
        state.eventStats = action.payload || [];
      })
      .addCase(fetchEventStats.rejected, (state, action) => {
        state.eventStatsLoading = false;
        state.error = action.payload;
      })

      // Fetch user stats
      .addCase(fetchUserStats.pending, (state) => {
        state.userStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.userStatsLoading = false;
        state.userStats = action.payload || [];
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.userStatsLoading = false;
        state.error = action.payload;
      })

      // Fetch booking trends
      .addCase(fetchBookingTrends.pending, (state) => {
        state.bookingTrendsLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingTrends.fulfilled, (state, action) => {
        state.bookingTrendsLoading = false;
        state.bookingTrends = action.payload || [];
      })
      .addCase(fetchBookingTrends.rejected, (state, action) => {
        state.bookingTrendsLoading = false;
        state.error = action.payload;
      })

      // Fetch attendance data
      .addCase(fetchAttendanceData.pending, (state) => {
        state.attendanceDataLoading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceData.fulfilled, (state, action) => {
        state.attendanceDataLoading = false;
        state.attendanceData = action.payload || [];
      })
      .addCase(fetchAttendanceData.rejected, (state, action) => {
        state.attendanceDataLoading = false;
        state.error = action.payload;
      })

      // Fetch revenue stats
      .addCase(fetchRevenueStats.pending, (state) => {
        state.revenueStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchRevenueStats.fulfilled, (state, action) => {
        state.revenueStatsLoading = false;
        state.revenueStats = action.payload || [];
      })
      .addCase(fetchRevenueStats.rejected, (state, action) => {
        state.revenueStatsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearAllData } = adminReportSlice.actions;
export default adminReportSlice.reducer;

