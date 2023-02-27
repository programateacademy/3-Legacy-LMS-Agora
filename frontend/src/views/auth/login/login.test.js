import { render, screen } from '@testing-library/react'
import Login from './Login'
jest.mock('react-redux');
jest.mock('react-router-dom');

test('render login', () => {
    render(<Login />);

    const inputLo = screen.getByText(/ingreso de usuario/i);
    expect(inputLo).toBeInTheDocument();
})