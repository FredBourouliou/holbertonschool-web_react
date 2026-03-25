import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('contains a div with the class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="test">
      <p>child</p>
    </BodySectionWithMarginBottom>
  );
  const div = container.querySelector('.bodySectionWithMargin');
  expect(div).toBeInTheDocument();
});

test('renders the BodySection component', () => {
  render(
    <BodySectionWithMarginBottom title="test title">
      <p>child content</p>
    </BodySectionWithMarginBottom>
  );
  expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
  expect(screen.getByText(/child content/i)).toBeInTheDocument();
});
