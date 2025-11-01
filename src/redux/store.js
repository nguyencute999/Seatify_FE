import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import eventReducer from './event/eventSlice';
import userReducer from './user/userSlice';
import seatReducer from './seat/seatSlice';
import bookingReducer from './booking/bookingSlice';
import newsReducer from './news/newsSlice';
import adminBookingReducer from './booking/adminBookingSlice';
import adminUserReducer from './user/adminUserSlice';
import adminNewsReducer from './news/adminNewsSlice';
import adminDashboardReducer from './admin/adminDashboardSlice';
import adminReportReducer from './admin/adminReportSlice';
import commentReducer from './comment/eventCommentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    user: userReducer,
    seats: seatReducer,
    booking: bookingReducer,
    news: newsReducer,
    adminBookings: adminBookingReducer,
    adminUsers: adminUserReducer,
    adminNews: adminNewsReducer,
    adminDashboard: adminDashboardReducer,
    adminReport: adminReportReducer,
    comments: commentReducer,
  },
});
