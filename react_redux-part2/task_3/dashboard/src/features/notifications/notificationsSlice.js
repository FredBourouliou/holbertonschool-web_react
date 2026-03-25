import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get('/notifications.json');
    return response.data
      .filter((n) => n.context.isRead === false)
      .map((n) => ({
        id: n.id,
        type: n.context.type,
        isRead: n.context.isRead,
        value: n.context.value,
      }));
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    markNotificationAsRead(state, action) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setNotifications, markNotificationAsRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
