import { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import { getFilteredNotifications } from '../../features/selectors/notificationsSelector';

function Notifications({
  notifications = [],
  loading = false,
  markNotificationAsRead = () => {},
}) {
  const DrawerRef = useRef(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleToggleDrawer = () => {
    if (DrawerRef.current) {
      const visibleClassName = css(styles.visible);
      DrawerRef.current.classList.toggle(visibleClassName);
    }
  };

  const handleSetFilterUrgent = () => {
    setCurrentFilter(currentFilter === 'urgent' ? 'all' : 'urgent');
  };

  const handleSetFilterDefault = () => {
    setCurrentFilter(currentFilter === 'default' ? 'all' : 'default');
  };

  const filteredNotifications = getFilteredNotifications(notifications, currentFilter);

  return (
    <div style={{ width: '100%' }}>
      <div
        className="notification-title"
        style={{
          textAlign: 'right',
          paddingRight: '0.75rem',
          paddingTop: '0.25rem',
          cursor: 'pointer',
        }}
        onClick={handleToggleDrawer}
      >
        Your notifications
      </div>
      <div
        ref={DrawerRef}
        className={css(styles.notificationDrawer)}
        data-testid="notification-drawer"
      >
        <div style={{ position: 'relative' }}>
          {loading ? (
            <p>Loading...</p>
          ) : filteredNotifications.length === 0 ? (
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
                onClick={handleToggleDrawer}
              >
                <img
                  src={closeIcon}
                  alt="Close"
                  style={{ width: '0.75rem', height: '0.75rem' }}
                />
              </button>
              <div style={{ marginBottom: '0.5rem' }}>
                <button
                  data-testid="filter-urgent"
                  onClick={handleSetFilterUrgent}
                  style={{
                    cursor: 'pointer',
                    marginRight: '0.25rem',
                    fontWeight: currentFilter === 'urgent' ? 'bold' : 'normal',
                  }}
                >
                  ‼️
                </button>
                <button
                  data-testid="filter-default"
                  onClick={handleSetFilterDefault}
                  style={{
                    cursor: 'pointer',
                    fontWeight: currentFilter === 'default' ? 'bold' : 'normal',
                  }}
                >
                  💬
                </button>
              </div>
              <ul
                style={{ listStyleType: 'square', paddingLeft: '1.25rem' }}
              >
                {filteredNotifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    id={notif.id}
                    type={notif.type}
                    value={notif.value}
                    markAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  notificationDrawer: {
    position: 'relative',
    border: '3px dotted #e1003c',
    width: '25rem',
    padding: '0.5rem',
    right: '0.75rem',
    float: 'right',
    marginTop: '0.25rem',
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.string,
      isRead: PropTypes.bool,
    })
  ),
  loading: PropTypes.bool,
  markNotificationAsRead: PropTypes.func,
};

export default memo(Notifications);
