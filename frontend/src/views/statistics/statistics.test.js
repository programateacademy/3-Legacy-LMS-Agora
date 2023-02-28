import React from "react";
import {render, prettyDOM } from "@testing-library/react";

import {Statistics} from './Statistics'

describe("must page", () => {
    test('Barra de progreso', () => {
        const component = render(<Statistics/>);
        const progressBar = component.container.querySelector('.progressBar');
        component.debug();
        console.log(prettyDOM(progressBar))
    });
    test("Deberia renderizar un titulo de entregas", () => {
        const component = render(<Statistics/>);
        component.getByText(/entregas corregidas:/i)
      });
      test("Deberia renderizar un titulo pricipal", () => {
        const component = render(<Statistics/>);
        component.getByText(/Estadísticas/i)
      });
});