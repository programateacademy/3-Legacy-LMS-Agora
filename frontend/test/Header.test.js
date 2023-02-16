import { render } from "@testing-library/react";
import Header from "./src/components/header/Header"

//Define el tipo de test
describe("Header", () =>{
    //Todas las ejecuciones o test
    test("Hay requerimientos", () => {
        render(<Header/>);
    });
});