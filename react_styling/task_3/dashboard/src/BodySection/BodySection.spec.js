import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders a heading with the title prop value', () => {
  render(<BodySection title="test title" />);
  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
});

test('renders any children passed to it', () => {
  render(
    <BodySection title="test title">
      <p>child one</p>
      <p>child two</p>
    </BodySection>
  );
  expect(screen.getByText(/child one/i)).toBeInTheDocument();
  expect(screen.getByText(/child two/i)).toBeInTheDocument();
});
