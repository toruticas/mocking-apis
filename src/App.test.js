import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/List of articles/i);
  expect(linkElement).toBeInTheDocument();
});
