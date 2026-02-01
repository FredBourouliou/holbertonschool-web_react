import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer renders without crashing', () => {
  render(<Footer />);
});
