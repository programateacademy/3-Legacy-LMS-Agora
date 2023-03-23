// import { screen, render } from "@testing-library/react"; // Importamos metodos de la libreria
// import { ViewProject } from "./ViewProject"; // Importamos el componente a testear

// // Con jest.mock ignoramos la Librerias que no encuentre a la hora de realizar las pruebas unitarias
// jest.mock('react-redux');
// jest.mock('react-router-dom');

// // Describe engloba todos los testeos que se realizen
// describe('Pruebas Unitarias para el componente ViewProjects', () => {
//   let student, title, placeholder, buttonAble, buttonReturn; // Declaramos variables globales para algunos testeos

//   // Usamos el beforeEach para validar primero el renderizado del componente
//   // y cada testeo especifico para reutilizar codigo antes de realizar el expect.
//   beforeEach(() => {
//     student = render(<ViewProject teacher={false} />) // Se renderiza el componente con props que validan que es estudiante
//     title = student.getByText('Requerimientos Técnicos'); // Se testea un titulo
//     placeholder = student.getByPlaceholderText(/fecha de entrega/i); // Se testea un placeholder para un input
//     buttonAble = student.getByRole('button', { title: 'Entregar proyecto' }); // Se testea si se habilita el boton en rol estudiante
//     buttonReturn = student.getByRole('button', { name: /button/i }); // Se testea si escuentra un button con un title especifico.
//   });

//   // Se realiza los testeos esperados para saber si pasan o no
//   test("Deberia renderizar un titulo", () => {
//     screen.debug(); // Ayuda a visualizar mejor el arbol de HTML en consola
//     expect(title).toBeInTheDocument(); // Se le expecifica que se espera a renderizar en el docuemnto o componente.
//   });

//   test("Deberia renderizar un placeHolder", () => {
//     screen.debug();
//     expect(placeholder).toBeInTheDocument();
//   });

//   test("Deberia renderizar un botón en rol estudiante", () => {
//     screen.debug();
//     expect(buttonAble).toBeInTheDocument();
//   });

//   test('Deberia renderizar el botón de regresar', () => {
//     screen.debug();
//     expect(buttonReturn).toBeInTheDocument();
//   })

//   test('Test sobre estilos', () => {
//     screen.debug();
//     expect(buttonReturn).toHaveStyle({ // Se testea si de lo encontrado tiene un estilo en particular
//       cursor: 'crosshair'
//     })
//   })
// })

// test("Deberia no renderizar el botón en rol formador", () => {
//   const teacher = render(<ViewProject teacher={true} />); // Renderizado con props para rol formador
//   const buttonDisabled = teacher.getByRole('button', { title: /entregar proyecto/i }); // Se testea si se inhabilita el boton en rol formador
//   screen.debug();
//   expect(buttonDisabled).toBeInTheDocument();
// });
