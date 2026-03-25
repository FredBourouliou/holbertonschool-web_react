import { createSelector } from '@reduxjs/toolkit';

const getNotifications = (notifications) => notifications;
const getFilter = (_notifications, filter) => filter;

export const getFilteredNotifications = createSelector(
  [getNotifications, getFilter],
  (notifications, filter) => {
    if (filter === 'all') return notifications;
    return notifications.filter((n) => n.type === filter);
  }
);
