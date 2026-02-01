import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [] }) {
  return (
    <div className="notification-items">
      <button
        aria-label="Close"
        style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="Close" />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            type={notif.type}
            html={notif.html}
            value={notif.value}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
