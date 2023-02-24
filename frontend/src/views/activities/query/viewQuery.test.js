import {render, screen} from "@testing-library/react";
import {ViewQuery} from "./viewQury/viewQuery";
import "@testing-library/jest-dom/extend-expect";
jest.mock('react-redux');
jest.mock('react-router-dom');

test("Query", () =>{
    render(<ViewQuery teacher={false}/>)
    expect(screen.getByText(/Consultas/i)).toBeInTheDocument();
})