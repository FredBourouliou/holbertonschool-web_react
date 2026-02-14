import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear } from '../utils/utils';

test('Footer renders without crashing', () => {
  render(<Footer />);
});

test('Footer renders Copyright {year} - Holberton School', () => {
  render(<Footer />);
  const year = getCurrentYear();
  expect(
    screen.getByText(`Copyright ${year} - Holberton School main dashboard`)
  ).toBeInTheDocument();
});
