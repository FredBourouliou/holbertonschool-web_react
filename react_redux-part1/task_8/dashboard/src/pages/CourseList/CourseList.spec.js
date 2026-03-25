import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import CourseList from './CourseList';
import authReducer, { logout } from '../../features/auth/authSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';
import coursesReducer, { fetchCourses } from '../../features/courses/coursesSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: { auth: authReducer, notifications: notificationsReducer, courses: coursesReducer },
    preloadedState,
  });
}

afterEach(() => {
  mockAxios.reset();
});

test('fetches courses and displays the courses list', async () => {
  const mockCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];
  mockAxios.get.mockResolvedValueOnce({ data: mockCourses });

  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  await store.dispatch(fetchCourses());
  render(<Provider store={store}><CourseList /></Provider>);

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('Webpack')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getAllByRole('row')).toHaveLength(5);
});

test('logout resets the courses array', async () => {
  const mockCourses = [{ id: 1, name: 'ES6', credit: 60 }];
  mockAxios.get.mockResolvedValueOnce({ data: mockCourses });

  const store = createTestStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });

  await store.dispatch(fetchCourses());
  expect(store.getState().courses.courses).toHaveLength(1);

  store.dispatch(logout());
  render(<Provider store={store}><CourseList /></Provider>);

  expect(store.getState().courses.courses).toHaveLength(0);
  expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
});
