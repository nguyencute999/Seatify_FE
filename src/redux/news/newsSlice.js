import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newsService from '../../services/newsService';

// Async thunks
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await newsService.getNews(page, size);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
    }
  }
);

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (newsId, { rejectWithValue }) => {
    try {
      const response = await newsService.getNewsById(newsId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch news details');
    }
  }
);

export const fetchNewsByEventId = createAsyncThunk(
  'news/fetchNewsByEventId',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await newsService.getNewsByEventId(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event news');
    }
  }
);

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await newsService.getLatestNews(limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch latest news');
    }
  }
);

export const createNews = createAsyncThunk(
  'news/createNews',
  async (newsData, { rejectWithValue }) => {
    try {
      const response = await newsService.createNews(newsData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create news');
    }
  }
);

export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ newsId, newsData }, { rejectWithValue }) => {
    try {
      const response = await newsService.updateNews(newsId, newsData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update news');
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (newsId, { rejectWithValue }) => {
    try {
      await newsService.deleteNews(newsId);
      return newsId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete news');
    }
  }
);

const initialState = {
  news: [],
  currentNews: null,
  latestNews: [],
  eventNews: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10
  },
  // Admin states
  adminLoading: false,
  adminError: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.adminError = null;
    },
    clearCurrentNews: (state) => {
      state.currentNews = null;
    },
    clearEventNews: (state) => {
      state.eventNews = [];
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetNewsState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch news
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.content || action.payload;
        state.pagination = {
          currentPage: action.payload.number || 0,
          totalPages: action.payload.totalPages || 1,
          totalElements: action.payload.totalElements || action.payload.length || 0,
          size: action.payload.size || 10
        };
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch news by ID
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch news by event ID
      .addCase(fetchNewsByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.eventNews = action.payload;
      })
      .addCase(fetchNewsByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch latest news
      .addCase(fetchLatestNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestNews.fulfilled, (state, action) => {
        state.loading = false;
        state.latestNews = action.payload;
      })
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create news
      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
        state.adminError = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.createLoading = false;
        state.news.unshift(action.payload);
        state.pagination.totalElements += 1;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.createLoading = false;
        state.adminError = action.payload;
      })

      // Update news
      .addCase(updateNews.pending, (state) => {
        state.updateLoading = true;
        state.adminError = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.news.findIndex(news => news.newsId === action.payload.newsId);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
        if (state.currentNews && state.currentNews.newsId === action.payload.newsId) {
          state.currentNews = action.payload;
        }
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.updateLoading = false;
        state.adminError = action.payload;
      })

      // Delete news
      .addCase(deleteNews.pending, (state) => {
        state.deleteLoading = true;
        state.adminError = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.news = state.news.filter(news => news.newsId !== action.payload);
        state.pagination.totalElements -= 1;
        if (state.currentNews && state.currentNews.newsId === action.payload) {
          state.currentNews = null;
        }
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.deleteLoading = false;
        state.adminError = action.payload;
      });
  }
});

export const {
  clearError,
  clearCurrentNews,
  clearEventNews,
  setCurrentPage,
  resetNewsState
} = newsSlice.actions;

export default newsSlice.reducer;
