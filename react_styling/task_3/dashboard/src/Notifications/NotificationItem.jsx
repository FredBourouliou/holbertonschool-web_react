import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const colorClass = type === 'urgent' ? 'text-urgent-notification-item' : 'text-default-notification-item';

    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          className={colorClass}
          onClick={() => markAsRead(id)}
        ></li>
      );
    }

    return (
      <li data-notification-type={type} className={colorClass} onClick={() => markAsRead(id)}>
        {value}
      </li>
    );
  }
}

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: '',
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
