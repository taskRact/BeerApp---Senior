// YourComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

test('renders Home', () => {
  render(<Home />);
  expect(screen.getByText('Reload list')).toBeInTheDocument();
});

test('checks the type of Home component', () => {
    render(<Home />);
    expect(typeof Home).toBe('function');
});