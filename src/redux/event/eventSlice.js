import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockEvents, getFeaturedEvents, getUpcomingEvents, getOngoingEvents, getFinishedEvents } from '../../data/mockEvents';
import api from '../../services/apiService';

// Async thunks for API calls (sẽ được implement sau)
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.get('/events');
      // return response.data;
      
      // Tạm thời return mock data
      return mockEvents;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.get(`/events/${eventId}`);
      // return response.data;
      
      // Tạm thời return mock data
      const event = mockEvents.find(e => e.event_id === parseInt(eventId));
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch event');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.post('/events', eventData);
      // return response.data;
      
      // Tạm thời return mock data
      const newEvent = {
        event_id: mockEvents.length + 1,
        ...eventData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 1 // Mock user ID
      };
      return newEvent;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await api.put(`/events/${eventId}`, eventData);
      // return response.data;
      
      // Tạm thời return mock data
      const eventIndex = mockEvents.findIndex(e => e.event_id === parseInt(eventId));
      if (eventIndex === -1) {
        throw new Error('Event not found');
      }
      
      const updatedEvent = {
        ...mockEvents[eventIndex],
        ...eventData,
        updated_at: new Date().toISOString()
      };
      return updatedEvent;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      // TODO: Thay thế bằng API call thực tế
      // await api.delete(`/events/${eventId}`);
      // return eventId;
      
      // Tạm thời return mock data
      const event = mockEvents.find(e => e.event_id === parseInt(eventId));
      if (!event) {
        throw new Error('Event not found');
      }
      return eventId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete event');
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
      const event = state.events.find(e => e.event_id === eventId);
      if (event) {
        event.status = status;
        event.updated_at = new Date().toISOString();
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
        state.events = action.payload;
        state.featuredEvents = getFeaturedEvents(action.payload);
        state.upcomingEvents = getUpcomingEvents(action.payload);
        state.ongoingEvents = getOngoingEvents(action.payload);
        state.finishedEvents = getFinishedEvents(action.payload);
        state.pagination.totalItems = action.payload.length;
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
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
        const index = state.events.findIndex(e => e.event_id === action.payload.event_id);
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
        state.events = state.events.filter(e => e.event_id !== action.payload);
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
      });
  }
});

export const { 
  clearError, 
  clearCurrentEvent, 
  setPagination, 
  updateEventStatus 
} = eventSlice.actions;

export default eventSlice.reducer;
