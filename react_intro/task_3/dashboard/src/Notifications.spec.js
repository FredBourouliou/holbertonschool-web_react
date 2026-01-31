import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

test('renders the notifications title', () => {
  render(<Notifications />);
  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();
});

test('renders a button element in the notifications', () => {
  render(<Notifications />);
  const button = screen.getByRole('button', { name: /close/i });
  expect(button).toBeInTheDocument();
});

test('renders 3 list items as notifications', () => {
  render(<Notifications />);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);
});

test('clicking the close button logs to the console', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<Notifications />);
  const button = screen.getByRole('button', { name: /close/i });
  fireEvent.click(button);
  expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
  consoleSpy.mockRestore();
});
