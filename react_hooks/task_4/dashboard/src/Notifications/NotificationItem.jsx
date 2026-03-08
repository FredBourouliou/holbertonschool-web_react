import { memo } from 'react';
import PropTypes from 'prop-types';

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

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

export default memo(NotificationItem);
