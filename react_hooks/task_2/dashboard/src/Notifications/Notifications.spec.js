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

test('does not re-render when props stay the same', () => {
  const renderSpy = jest.spyOn(Notifications.prototype, 'render');

  const { rerender } = render(
    <Notifications displayDrawer={true} notifications={testNotifications} />
  );

  const initialCallCount = renderSpy.mock.calls.length;

  rerender(
    <Notifications displayDrawer={true} notifications={testNotifications} />
  );

  expect(renderSpy.mock.calls.length).toBe(initialCallCount);

  renderSpy.mockRestore();
});

test('re-renders when notifications list changes', () => {
  const renderSpy = jest.spyOn(Notifications.prototype, 'render');

  const longerList = [
    ...testNotifications,
    { id: 4, type: 'default', value: 'New notification' },
  ];

  const { rerender } = render(
    <Notifications displayDrawer={true} notifications={testNotifications} />
  );

  const initialCallCount = renderSpy.mock.calls.length;

  rerender(
    <Notifications displayDrawer={true} notifications={longerList} />
  );

  expect(renderSpy.mock.calls.length).toBe(initialCallCount + 1);

  renderSpy.mockRestore();
});

test('clicking "Your notifications" calls handleDisplayDrawer', () => {
  const handleDisplayDrawer = jest.fn();
  render(
    <Notifications
      displayDrawer={false}
      notifications={testNotifications}
      handleDisplayDrawer={handleDisplayDrawer}
    />
  );
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(handleDisplayDrawer).toHaveBeenCalled();
});

test('clicking close button calls handleHideDrawer', () => {
  const handleHideDrawer = jest.fn();
  render(
    <Notifications
      displayDrawer={true}
      notifications={testNotifications}
      handleHideDrawer={handleHideDrawer}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(handleHideDrawer).toHaveBeenCalled();
});

test('clicking a notification item calls markNotificationAsRead', () => {
  const markNotificationAsRead = jest.fn();
  render(
    <Notifications
      displayDrawer={true}
      notifications={testNotifications}
      markNotificationAsRead={markNotificationAsRead}
    />
  );
  fireEvent.click(screen.getByText(/new course available/i));
  expect(markNotificationAsRead).toHaveBeenCalledWith(1);
});
