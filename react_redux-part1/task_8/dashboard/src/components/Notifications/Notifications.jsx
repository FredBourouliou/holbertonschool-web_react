import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../../features/notifications/notificationsSlice';

function Notifications() {
  const { notifications, displayDrawer } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  const handleDisplayDrawer = () => {
    dispatch(showDrawer());
  };

  const handleHideDrawer = () => {
    dispatch(hideDrawer());
  };

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        className="notification-title"
        style={{ textAlign: 'right', paddingRight: '0.75rem', paddingTop: '0.25rem', cursor: 'pointer' }}
        onClick={handleDisplayDrawer}
      >
        Your notifications
      </div>
      {displayDrawer && (
        <div
          className="notification-items"
          style={{
            position: 'relative',
            border: '3px dotted #e1003c',
            width: '25rem',
            padding: '0.5rem',
            right: '0.75rem',
            float: 'right',
            marginTop: '0.25rem',
          }}
        >
          <div style={{ position: 'relative' }}>
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p style={{ margin: 0 }}>Here is the list of notifications</p>
                <button
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    right: 0,
                    top: 0,
                    background: 'transparent',
                    border: 'none',
                  }}
                  onClick={handleHideDrawer}
                >
                  <img src={closeIcon} alt="Close" style={{ width: '0.75rem', height: '0.75rem' }} />
                </button>
                <ul style={{ listStyleType: 'square', paddingLeft: '1.25rem' }}>
                  {notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      html={notif.html}
                      value={notif.value}
                      markAsRead={handleMarkAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Notifications);
