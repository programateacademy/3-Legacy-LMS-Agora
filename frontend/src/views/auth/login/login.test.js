import { render, screen } from '@testing-library/react'
import Login from './Login'
jest.mock('react-redux');
jest.mock('react-router-dom');

test('render titulo h1', () => {
    render(<Login />);
    const loginH1 = screen.getByText(/Ingreso de Usuario/i);
    /* const LoginH1Null = screen.getByPlaceholderText(/ingreso de profesor/i); */
    expect(loginH1).toBeInTheDocument();
})

test('render placeholder', () => {
    render(<Login />);
    const inputLo = screen.getByPlaceholderText(/email@educamas.co/i);
    /* const inputLoE = screen.getByPlaceholderText(/ingreso de estudiantes/i); */
    expect(inputLo).toBeInTheDocument();
})