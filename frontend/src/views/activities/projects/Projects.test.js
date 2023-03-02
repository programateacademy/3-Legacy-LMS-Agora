import { screen, render, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Projects } from "./Projects";

jest.mock('react-redux');
jest.mock('react-router-dom');

describe('Testeos', () => {
  // test('Deberia renderizar un texto', () => {
  //   render(<Projects teacher={true} />);
  //   const test = screen.getByText(/proyectos/i)
  //   expect(test).toBeInTheDocument();
  //   screen.debug();
  // })

  // test('Deberia renderizar el boton que se habilita cuando el rol es teacher', () => {
  //   const component = render(<Projects teacher={true} />);
  //   const test = screen.getByText(/crear proyecto/i)
  //   console.log(test)
  //   component.debug();
  // })
})