// import { screen, render } from "@testing-library/react"; // Importamos metodos de la libreria
// import { Projects } from "./Projects"; // Importamos el componente a testear

// // Con jest.mock ignoramos la Librerias que no encuentre a la hora de realizar las pruebas unitarias
// jest.mock('react-redux');
// jest.mock('react-router-dom');

// // Describe engloba todos los testeos que se realizen
// describe('Pruebas Unitarias para el componente Projects', () => {
//   test('Deberia renderizar un texto', () => {
//     render(<Projects teacher={false} />); // Se renderiza el componente con props que validan que es estudiante
//     const test = screen.getByText(/proyectos/i) // Se testea un titulo
//     expect(test).toBeInTheDocument(); // Se le expecifica que se espera a renderizar en el docuemnto o componente.
//     screen.debug();
//   })

//   test('Deberia renderizar el boton que se habilita cuando el rol es teacher', () => {
//     const component = render(<Projects teacher={true} />); // Se renderiza el componente con props que validan que es formador
//     const test = screen.getByRole('button', {title:/crear proyecto/i}) // Se testea si se habilita un boton
//     component.debug();
//     console.log(test)
//   })

// })