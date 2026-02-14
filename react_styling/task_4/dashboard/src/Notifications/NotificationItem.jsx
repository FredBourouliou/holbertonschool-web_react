import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const colorClass = type === 'urgent' ? 'text-urgent-notification-item' : 'text-default-notification-item';
    const responsiveClass = `${colorClass} max-[912px]:text-xl max-[912px]:border-b max-[912px]:border-black max-[912px]:p-3 max-[912px]:w-full`;

    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          className={responsiveClass}
          onClick={() => markAsRead(id)}
        ></li>
      );
    }

    return (
      <li data-notification-type={type} className={responsiveClass} onClick={() => markAsRead(id)}>
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
