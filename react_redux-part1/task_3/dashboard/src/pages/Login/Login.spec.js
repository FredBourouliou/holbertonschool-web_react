import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('Login renders without crashing', () => {
  render(<Login />);
});

test('Login includes 2 labels, 2 inputs, and 1 submit input', () => {
  render(<Login />);
  const labels = screen.getAllByText(/email|password/i).filter(
    (el) => el.tagName === 'LABEL'
  );
  expect(labels).toHaveLength(2);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /ok/i });
  expect(submitButton).toBeInTheDocument();
});

test('clicking a label focuses the related input', async () => {
  const user = userEvent.setup();
  render(<Login />);

  const emailLabel = screen.getByText('Email:');
  await user.click(emailLabel);
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveFocus();

  const passwordLabel = screen.getByText('Password:');
  await user.click(passwordLabel);
  expect(screen.getByLabelText(/password/i)).toHaveFocus();
});

test('submit button is disabled by default', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /ok/i });
  expect(submitButton).toBeDisabled();
});

test('submit button becomes enabled after entering valid email and password', async () => {
  const user = userEvent.setup();
  render(<Login />);

  const submitButton = screen.getByRole('button', { name: /ok/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  expect(submitButton).toBeDisabled();

  await user.type(passwordInput, 'short');
  expect(submitButton).toBeDisabled();

  await user.clear(passwordInput);
  await user.type(passwordInput, 'longpassword');
  expect(submitButton).toBeEnabled();

  await user.clear(emailInput);
  expect(submitButton).toBeDisabled();

  await user.type(emailInput, 'notanemail');
  expect(submitButton).toBeDisabled();

  await user.clear(emailInput);
  await user.type(emailInput, 'user@domain.com');
  expect(submitButton).toBeEnabled();
});

test('logIn prop is called with email and password on form submit', async () => {
  const logInMock = jest.fn();
  const user = userEvent.setup();
  render(<Login logIn={logInMock} />);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  expect(logInMock).toHaveBeenCalledWith('test@example.com', 'longpassword');
});
