import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

const defaultUser = { email: '', password: '', isLoggedIn: false };

test('Header renders without crashing', () => {
  render(<Header user={defaultUser} logOut={() => {}} />);
});

test('Header contains the Holberton logo', () => {
  render(<Header user={defaultUser} logOut={() => {}} />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});

test('Header contains h1 with text School dashboard', () => {
  render(<Header user={defaultUser} logOut={() => {}} />);
  const heading = screen.getByRole('heading', {
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test('logoutSection is not rendered with default context', () => {
  render(<Header user={defaultUser} logOut={() => {}} />);
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});

test('logoutSection is rendered when user isLoggedIn is true', () => {
  const loggedInUser = { email: 'test@example.com', password: 'password123', isLoggedIn: true };

  render(<Header user={loggedInUser} logOut={() => {}} />);

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function from props', async () => {
  const logOutSpy = jest.fn();
  const user = userEvent.setup();
  const loggedInUser = { email: 'test@example.com', password: 'password123', isLoggedIn: true };

  render(<Header user={loggedInUser} logOut={logOutSpy} />);

  await user.click(screen.getByText(/logout/i));
  expect(logOutSpy).toHaveBeenCalled();
});
