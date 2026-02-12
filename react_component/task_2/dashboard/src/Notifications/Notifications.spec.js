import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

const testNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

test('renders the text Here is the list of notifications', () => {
  render(<Notifications displayDrawer={true} notifications={testNotifications} />);
  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();
});

test('renders three notification items', () => {
  render(<Notifications displayDrawer={true} notifications={testNotifications} />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('renders the correct notification texts', () => {
  render(<Notifications displayDrawer={true} notifications={testNotifications} />);
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});

test('Your Notifications text is always displayed', () => {
  render(<Notifications />);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('when displayDrawer is false, does not display close button, p element, or notification items', () => {
  render(<Notifications displayDrawer={false} notifications={testNotifications} />);
  expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('when displayDrawer is true, displays close button, p element, and notification items', () => {
  render(<Notifications displayDrawer={true} notifications={testNotifications} />);
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('when displayDrawer is true and notifications is empty, displays No new notification for now', () => {
  render(<Notifications displayDrawer={true} notifications={[]} />);
  expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('clicking a notification item logs the correct message to the console', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<Notifications displayDrawer={true} notifications={testNotifications} />);
  const firstItem = screen.getByText(/new course available/i);
  fireEvent.click(firstItem);

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');

  consoleSpy.mockRestore();
});
