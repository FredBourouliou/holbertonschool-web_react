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
      <div className="w-full">
        <div className="notification-title text-right pr-3 pt-1">Your notifications</div>
        {displayDrawer && (
          <div className="notification-items relative border-[3px] border-dotted border-main w-100 p-2 right-3 float-right mt-1">
            <div className="relative">
              {notifications.length === 0 ? (
                <p>No new notification for now</p>
              ) : (
                <>
                  <p className="m-0">Here is the list of notifications</p>
                  <button
                    aria-label="Close"
                    className="absolute cursor-pointer right-0 top-0 bg-transparent border-none"
                    onClick={() => console.log('Close button has been clicked')}
                  >
                    <img src={closeIcon} alt="Close" className="w-3 h-3" />
                  </button>
                  <ul className="list-[square] pl-5">
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
          </div>
        )}
      </div>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
