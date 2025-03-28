import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renderiza sem quebrar', () => {
  render(<App />);
  expect(screen.getByText(/diário de leitura/i)).toBeInTheDocument();
  });