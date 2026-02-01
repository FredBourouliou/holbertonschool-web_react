import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

test('renders the text Here is the list of notifications', () => {
  render(<Notifications />);
  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();
});

test('renders three notification items', () => {
  render(<Notifications />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('renders the correct notification texts', () => {
  render(<Notifications />);
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});
