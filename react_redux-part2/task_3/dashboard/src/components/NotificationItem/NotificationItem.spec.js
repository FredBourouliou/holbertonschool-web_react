import { render, screen, fireEvent } from '@testing-library/react';
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

test('renders value text content', () => {
  render(<NotificationItem type="default" value="New course available" id={1} />);
  expect(screen.getByText('New course available')).toBeInTheDocument();
});

test('default type renders with blue color', () => {
  render(<NotificationItem type="default" value="test" id={1} />);
  const item = screen.getByText('test');
  expect(item).toHaveStyle({ color: 'blue' });
});

test('urgent type renders with red color', () => {
  render(<NotificationItem type="urgent" value="test" id={1} />);
  const item = screen.getByText('test');
  expect(item).toHaveStyle({ color: 'red' });
});

test('clicking the item calls markAsRead with the correct id', () => {
  const markAsRead = jest.fn();
  render(<NotificationItem type="default" value="test" id={5} markAsRead={markAsRead} />);
  fireEvent.click(screen.getByText('test'));
  expect(markAsRead).toHaveBeenCalledWith(5);
});
