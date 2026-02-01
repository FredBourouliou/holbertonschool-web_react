import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('Login renders without crashing', () => {
  render(<Login />);
});

test('Login includes 2 labels, 2 inputs, and 1 button', () => {
  render(<Login />);
  const labels = screen.getAllByText(/email|password/i).filter(
    (el) => el.tagName === 'LABEL'
  );
  expect(labels).toHaveLength(2);

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
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
