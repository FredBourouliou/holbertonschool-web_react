import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import App from '../App';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import coursesReducer from '../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      notifications: notificationsReducer,
      courses: coursesReducer,
    },
    preloadedState,
  });
}

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

beforeEach(() => {
  mockAxios.get.mockImplementation((url) => {
    if (url.includes('notifications.json')) {
      return Promise.resolve({ data: mockNotifications });
    }
    if (url.includes('courses.json')) {
      return Promise.resolve({ data: [{ id: 1, name: 'ES6', credit: 60 }] });
    }
    return Promise.reject(new Error('Unexpected URL'));
  });
});

afterEach(() => {
  mockAxios.reset();
});

test('when isLoggedIn is false, renders Login component', async () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><App /></Provider>);
  await waitFor(() => {
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });
});

test('when isLoggedIn is true, renders CourseList component', async () => {
  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [{ id: 1, name: 'ES6', credit: 60 }] },
  });
  render(<Provider store={store}><App /></Provider>);
  await waitFor(() => {
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });
});

test('fetches notifications on mount and displays them', async () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><App /></Provider>);
  await waitFor(() => {
    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
  });
});
