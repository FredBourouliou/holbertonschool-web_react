export const APP_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_COURSES: 'SET_COURSES',
};

export const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  notifications: [],
  courses: [],
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.LOGIN:
      return {
        ...state,
        user: {
          email: action.email,
          password: action.password,
          isLoggedIn: true,
        },
      };
    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: {
          email: '',
          password: '',
          isLoggedIn: false,
        },
      };
    case APP_ACTIONS.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.id),
      };
    case APP_ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
      };
    case APP_ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: action.courses,
      };
    default:
      return state;
  }
}
