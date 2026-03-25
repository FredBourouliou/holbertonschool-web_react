import authReducer, { login, logout } from '../auth/authSlice';

const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

test('returns the correct initial state by default', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(initialState);
});

test('updates state correctly when login action is dispatched', () => {
  const state = authReducer(
    initialState,
    login({ email: 'test@example.com', password: 'password123' })
  );
  expect(state.user.email).toBe('test@example.com');
  expect(state.user.password).toBe('password123');
  expect(state.user.isLoggedIn).toBe(true);
});

test('resets state correctly when logout action is dispatched', () => {
  const loggedInState = {
    user: {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: true,
    },
  };
  const state = authReducer(loggedInState, logout());
  expect(state.user.email).toBe('');
  expect(state.user.password).toBe('');
  expect(state.user.isLoggedIn).toBe(false);
});
