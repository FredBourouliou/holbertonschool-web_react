import { render, screen, fireEvent } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Notifications from './Notifications';
import { getLatestNotification } from '../../utils/utils';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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

test('Your Notifications text is always displayed', () => {
  render(<Notifications />);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('notification drawer is hidden by default (no visible class)', () => {
  render(<Notifications notifications={testNotifications} />);
  const drawer = screen.getByTestId('notification-drawer');
  const hasVisible = Array.from(drawer.classList).some((c) =>
    c.includes('visible')
  );
  expect(hasVisible).toBe(false);
});

test('clicking "Your notifications" adds the visible Aphrodite class to the drawer', () => {
  render(<Notifications notifications={testNotifications} />);
  const drawer = screen.getByTestId('notification-drawer');

  fireEvent.click(screen.getByText(/your notifications/i));

  const hasVisible = Array.from(drawer.classList).some((c) =>
    c.includes('visible')
  );
  expect(hasVisible).toBe(true);
});

test('clicking close button removes the visible Aphrodite class from the drawer', () => {
  render(<Notifications notifications={testNotifications} />);
  const drawer = screen.getByTestId('notification-drawer');

  // Open
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(
    Array.from(drawer.classList).some((c) => c.includes('visible'))
  ).toBe(true);

  // Close
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(
    Array.from(drawer.classList).some((c) => c.includes('visible'))
  ).toBe(false);
});

test('when notifications is empty, displays No new notification for now', () => {
  render(<Notifications notifications={[]} />);
  expect(
    screen.getByText(/no new notification for now/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('displays Loading... when loading is true', () => {
  render(<Notifications loading={true} notifications={[]} />);
  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  expect(screen.queryByText(/no new notification for now/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
});

test('does not display Loading... when loading is false', () => {
  render(<Notifications loading={false} notifications={testNotifications} />);
  expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument();
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
});

test('does not re-render when props stay the same (memo)', () => {
  expect(Notifications.$$typeof).toBe(Symbol.for('react.memo'));

  const { rerender } = render(
    <Notifications notifications={testNotifications} />
  );

  rerender(<Notifications notifications={testNotifications} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('re-renders when notifications list changes', () => {
  const longerList = [
    ...testNotifications,
    { id: 4, type: 'default', value: 'New notification' },
  ];

  const { rerender } = render(
    <Notifications notifications={testNotifications} />
  );

  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  rerender(<Notifications notifications={longerList} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getByText(/new notification/i)).toBeInTheDocument();
});

test('clicking a notification item calls markNotificationAsRead', () => {
  const markNotificationAsRead = jest.fn();
  render(
    <Notifications
      notifications={testNotifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );
  fireEvent.click(screen.getByText(/new course available/i));
  expect(markNotificationAsRead).toHaveBeenCalledWith(1);
});
