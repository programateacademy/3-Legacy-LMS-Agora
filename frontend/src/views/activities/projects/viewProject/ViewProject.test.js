import { screen, render, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {ViewProject} from "./ViewProject";

jest.mock('react-redux');
jest.mock('react-router-dom');

describe('testeos', () => {
  test("Deberia renderizar la etiqueta <img/>", () => {
    const component = render(<ViewProject teacher={false} />);
    // const img = component.container.querySelector('.formulario');
    // component.debug();
    console.log(component)
  });

  test("Deberia renderizar un titulo", () => {
    render(<ViewProject teacher={false} />)
    screen.debug();
    const title = screen.getByText('Requerimientos quanticos')
    expect(title).toBeInTheDocument();
  });

  test("Deberia renderizar un placeHolder", () => {
    const component = render(<ViewProject teacher={false} />);
    component.getByPlaceholderText(/fecha de entrega/i)
  });

  test("Deberia no renderizar un Titulo en rol formador", () => {
    const component = render(<ViewProject teacher={true} />);
    component.getByText(/entregar proyecto/i)
  });
  
  test("Deberia no renderizar un Titulo en rol formador", () => {
    const component = render(<ViewProject teacher={true} />);
    component.getByText(/entregar proyecto/i)
  });
})
