import { render, screen } from '@testing-library/react';
import Login from './Login';

test('Login renders without crashing', () => {
  render(<Login />);
});
