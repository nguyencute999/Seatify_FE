import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminNewsService from '../../services/adminNewsService';

export const adminFetchNews = createAsyncThunk(
  'adminNews/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load news');
    }
  }
);

export const adminFetchNewsById = createAsyncThunk(
  'adminNews/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.getById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load news detail');
    }
  }
);

export const adminCreateNews = createAsyncThunk(
  'adminNews/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.create(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create news');
    }
  }
);

export const adminUpdateNews = createAsyncThunk(
  'adminNews/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.update(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update news');
    }
  }
);

export const adminDeleteNews = createAsyncThunk(
  'adminNews/delete',
  async (id, { rejectWithValue }) => {
    try {
      await adminNewsService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete news');
    }
  }
);

export const adminPublishNews = createAsyncThunk(
  'adminNews/publish',
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.publish(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to publish news');
    }
  }
);

export const adminUnpublishNews = createAsyncThunk(
  'adminNews/unpublish',
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminNewsService.unpublish(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to unpublish news');
    }
  }
);

const initialState = {
  items: [],
  current: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  pagination: { number: 0, totalPages: 0, totalElements: 0, size: 10 },
};

const adminNewsSlice = createSlice({
  name: 'adminNews',
  initialState,
  reducers: {
    clearAdminNewsError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminFetchNews.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(adminFetchNews.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.items = payload.content || payload || [];
        state.pagination = {
          number: payload.number ?? 0,
          totalPages: payload.totalPages ?? 1,
          totalElements: payload.totalElements ?? (Array.isArray(payload) ? payload.length : 0),
          size: payload.size ?? 10,
        };
      })
      .addCase(adminFetchNews.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })

      .addCase(adminFetchNewsById.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(adminFetchNewsById.fulfilled, (state, action) => {
        state.loading = false; state.current = action.payload;
      })
      .addCase(adminFetchNewsById.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })

      .addCase(adminCreateNews.pending, (state) => { state.createLoading = true; state.error = null; })
      .addCase(adminCreateNews.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.unshift(action.payload);
        state.pagination.totalElements += 1;
      })
      .addCase(adminCreateNews.rejected, (state, action) => { state.createLoading = false; state.error = action.payload; })

      .addCase(adminUpdateNews.pending, (state) => { state.updateLoading = true; state.error = null; })
      .addCase(adminUpdateNews.fulfilled, (state, action) => {
        state.updateLoading = false;
        const idx = state.items.findIndex(n => n.newsId === action.payload.newsId);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.current?.newsId === action.payload.newsId) state.current = action.payload;
      })
      .addCase(adminUpdateNews.rejected, (state, action) => { state.updateLoading = false; state.error = action.payload; })

      .addCase(adminDeleteNews.pending, (state) => { state.deleteLoading = true; state.error = null; })
      .addCase(adminDeleteNews.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter(n => n.newsId !== action.payload);
        state.pagination.totalElements -= 1;
        if (state.current?.newsId === action.payload) state.current = null;
      })
      .addCase(adminDeleteNews.rejected, (state, action) => { state.deleteLoading = false; state.error = action.payload; })

      .addCase(adminPublishNews.fulfilled, (state, action) => {
        const idx = state.items.findIndex(n => n.newsId === action.payload.newsId);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.current?.newsId === action.payload.newsId) state.current = action.payload;
      })
      .addCase(adminPublishNews.rejected, (state, action) => { state.error = action.payload; })

      .addCase(adminUnpublishNews.fulfilled, (state, action) => {
        const idx = state.items.findIndex(n => n.newsId === action.payload.newsId);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.current?.newsId === action.payload.newsId) state.current = action.payload;
      })
      .addCase(adminUnpublishNews.rejected, (state, action) => { state.error = action.payload; });
  }
});

export const { clearAdminNewsError } = adminNewsSlice.actions;
export default adminNewsSlice.reducer;


