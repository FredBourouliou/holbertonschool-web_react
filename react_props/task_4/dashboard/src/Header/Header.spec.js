import { render, screen } from '@testing-library/react';
import Header from './Header';

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
