import React, { useState } from "react";
import apiAgora from "../../../api";
import { isEmail } from "../../../utils/validation";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import logo from "../../../assets/logos/Programate-academy-negros.png";
import Agora from "../../../assets/logos/agora.png";
import "./ForgotPassword.css";


import LazyLoad from "react-lazy-load";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };
  

  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "El email es incorrecto", success: "" });

    try {
      const res = await apiAgora.post("/api/forgot", { email });

      showSuccessMsg(res.data.msg);
      setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container-main-resetPassword">
      <LazyLoad className="imagenes">
          <img className="agora" src={Agora} alt="" />
        </LazyLoad>

        <LazyLoad>
          <img className="logo" src={logo} alt="" />
        </LazyLoad>
      <div className="container-resetPassword">
        <h2 className="title-resetPassword">OLVIDASTE TU CONTRASEÑA?</h2>

        <div className="container-info-resetPassword">
          <input
            label="Ingresa tu correo electronico"
            placeholder="educamas@educamas.com"
            name="email"
            value={email}
            onChange={handleChangeInput}
            required
          />
          <button className="button-resetPassword" onClick={forgotPassword}>
            Verificar tu correo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
