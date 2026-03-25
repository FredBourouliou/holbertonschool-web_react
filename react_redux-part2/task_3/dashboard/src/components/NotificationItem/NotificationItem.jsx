import { memo } from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type = 'default', value = '', markAsRead = () => {}, id = 0 }) {
  const color = type === 'urgent' ? 'red' : 'blue';

  return (
    <li
      data-notification-type={type}
      style={{ color, paddingLeft: '0.25rem' }}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

export default memo(NotificationItem);
