import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventCommentService from '../../services/eventCommentService';

// Async thunks
export const fetchCommentsByEventId = createAsyncThunk(
  'comments/fetchCommentsByEventId',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventCommentService.getCommentsByEventId(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await eventCommentService.createComment(commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, commentData }, { rejectWithValue }) => {
    try {
      const response = await eventCommentService.updateComment(commentId, commentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await eventCommentService.deleteComment(commentId);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

export const fetchMyComments = createAsyncThunk(
  'comments/fetchMyComments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventCommentService.getMyComments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch my comments');
    }
  }
);

const initialState = {
  comments: [], // Comments for current event
  myComments: [], // All comments by current user
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

const eventCommentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearComments: (state) => {
      state.comments = [];
    },
    clearMyComments: (state) => {
      state.myComments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments by event ID
      .addCase(fetchCommentsByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByEventId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCommentsByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create comment
      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.createLoading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.comments.findIndex(c => c.commentId === action.payload.commentId);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.comments = state.comments.filter(c => c.commentId !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // Fetch my comments
      .addCase(fetchMyComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyComments.fulfilled, (state, action) => {
        state.loading = false;
        state.myComments = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMyComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearComments, clearMyComments } = eventCommentSlice.actions;
export default eventCommentSlice.reducer;

