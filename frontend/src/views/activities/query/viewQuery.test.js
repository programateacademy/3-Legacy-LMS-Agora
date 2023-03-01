import { render, screen } from "@testing-library/react";
import { ViewQuery } from "./viewQury/viewQuery";
import "@testing-library/jest-dom/extend-expect";
jest.mock('react-redux');
jest.mock('react-router-dom');

describe("testeos", () => {
    /* test("Find words Consultas in the document", () => {
        render(<ViewQuery teacher={false} />)
        expect(screen.getAllByText(/Consulta/i)).toBeInTheDocument;
    });
    test("Recognize submmit", () => {
        render(<ViewQuery teacher={false} />)
        expect(screen.getByRole('button', { title: /Entregar consulta/i })).toBeInTheDocument();
    });
    test("Find placeholder", () => {
        render(<ViewQuery teacher={false} />)
        expect(screen.getByPlaceholderText(/Fecha de entrega/i)).toBeInTheDocument();
    })
    test("Get text(titles)", () => {
        render(<ViewQuery teacher={false} />)
        expect(screen.getAllByText(/Reto/i)).toBeInTheDocument();
    });
    test("Find text", () => {
        render(<ViewQuery teacher={false} />)
        screen.debug();
        expect(screen.getByText(/Nociones básicas/i)).toBeInTheDocument();
    });*/
})
