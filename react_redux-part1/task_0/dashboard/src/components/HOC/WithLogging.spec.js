import { render, screen } from '@testing-library/react';
import WithLogging from './WithLogging';

function TestComponent() {
  return <p>Hello from TestComponent</p>;
}

test('logs mount and unmount messages', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const WrappedComponent = WithLogging(TestComponent);
  const { unmount } = render(<WrappedComponent />);

  expect(consoleSpy).toHaveBeenCalledWith('Component TestComponent is mounted');

  unmount();
  expect(consoleSpy).toHaveBeenCalledWith('Component TestComponent is going to unmount');

  consoleSpy.mockRestore();
});

test('renders the wrapped component', () => {
  const WrappedComponent = WithLogging(TestComponent);
  render(<WrappedComponent />);
  expect(screen.getByText(/hello from testcomponent/i)).toBeInTheDocument();
});
