import {render, screen} from "@testing-library/react";
import {ViewQuery} from "./viewQury/viewQuery";
import "@testing-library/jest-dom";
jest.mock('react-redux');
jest.mock('react-redux-dom');

test("Query", () =>{
    render(<ViewQuery/>)
    expect(screen.getByTitle(/Consultas/i))
})