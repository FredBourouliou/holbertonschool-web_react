import mockAxios from 'jest-mock-axios';
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import authReducer, { logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

const initialState = {
  courses: [],
};

test('returns the correct initial state by default', () => {
  const state = coursesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState);
});

test('fetches courses data correctly', async () => {
  const mockCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  mockAxios.get.mockResolvedValueOnce({ data: mockCourses });

  const store = configureStore({ reducer: { courses: coursesReducer } });
  await store.dispatch(fetchCourses());

  const state = store.getState().courses;
  expect(state.courses).toHaveLength(3);
  expect(state.courses).toEqual(mockCourses);
});

test('resets courses array when logout action is dispatched', async () => {
  const mockCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
  ];

  mockAxios.get.mockResolvedValueOnce({ data: mockCourses });

  const store = configureStore({
    reducer: { courses: coursesReducer, auth: authReducer },
  });

  await store.dispatch(fetchCourses());
  expect(store.getState().courses.courses).toHaveLength(2);

  store.dispatch(logout());
  expect(store.getState().courses.courses).toEqual([]);
});
