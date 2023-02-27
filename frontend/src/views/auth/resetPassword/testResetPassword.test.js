import React from "react";
import { screen, render } from "@testing-library/react";

import { ResetPasswordForgotten } from "./ResetPasswordForgotten";


describe("must page", () => {
    render(<ResetPasswordForgotten />)
    it("must display a title", () => {
        expect(screen.queryByText(/cambiar contraseña/i)).toBeInTheDocument();
    })
});
