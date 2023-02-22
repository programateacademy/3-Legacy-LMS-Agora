import {render, screen} from "@testing-library/react"
import viewQuery from "./viewQury/viewQuery"

test("Render Query", () =>{
    render(viewQuery);
    screen.debug()
    const ok = screen.getByText(/Consultas/);
    expect(ok).toBeInTheDocument();
});
