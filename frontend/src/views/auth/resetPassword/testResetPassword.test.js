import React from "react";
import {render, prettyDOM } from "@testing-library/react";

import { ResetPasswordForgotten} from "./ResetPasswordForgotten";


describe("must page", () => {
    test('boton de reseteo de contraseña', () => {
        const component = render(<ResetPasswordForgotten teacher={false} />);
        const button = component.container.querySelector('.button-resetPassword');
        component.debug();
        console.log(prettyDOM(button))
    });
    test("Deberia no renderizar un titulo", () => {
        const component = render(<ResetPasswordForgotten teacher={false} />);
        component.getByText(/Confirmar contraseña/i)
      });
/*       test('does not post message', () => {
        render(<ResetPasswordForgotten teacher={false} />)
        userEvent.click(screen.getByRole('button'))
        expect(mutate).not.toHaveBeenCalled()
      }) */
});
