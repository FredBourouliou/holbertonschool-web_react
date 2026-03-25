import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import authReducer from '../../features/auth/authSlice';
import notificationsReducer, { fetchNotifications } from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState,
  });
}

const mockNotificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

afterEach(() => {
  mockAxios.reset();
});

test('fetches and displays notification items', async () => {
  mockAxios.get.mockResolvedValueOnce({ data: mockNotificationsData });
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  await store.dispatch(fetchNotifications());
  render(<Provider store={store}><Notifications /></Provider>);

  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});

test('closing the drawer sets displayDrawer to false', () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test' }],
      displayDrawer: true,
    },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Notifications /></Provider>);

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(store.getState().notifications.displayDrawer).toBe(false);
});

test('clicking Your notifications sets displayDrawer to true', () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test' }],
      displayDrawer: false,
    },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Notifications /></Provider>);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(store.getState().notifications.displayDrawer).toBe(true);
});

test('marking a notification as read removes it from the list', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
      displayDrawer: true,
    },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Notifications /></Provider>);

  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  fireEvent.click(screen.getByText(/new course available/i));

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
  consoleSpy.mockRestore();
});
