import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders h1 with text School dashboard', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test('renders correct text in App-body and App-footer paragraphs', () => {
  render(<App />);
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/copyright \d{4} - holberton school/i)
  ).toBeInTheDocument();
});

test('renders an img element with holberton logo alt text', () => {
  render(<App />);
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});

test('renders 2 input elements for email and password', () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});

test('renders 2 label elements with text Email and Password', () => {
  render(<App />);
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
});

test('renders a button with the text OK', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});

test('by default, renders the Login form (user is not logged in)', () => {
  render(<App />);
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/available courses/i)).not.toBeInTheDocument();
});

test('after logging in, renders CourseList instead of Login', async () => {
  const user = userEvent.setup();
  render(<App />);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/login to access the full dashboard/i)
  ).not.toBeInTheDocument();
});

test('after logging in then logging out, renders Login form again', async () => {
  const user = userEvent.setup();
  render(<App />);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  expect(screen.getByText(/available courses/i)).toBeInTheDocument();

  await user.click(screen.getByText(/logout/i));

  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/available courses/i)).not.toBeInTheDocument();
});

test('default state: displayDrawer is true, notification drawer is visible', () => {
  render(<App />);
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('handleHideDrawer: clicking close button hides the drawer', () => {
  render(<App />);
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
});

test('handleDisplayDrawer: clicking "Your notifications" reopens the drawer', () => {
  render(<App />);
  // Hide the drawer first
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  // Reopen via "Your notifications"
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
});

test('clicking a notification removes it and logs the message', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  fireEvent.click(screen.getByText(/new course available/i));

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();

  consoleSpy.mockRestore();
});

test('logIn updates user state with email, password, and isLoggedIn', async () => {
  const user = userEvent.setup();
  render(<App />);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  // Verify isLoggedIn is true (CourseList rendered)
  expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  // Verify email is set (displayed in welcome section)
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
});

test('logOut resets user state: isLoggedIn false, email and password cleared', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Login first
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

  // Logout
  await user.click(screen.getByText(/logout/i));

  // Verify isLoggedIn is false (Login form shown)
  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  // Verify email is cleared (no longer displayed)
  expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
});
