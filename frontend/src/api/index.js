//Importamos la libreria axios la cual nos ayuda a crear una URL base para concetar con el puerto del server.

import axios from "axios";

export default axios.create({
  baseURL: "https://3-legacy-lms-agora-frontend-tahc.vercel.app",
});
