import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
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
});

export const { setNotifications, markNotificationAsRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
