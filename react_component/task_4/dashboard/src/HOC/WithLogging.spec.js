import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(cleanup);

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

test('WithLogging HOC renders the wrapped component content', () => {
  const WrappedMockApp = WithLogging(MockApp);
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<WrappedMockApp />);
  expect(screen.getByRole('heading', { name: /hello from mock app component/i })).toBeInTheDocument();

  consoleSpy.mockRestore();
});
