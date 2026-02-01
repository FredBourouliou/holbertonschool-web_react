import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

const testNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

test('renders the text Here is the list of notifications', () => {
  render(<Notifications notifications={testNotifications} />);
  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();
});

test('renders three notification items', () => {
  render(<Notifications notifications={testNotifications} />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('renders the correct notification texts', () => {
  render(<Notifications notifications={testNotifications} />);
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});
