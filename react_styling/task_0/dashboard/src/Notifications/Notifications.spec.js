import { render, screen } from '@testing-library/react';
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

test('does not re-render when notifications length stays the same', () => {
  const renderSpy = jest.spyOn(Notifications.prototype, 'render');

  const sameLength = [
    { id: 1, type: 'default', value: 'First' },
    { id: 2, type: 'urgent', value: 'Second' },
    { id: 3, type: 'urgent', value: 'Third' },
  ];

  const { rerender } = render(
    <Notifications displayDrawer={true} notifications={testNotifications} />
  );

  const initialCallCount = renderSpy.mock.calls.length;

  rerender(
    <Notifications displayDrawer={true} notifications={sameLength} />
  );

  expect(renderSpy.mock.calls.length).toBe(initialCallCount);

  renderSpy.mockRestore();
});

test('re-renders when notifications length changes', () => {
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
