import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear } from '../../utils/utils';

const defaultUser = { email: '', password: '', isLoggedIn: false };

test('Footer renders without crashing', () => {
  render(<Footer user={defaultUser} />);
});

test('Footer renders Copyright {year} - Holberton School', () => {
  render(<Footer user={defaultUser} />);
  const year = getCurrentYear();
  expect(
    screen.getByText(`Copyright ${year} - Holberton School`)
  ).toBeInTheDocument();
});

test('Contact us link is not displayed when user is logged out', () => {
  render(<Footer user={defaultUser} />);
  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const loggedInUser = { email: 'test@example.com', password: 'password123', isLoggedIn: true };

  render(<Footer user={loggedInUser} />);

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
