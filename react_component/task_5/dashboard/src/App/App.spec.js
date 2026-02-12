import { render, screen } from '@testing-library/react';
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

test('when isLoggedIn is false, renders the Login form', () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/available courses/i)).not.toBeInTheDocument();
});

test('when isLoggedIn is true, renders a CourseList table', () => {
  render(<App isLoggedIn={true} />);
  expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/login to access the full dashboard/i)
  ).not.toBeInTheDocument();
});
