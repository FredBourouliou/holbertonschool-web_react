import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import newContext from '../Context/context';

test('Header renders without crashing', () => {
  render(<Header />);
});

test('Header contains the Holberton logo', () => {
  render(<Header />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});

test('Header contains h1 with text School dashboard', () => {
  render(<Header />);
  const heading = screen.getByRole('heading', {
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test('logoutSection is not rendered with default context', () => {
  render(<Header />);
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});

test('logoutSection is rendered when user isLoggedIn is true', () => {
  const contextValue = {
    user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
    logOut: () => {},
  };

  render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function from context', async () => {
  const logOutSpy = jest.fn();
  const user = userEvent.setup();
  const contextValue = {
    user: { email: 'test@example.com', password: 'password123', isLoggedIn: true },
    logOut: logOutSpy,
  };

  render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  await user.click(screen.getByText(/logout/i));
  expect(logOutSpy).toHaveBeenCalled();
});
