import React, { useState } from "react";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
  isLengthcontactNumber,
} from "../../../utils/validation";
import "./Register.css";
import { Input } from "../../../components/input/Input";
import logo from "../../../assets/logos/programateLogo.png";

const initialState = {
  
  firstName: "",
  middleName: "",
  lastName: "",
  secondSurname: "",
  documentType: "",
  documentNumber: "",
  contactNumber: "",
  role: 1,
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export function RegisterTeacher() {
  const [user, setUser] = useState(initialState);
  const auth = useSelector((state) => state.auth);
  const {
    firstName,
    middleName,
    lastName,
    secondSurname,
    documentType,
    documentNumber,
    contactNumber,
    email,
    password,
    cf_password,
    err,
    success,
    role
  } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(firstName) || isEmpty(password))
      return setUser({
        ...user,
        err: "Todos los campos son obligatorios",
        success: "",
      });
    if (isEmpty(lastName) || isEmpty(password))
      return setUser({
        ...user,
        err: "Todos los campos son obligatorios",
        success: "",
      });

    if (!isEmail(email))
      return setUser({
        ...user,
        err: "Este correo electronico ya existe :(",
        success: "",
      });

    if (isLengthcontactNumber(contactNumber))
      return setUser({
        ...user,
        err: "El telefono debe tener al menos 10 caracteres",
        success: "",
      });

    if (isLength(password))
      return setUser({
        ...user,
        err: "La contraseña debe tener al menos 6 caracteres",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Las contraseñas no coinciden",
        success: "",
      });

    try {
      if (auth.isSuperAdmin) {
        const res = await apiAgora.post("/api/register_teacher", {
          
          firstName,
          middleName,
          lastName,
          secondSurname,
          documentType,
          documentNumber,
          contactNumber,
          email,
          password,
          role
        });
        showSuccessMsg(success);
        setUser({ ...user, err: "", success: res.data.msg });
      } 
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="container-register">
      <div className="container-register-page">
        <img className="logo-register" src={logo} alt="logo" />
        <h2 className="title-register">Registro Formador</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className="register-form-content">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="container-register-input">
              <Input
                className="input-register"
                label="Primer nombre"
                placeholder="Primer Nombre"
                name="firstName"
                value={firstName}
                onChange={handleChangeInput}
              />
              <Input
                className="input-register"
                label="Segundo nombre"
                placeholder="Segundo nombre"
                name="middleName"
                value={middleName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="container-register-input">
              <Input
                className="input-register"
                label="Primer apellido"
                placeholder="Primer apellido"
                name="lastName"
                value={lastName}
                onChange={handleChangeInput}
              />
              <Input
                className="input-register"
                label="Segundo apellido"
                placeholder="Segundo apellido"
                name="secondSurname"
                value={secondSurname}
                onChange={handleChangeInput}
              />
            </div>
            <div className="container-register-input">
              <div className="input-container">
                <label className="input-label">Tipo de Documento</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="documentType" value={documentType} onChange={handleChangeInput}>
                  <option selected>Seleccione...</option>
                  <option value="CC">Cédula de Ciudadania</option>
                  <option value="TI">Tarjeta de Identitdad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PEP">Permiso Especial de Permanencia</option>
                  <option value="PPT">Permiso de Protección Temporal</option>
                </select>
              </div>
              <Input
                className="input-register"
                label="Número de Documento"
                placeholder="Número de Documento"
                name="documentNumber"
                value={documentNumber}
                onChange={handleChangeInput}
              />
            </div>
            <div className="container-register-input">
              <Input
                className="input-register"
                label="Correo"
                placeholder="email@educamas.co"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
              <Input
                className="input-register"
                label="Telefono"
                placeholder="300 000 00 00"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChangeInput}
              />
            </div>
            <div className="container-register-input">
              <Input
                className="input-register"
                type="password"
                label="Contraseña"
                placeholder="******"
                name="password"
                value={password}
                onChange={handleChangeInput}
              />
              <Input
                className="input-register"
                type="password"
                label="Confirmar contraseña"
                placeholder="******"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
              />
            </div>

            <button className="button-submit-register" type="submit">
              CREAR CUENTA DE FORMADOR
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}


