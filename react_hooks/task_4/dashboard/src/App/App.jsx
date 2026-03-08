import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext from '../Context/context';

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        if (!cancelled) {
          const data = response.data.map((n) => ({
            ...n,
            html: n.html
              ? (typeof n.html === 'object' ? n.html : { __html: n.html })
              : undefined,
          }));
          setNotifications(data);
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
            setCourses(response.data);
          }
        } catch (error) {
          if (!cancelled) console.error(error);
        }
      } else {
        setCourses([]);
      }
    };
    fetchCourses();
    return () => { cancelled = true; };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const contextValue = { user, logOut };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ position: 'relative', padding: '0 0.75rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="root-notifications" style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
          <Notifications
            displayDrawer={displayDrawer}
            notifications={notifications}
            handleDisplayDrawer={handleDisplayDrawer}
            handleHideDrawer={handleHideDrawer}
            markNotificationAsRead={markNotificationAsRead}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Header />
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
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
