import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('li has color blue and data-notification-type default when type is default', () => {
  render(<NotificationItem type="default" value="test" />);
  const item = screen.getByText('test');
  expect(item).toHaveStyle({ color: 'blue' });
  expect(item).toHaveAttribute('data-notification-type', 'default');
});

test('li has color red and data-notification-type urgent when type is urgent', () => {
  render(<NotificationItem type="urgent" value="test urgent" />);
  const item = screen.getByText('test urgent');
  expect(item).toHaveStyle({ color: 'red' });
  expect(item).toHaveAttribute('data-notification-type', 'urgent');
});
