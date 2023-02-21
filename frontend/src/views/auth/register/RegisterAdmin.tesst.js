import React from 'react';
import { screen, render } from '@testing-library/react';
import { RegisterAdmin } from './RegisterAdmin';

describe('Registtro de un administrador', () => {
  test('Deberia renderizar titulos', () => {
    render(<RegisterAdmin />);
    expect(screen.queryByRole('h2', { name: 'Registro Administrador'})).toBeInTheDocument();
  });
});