import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('li has data-notification-type default when type is default', () => {
  render(<NotificationItem type="default" value="test" />);
  const item = screen.getByText('test');
  expect(item).toHaveAttribute('data-notification-type', 'default');
});

test('li has data-notification-type urgent when type is urgent', () => {
  render(<NotificationItem type="urgent" value="test urgent" />);
  const item = screen.getByText('test urgent');
  expect(item).toHaveAttribute('data-notification-type', 'urgent');
});
