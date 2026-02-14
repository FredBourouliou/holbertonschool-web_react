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
        <div className="notification-title absolute right-3 top-1 whitespace-nowrap">Your notifications</div>
        {displayDrawer && (
          <div className="notification-items relative border-[3px] border-dotted border-main right-3 p-1.5 w-[380px] float-right mt-7 max-[912px]:w-full max-[912px]:fixed max-[912px]:top-0 max-[912px]:left-0 max-[912px]:right-0 max-[912px]:bottom-0 max-[912px]:z-50 max-[912px]:float-none max-[912px]:m-0 max-[912px]:p-3 max-[912px]:bg-white max-[912px]:overflow-y-hidden max-[912px]:h-screen">
            <div className="relative">
              {notifications.length === 0 ? (
                <p className="max-[912px]:text-[20px]">No new notification for now</p>
              ) : (
                <>
                  <p className="m-0 max-[912px]:text-[20px]">Here is the list of notifications</p>
                  <button
                    aria-label="Close"
                    className="absolute cursor-pointer right-0 top-0 bg-transparent border-none"
                    onClick={() => console.log('Close button has been clicked')}
                  >
                    <img src={closeIcon} alt="Close" className="w-3 h-3" />
                  </button>
                  <ul className="list-[square] pl-5 max-[912px]:p-0 max-[912px]:list-none">
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
      </>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
