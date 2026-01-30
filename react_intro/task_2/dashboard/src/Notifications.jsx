import './Notifications.css';
import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils';

function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  );
}

export default Notifications;
