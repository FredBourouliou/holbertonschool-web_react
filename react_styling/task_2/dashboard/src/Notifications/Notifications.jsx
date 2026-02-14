import { Component } from 'react';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.notifications.length !== this.props.notifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    );
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer = false, notifications = [] } = this.props;

    return (
      <>
        <div className="notification-title text-right mb-2">
          <p className="cursor-pointer bg-[#fff8f8] py-2 px-4 inline-block">Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="notification-items border-2 border-dashed border-main p-1.5 relative w-1/4 ml-auto mb-4">
            <button
              aria-label="Close"
              className="absolute top-4 right-4 bg-transparent border-none cursor-pointer"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="Close" />
            </button>
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      html={notif.html}
                      value={notif.value}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
