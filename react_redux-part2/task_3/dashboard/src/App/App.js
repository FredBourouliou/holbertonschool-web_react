import { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../components/Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user, notifications, courses } = state;

  useEffect(() => {
    let cancelled = false;
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        if (!cancelled) {
          const data = response.data
            .filter((n) => n.context.isRead === false)
            .map((n) => ({
              id: n.id,
              type: n.context.type,
              isRead: n.context.isRead,
              value: n.context.value,
            }));
          dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, notifications: data });
        }
      } catch (error) {
        if (!cancelled) console.error(error);
      }
    };
    fetchNotifications();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchCourses = async () => {
      if (user.isLoggedIn) {
        try {
          const response = await axios.get('/courses.json');
          if (!cancelled) {
            dispatch({ type: APP_ACTIONS.SET_COURSES, courses: response.data });
          }
        } catch (error) {
          if (!cancelled) console.error(error);
        }
      } else {
        dispatch({ type: APP_ACTIONS.SET_COURSES, courses: [] });
      }
    };
    fetchCourses();
    return () => { cancelled = true; };
  }, [user]);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, email, password });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, id });
  }, []);

  return (
    <div style={{ position: 'relative', padding: '0 0.75rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="root-notifications" style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <Notifications
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Header user={user} logOut={logOut} />
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </div>
      <Footer user={user} />
    </div>
  );
}

export default App;
