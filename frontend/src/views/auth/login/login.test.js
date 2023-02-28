import { getByLabelText, render, screen } from '@testing-library/react'
/* import { Component } from 'react'; */
import Login from './Login'
jest.mock('react-redux');
jest.mock('react-router-dom');
jest.mock('react-lazy-load');

test('render titulo h1', () => {
    render(<Login />);
    const loginH1 = screen.getByText(/Ingreso de Usuario/i);
    /* const LoginH1Null = screen.getByPlaceholderText(/ingreso de profesor/i); */
    expect(loginH1).toBeInTheDocument();
})

test("render img", () => {
    //render(<Login />);
    //const loginImg = screen.getByRole('img');
    //expect(loginImg).toBeInTheDocument();
})

test('render titulo email', () => {
    render(<Login />);
    const loginH1 = screen.getByText(/ingresa tu e-mail/i);
    /* const LoginH1Null = screen.getByPlaceholderText(/ingreso de profesor/i); */
    expect(loginH1).toBeInTheDocument();
})

/* test('render input correo', () => {
    render(<Login />);
    const input = screen.getByLabelText('Email', {selector: 'input'});
    expect(input).toBeInTheDocument();
})

test('render input contraseña', () => {
    render(<Login />);
    const input = screen.getByLabelText('Password', {selector: 'input'});
    expect(input).toBeInTheDocument();
}) */

test('render placeholder', () => {
    render(<Login />);
    const inputLo = screen.getByPlaceholderText(/email@educamas.co/i);
    expect(inputLo).toBeInTheDocument();
})

test('render button', () => {
    render(<Login />);
    const buttonLo = screen.getByRole('button');
    expect(buttonLo).toBeInTheDocument();
})