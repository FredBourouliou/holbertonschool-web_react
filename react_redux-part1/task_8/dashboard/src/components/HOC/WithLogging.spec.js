import { render, screen } from '@testing-library/react';
import WithLogging from './WithLogging';

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  consoleSpy.mockRestore();
});

function TestComponent() {
  return <p>Hello from TestComponent</p>;
}

test('logs mount and unmount messages', () => {
  const WrappedComponent = WithLogging(TestComponent);
  const { unmount } = render(<WrappedComponent />);

  expect(consoleSpy).toHaveBeenCalledWith('Component TestComponent is mounted');

  unmount();
  expect(consoleSpy).toHaveBeenCalledWith('Component TestComponent is going to unmount');
});

test('renders the wrapped component', () => {
  const WrappedComponent = WithLogging(TestComponent);
  render(<WrappedComponent />);
  expect(screen.getByText(/hello from testcomponent/i)).toBeInTheDocument();
});
