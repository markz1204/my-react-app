import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react2 link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Save react/i);
  expect(linkElement).toBeInTheDocument();
});

