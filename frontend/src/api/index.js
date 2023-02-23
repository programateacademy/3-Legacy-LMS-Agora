import axios from "axios";
//Importamos la libreria axios la cual nos ayuda a crear una URL base para concetar con el puerto del server.
export default axios.create({
  baseURL: "http://localhost:3005",
});
