import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const style = { color: type === 'urgent' ? 'red' : 'blue' };

    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          style={style}
          onClick={() => markAsRead(id)}
        ></li>
      );
    }

    return (
      <li data-notification-type={type} style={style} onClick={() => markAsRead(id)}>
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
