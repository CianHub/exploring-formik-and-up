import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders with no error', () => {
  render(<App />);
  const app = screen.getByRole('application');
  expect(app).toBeInTheDocument();
});
