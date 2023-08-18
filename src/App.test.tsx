import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders the "Registrering" link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const registreringLink = screen.getByText('Registrering');
  expect(registreringLink).toBeInTheDocument();
});
