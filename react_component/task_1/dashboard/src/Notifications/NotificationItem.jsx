function NotificationItem({ type, html, value }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue' };

  if (html) {
    return (
      <li
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        style={style}
      ></li>
    );
  }

  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
}

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  value: '',
};

export default NotificationItem;
