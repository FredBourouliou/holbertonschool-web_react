import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders default type notification text in blue', () => {
  render(<NotificationItem type="default" value="test default" />);
  const item = screen.getByText('test default');
  expect(item).toHaveAttribute('data-notification-type', 'default');
  expect(item).toHaveStyle({ color: 'blue' });
});

test('renders urgent type notification text in red', () => {
  render(<NotificationItem type="urgent" value="test urgent" />);
  const item = screen.getByText('test urgent');
  expect(item).toHaveAttribute('data-notification-type', 'urgent');
  expect(item).toHaveStyle({ color: 'red' });
});
