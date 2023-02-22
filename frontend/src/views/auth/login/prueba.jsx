import React, {useState} from 'react'
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import apiAgora from "../../../api/index";
export default function Prueba({ onSubmit }) {
  const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
  };

  const [user, setUser] = useState(initialState); //Inicializo hooks
  const { email, password, success } = user;
  const dispatch = useDispatch(); //Inicializo hooks
  const navigate = useNavigate(); //Inicializo hooks

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = apiAgora.post("/api/login", {
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
      window.localStorage.setItem("firstLogin", true);
      window.localStorage.setItem("loggedAgoraUser", JSON.stringify(res.data));
      showSuccessMsg(success);
      dispatch(dispatchLogin());
      navigate("/");
    } catch (err) {
      showErrMsg(err.res.data.error);
      err.response.data.error &&
        setUser({ ...user, err: err.response.data.error, success: "" });
    }
    onSubmit({ email, password, success });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="login-form-content">
        <h4 className="rayas" style={{ margin: "20px 0" }}>
          ingresa tu e-mail
        </h4>
        <input
          placeholder="email@educamas.co"
          name="email"
          value={email}
          onChange={handleChangeInput}
          required
        />
        <h4 className="rayas" style={{ margin: "20px 0" }}>
          {" "}
          Contraseña
        </h4>
        <input
          className="clave"
          type="Password"
          placeholder="********"
          name="password"
          value={password}
          onChange={handleChangeInput}
          required
        />
      </div>
      <Link className="requerid">Todos los campos son requeridos</Link>

      <button className="button-login" type="submit">
        INGRESAR
      </button>
      <hr />
    </form>
  );
};