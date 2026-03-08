import { memo } from 'react';

function NotificationItem({ type = 'default', html = null, value = '', markAsRead = () => {}, id = 0 }) {
  const color = type === 'urgent' ? 'red' : 'blue';

  if (html) {
    return (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        style={{ color, paddingLeft: '0.25rem' }}
        onClick={() => markAsRead(id)}
      ></li>
    );
  }

  return (
    <li data-notification-type={type} style={{ color, paddingLeft: '0.25rem' }} onClick={() => markAsRead(id)}>
      {value}
    </li>
  );
}

export default memo(NotificationItem);
