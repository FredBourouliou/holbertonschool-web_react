import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import AppContext from '../Context/context';
import { getCurrentYear } from '../utils/utils';

test('Footer renders without crashing', () => {
  render(<Footer />);
});

test('Footer renders Copyright {year} - Holberton School', () => {
  render(<Footer />);
  const year = getCurrentYear();
  expect(
    screen.getByText(`Copyright ${year} - Holberton School`)
  ).toBeInTheDocument();
});

test('Contact us link is not displayed when user is logged out', () => {
  render(<Footer />);
  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const contextValue = {
    user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
    logOut: () => {},
  };

  render(
    <AppContext.Provider value={contextValue}>
      <Footer />
    </AppContext.Provider>
  );

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
