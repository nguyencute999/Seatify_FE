import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';
import adminEventService from '../../services/adminEventService';
import userEventService from '../../services/userEventService';

// Helper functions for filtering events
const getFeaturedEvents = (events) => {
  return events.filter(event => event.featured === true);
};

const getUpcomingEvents = (events) => {
  const now = new Date();
  return events.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate > now && event.status === 'UPCOMING';
  });
};

const getOngoingEvents = (events) => {
  const now = new Date();
  return events.filter(event => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    return startDate <= now && endDate >= now && event.status === 'ONGOING';
  });
};

const getFinishedEvents = (events) => {
  const now = new Date();
  return events.filter(event => {
    const eventDate = new Date(event.endTime);
    return eventDate < now || event.status === 'FINISHED';
  });
};

// Async thunks for API calls
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await userEventService.getAllEvents(params);
      return response; // expect Spring Page
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

// Admin Events API calls
export const fetchAdminEvents = createAsyncThunk(
  'events/fetchAdminEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await adminEventService.getAllEvents(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin events');
    }
  }
);

export const fetchAdminEventById = createAsyncThunk(
  'events/fetchAdminEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await adminEventService.getEventById(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

export const createAdminEvent = createAsyncThunk(
  'events/createAdminEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await adminEventService.createEvent(eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateAdminEvent = createAsyncThunk(
  'events/updateAdminEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await adminEventService.updateEvent(eventId, eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteAdminEvent = createAsyncThunk(
  'events/deleteAdminEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await adminEventService.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await userEventService.getEventById(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await api.delete(`/events/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

const initialState = {
  events: [],
  featuredEvents: [],
  upcomingEvents: [],
  ongoingEvents: [],
  finishedEvents: [],
  currentEvent: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6
  },
  // Admin events state
  adminEvents: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      size: 10
    }
  }
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    updateEventStatus: (state, action) => {
      const { eventId, status } = action.payload;
      const event = state.events.find(e => e.eventId === eventId);
      if (event) {
        event.status = status;
        event.updatedAt = new Date().toISOString();
      }
    },
    // Admin events reducers
    clearAdminError: (state) => {
      state.adminEvents.error = null;
    },
    setAdminPagination: (state, action) => {
      state.adminEvents.pagination = { ...state.adminEvents.pagination, ...action.payload };
    },
    updateAdminEventStatus: (state, action) => {
      const { eventId, status } = action.payload;
      const event = state.adminEvents.data.find(e => e.eventId === eventId);
      if (event) {
        event.status = status;
        event.updatedAt = new Date().toISOString();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        const page = action.payload || {};
        const content = page.content || [];
        state.events = content;
        state.featuredEvents = getFeaturedEvents(content);
        state.upcomingEvents = getUpcomingEvents(content);
        state.ongoingEvents = getOngoingEvents(content);
        state.finishedEvents = getFinishedEvents(content);
        // pagination from backend (0-based index)
        if (page.totalPages !== undefined) {
          state.pagination = {
            currentPage: (page.number ?? 0) + 1,
            totalPages: page.totalPages ?? 1,
            totalItems: page.totalElements ?? content.length,
            itemsPerPage: page.size ?? state.pagination.itemsPerPage
          };
        } else {
          state.pagination.totalItems = content.length;
          state.pagination.totalPages = Math.ceil(content.length / state.pagination.itemsPerPage);
        }
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.unshift(action.payload);
        // Update filtered lists
        state.featuredEvents = getFeaturedEvents(state.events);
        state.upcomingEvents = getUpcomingEvents(state.events);
        state.ongoingEvents = getOngoingEvents(state.events);
        state.finishedEvents = getFinishedEvents(state.events);
        state.pagination.totalItems = state.events.length;
        state.pagination.totalPages = Math.ceil(state.events.length / state.pagination.itemsPerPage);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(e => e.eventId === action.payload.eventId);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        // Update filtered lists
        state.featuredEvents = getFeaturedEvents(state.events);
        state.upcomingEvents = getUpcomingEvents(state.events);
        state.ongoingEvents = getOngoingEvents(state.events);
        state.finishedEvents = getFinishedEvents(state.events);
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(e => e.eventId !== action.payload);
        // Update filtered lists
        state.featuredEvents = getFeaturedEvents(state.events);
        state.upcomingEvents = getUpcomingEvents(state.events);
        state.ongoingEvents = getOngoingEvents(state.events);
        state.finishedEvents = getFinishedEvents(state.events);
        state.pagination.totalItems = state.events.length;
        state.pagination.totalPages = Math.ceil(state.events.length / state.pagination.itemsPerPage);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Admin Events - Fetch All
      .addCase(fetchAdminEvents.pending, (state) => {
        state.adminEvents.loading = true;
        state.adminEvents.error = null;
      })
      .addCase(fetchAdminEvents.fulfilled, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.data = action.payload.content || action.payload;
        if (action.payload.totalPages !== undefined) {
          state.adminEvents.pagination = {
            currentPage: action.payload.number || 0,
            totalPages: action.payload.totalPages || 0,
            totalItems: action.payload.totalElements || 0,
            size: action.payload.size || 10
          };
        }
      })
      .addCase(fetchAdminEvents.rejected, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.error = action.payload;
      })
      
      // Admin Events - Fetch by ID
      .addCase(fetchAdminEventById.pending, (state) => {
        state.adminEvents.loading = true;
        state.adminEvents.error = null;
      })
      .addCase(fetchAdminEventById.fulfilled, (state, action) => {
        state.adminEvents.loading = false;
        // Update the event in the list if it exists
        const index = state.adminEvents.data.findIndex(e => e.eventId === action.payload.eventId);
        if (index !== -1) {
          state.adminEvents.data[index] = action.payload;
        }
      })
      .addCase(fetchAdminEventById.rejected, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.error = action.payload;
      })
      
      // Admin Events - Create
      .addCase(createAdminEvent.pending, (state) => {
        state.adminEvents.loading = true;
        state.adminEvents.error = null;
      })
      .addCase(createAdminEvent.fulfilled, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.data.unshift(action.payload);
        state.adminEvents.pagination.totalItems += 1;
      })
      .addCase(createAdminEvent.rejected, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.error = action.payload;
      })
      
      // Admin Events - Update
      .addCase(updateAdminEvent.pending, (state) => {
        state.adminEvents.loading = true;
        state.adminEvents.error = null;
      })
      .addCase(updateAdminEvent.fulfilled, (state, action) => {
        state.adminEvents.loading = false;
        const index = state.adminEvents.data.findIndex(e => e.eventId === action.payload.eventId);
        if (index !== -1) {
          state.adminEvents.data[index] = action.payload;
        }
      })
      .addCase(updateAdminEvent.rejected, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.error = action.payload;
      })
      
      // Admin Events - Delete
      .addCase(deleteAdminEvent.pending, (state) => {
        state.adminEvents.loading = true;
        state.adminEvents.error = null;
      })
      .addCase(deleteAdminEvent.fulfilled, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.data = state.adminEvents.data.filter(e => e.eventId !== action.payload);
        state.adminEvents.pagination.totalItems -= 1;
      })
      .addCase(deleteAdminEvent.rejected, (state, action) => {
        state.adminEvents.loading = false;
        state.adminEvents.error = action.payload;
      });
  }
});

export const { 
  clearError, 
  clearCurrentEvent, 
  setPagination, 
  updateEventStatus,
  clearAdminError,
  setAdminPagination,
  updateAdminEventStatus
} = eventSlice.actions;

export default eventSlice.reducer;
