// import '@testing-library/jest-dom'
// Se cree un simulacro en este archivo setupTests y nos ayuda a evitar el undefined a la hora de hacer pruebas unitarias.
// // // Mock IntersectionObserver
// class IntersectionObserver {
//   observe = jest.fn()
//   disconnect = jest.fn()
//   unobserve = jest.fn()
// }

// Object.defineProperty(window, 'IntersectionObserver', {
//   writable: true,
//   configurable: true,
//   value: IntersectionObserver,
// })

//  Object.defineProperty(global, 'IntersectionObserver', {
//    writable: true,
//    configurable: true,
//    value: IntersectionObserver,
//  })
