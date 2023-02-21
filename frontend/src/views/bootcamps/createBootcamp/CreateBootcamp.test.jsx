import React from 'react';
import { screen, render } from '@testing-library/react';
import { CreateBootcamp } from './CreateBootcamp';

describe('Creación del bootcamp', () => {
  test('Deberia renderizar titulos', () => {
    render(<CreateBootcamp />);
    expect(screen.queryByRole('button', { name: 'Crear Bootcamp' })).toBeInTheDocument();
  });
});