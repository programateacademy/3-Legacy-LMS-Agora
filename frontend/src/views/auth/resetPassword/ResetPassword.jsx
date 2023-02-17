import React, { useState } from "react";
import apiAgora from "../../../api/index";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import { isLength, isMatch } from "../../../utils/validation";
import "./ResetPassword.css";
import logo from "../../../assets/logos/Programate-academy-negros.png";
import Agora from "../../../assets/logos/agora.png"
import Facebook from "../../../assets/icons/facebook.png"
import Instagram from "../../../assets/icons/instagram.png"
import { useSelector } from "react-redux";

const initialState = {
  oldPassword: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export function ResetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const auth = useSelector((state) => state.auth);
  const userID = auth.user.id;

  const { password, cf_password, oldPassword, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "La contraseña debe tener al menos 6 caracteres",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Las contraseñas no coinciden.",
        success: "",
      });

    try {
      const res = await apiAgora.post(
        "/api/reset",
        { password, oldPassword, userID },
        {
          headers: { Authorization: userID },
        }
      );
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
      <img className='agora' src={Agora} alt="" />
            <img className="logo2" src={logo} alt="logo" />
      
      <div className="container-resetPassword">
      <button className="button_return" onClick={() => navigate(-1)}>
        <BsArrowLeftCircle size={30} />
      </button>
        
        <h2 className="title-resetPassword">Cambiar Contraseña</h2>
        <div className="container-info-resetPassword">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          {/*-------prueba --------- */}
          <h3>Contraseña actual</h3>
          <input
            type="password"
            placeholder="******"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChangeInput}
          />
          {/*-------prueba --------- */}
          <h3>Nueva Contraseña</h3>
          <input
            type="password"
            placeholder="******"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <h3>Confirmar contraseña</h3>
          <input
            type="password"
            placeholder="******"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
          <hr />
           <div className="redes-sociales">
           <button className="button-resetPassword" onClick={handleResetPass}>
            Confirmar
           </button>
           <img src={Instagram} alt="" />
           <img src={Facebook} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
