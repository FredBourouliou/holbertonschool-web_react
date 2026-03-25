import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

afterEach(() => {
  mockAxios.reset();
});

const initialState = {
  notifications: [],
  displayDrawer: true,
};

test('returns the correct initial state by default', () => {
  const state = notificationsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState);
});

test('fetches notifications data correctly', async () => {
  const mockData = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
  ];

  mockAxios.get.mockResolvedValueOnce({ data: mockData });

  const store = configureStore({ reducer: { notifications: notificationsReducer } });
  await store.dispatch(fetchNotifications());

  const state = store.getState().notifications;
  expect(state.notifications).toHaveLength(3);
  expect(state.notifications[0]).toEqual({ id: 1, type: 'default', value: 'New course available' });
  expect(state.notifications[1]).toEqual({ id: 2, type: 'urgent', value: 'New resume available' });
  expect(state.notifications[2]).toEqual({
    id: 3,
    type: 'urgent',
    html: { __html: getLatestNotification() },
  });
});

test('removes a notification correctly when markNotificationAsRead is dispatched', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const stateWithNotifications = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ],
    displayDrawer: true,
  };

  const state = notificationsReducer(stateWithNotifications, markNotificationAsRead(1));

  expect(state.notifications).toHaveLength(1);
  expect(state.notifications[0].id).toBe(2);
  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

  consoleSpy.mockRestore();
});

test('toggles displayDrawer correctly with showDrawer and hideDrawer', () => {
  const stateHidden = notificationsReducer(initialState, hideDrawer());
  expect(stateHidden.displayDrawer).toBe(false);

  const stateShown = notificationsReducer(stateHidden, showDrawer());
  expect(stateShown.displayDrawer).toBe(true);
});
