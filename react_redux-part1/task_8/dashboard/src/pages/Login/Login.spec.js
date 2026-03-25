import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer from '../../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState,
  });
}

const defaultState = {
  auth: { user: { email: '', password: '', isLoggedIn: false } },
  notifications: { notifications: [], displayDrawer: true },
  courses: { courses: [] },
};

test('renders the login form with email, password fields, and submit button', () => {
  const store = createTestStore(defaultState);
  render(<Provider store={store}><Login /></Provider>);
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('form submission with valid credentials sets isLoggedIn to true', async () => {
  const store = createTestStore(defaultState);
  const user = userEvent.setup();
  render(<Provider store={store}><Login /></Provider>);

  await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'longpassword');
  await user.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth.user.isLoggedIn).toBe(true);
});

test('form submission with invalid credentials keeps isLoggedIn false', async () => {
  const store = createTestStore(defaultState);
  const user = userEvent.setup();
  render(<Provider store={store}><Login /></Provider>);

  await user.type(screen.getByRole('textbox', { name: /email/i }), 'bad');
  await user.type(screen.getByLabelText(/password/i), 'short');

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  expect(store.getState().auth.user.isLoggedIn).toBe(false);
});
