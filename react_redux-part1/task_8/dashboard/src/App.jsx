import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import { fetchNotifications } from './features/notifications/notificationsSlice';
import { fetchCourses } from './features/courses/coursesSlice';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div style={{ position: 'relative', padding: '0 0.75rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="root-notifications" style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <Notifications />
      </div>
      <div style={{ flex: 1 }}>
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </div>
      <Footer />
    </div>
  );
}

export default App;
