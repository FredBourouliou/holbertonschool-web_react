import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import { getCurrentYear } from '../../utils/utils';
import authReducer from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState,
  });
}

test('Footer renders Copyright {year} - Holberton School', () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Footer /></Provider>);
  const year = getCurrentYear();
  expect(screen.getByText(`Copyright ${year} - Holberton School`)).toBeInTheDocument();
});

test('Contact us link is displayed when isLoggedIn is true', () => {
  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Footer /></Provider>);
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test('Contact us link is not displayed when isLoggedIn is false', () => {
  const store = createTestStore({
    auth: { user: { email: '', password: '', isLoggedIn: false } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(<Provider store={store}><Footer /></Provider>);
  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});
