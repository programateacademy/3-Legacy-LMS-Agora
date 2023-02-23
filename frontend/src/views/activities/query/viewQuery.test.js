import {render, screen} from "@testing-library/react"
import {ViewQuery} from "./viewQury/viewQuery"
import "@testing-library/jest-dom"

describe("Query", () => {
    it("view query", () =>{
        render(ViewQuery)
        expect(screen.getByText(/Consultas/i))
    });
});