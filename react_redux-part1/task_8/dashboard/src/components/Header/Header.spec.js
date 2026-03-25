import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer, { login } from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState,
  });
}

test('logout link is displayed when isLoggedIn is true', () => {
  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Header /></Provider>);
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('displays welcome message with email after login dispatch', () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  store.dispatch(login({ email: 'test@example.com', password: 'password123' }));
  render(<Provider store={store}><Header /></Provider>);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
});

test('clicking logout sets isLoggedIn to false', async () => {
  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  const user = userEvent.setup();
  render(<Provider store={store}><Header /></Provider>);

  await user.click(screen.getByText(/logout/i));
  expect(store.getState().auth.user.isLoggedIn).toBe(false);
});
