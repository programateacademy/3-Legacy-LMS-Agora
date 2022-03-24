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
import styles from "./register.module.css";
import { Input } from "../../../components/input/Input";
import logo from "../../../assets/logos/programateLogo.png";
import {Link} from "react-router-dom"

const initialState = {
  
  firstName: "",
  middleName: "",
  lastName: "",
  secondSurname: "",
  documentType: "",
  documentNumber: "",
  contactNumber: "",
  role: 2,
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export function RegisterAdmin() {

  
  const [user, setUser] = useState(initialState);
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
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
        const res = await apiAgora.post("/api/register_admin"
    , {
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
        },{
          headers: {Authorization: id_user}
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
    <div className={styles.container_register}>
      <div className={styles.container_register_page}>
      <Link className={styles.button_return} to="/">
              Volver
            </Link>
        <img className={styles.logo_register} src={logo} alt="logo" />
        <h2 className={styles.title_register}>Registro Administrador</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className={styles.register_form_content}>
          <form className={styles.register_form} onSubmit={handleSubmit}>
            <div className={styles.container_register_input}>
              <Input
                className={styles.input_register}
                label="Primer nombre"
                placeholder="Primer Nombre"
                name="firstName"
                value={firstName}
                onChange={handleChangeInput}
              />
              <Input
                className={styles.input_register}
                label="Segundo nombre"
                placeholder="Segundo nombre"
                name="middleName"
                value={middleName}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.container_register_input}>
              <Input
                className={styles.input_register}
                label="Primer apellido"
                placeholder="Primer apellido"
                name="lastName"
                value={lastName}
                onChange={handleChangeInput}
              />
              <Input
                className={styles.input_register}
                label="Segundo apellido"
                placeholder="Segundo apellido"
                name="secondSurname"
                value={secondSurname}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.container_register_input}>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Tipo de Documento</label>
                <select
                  className={styles.form_select}
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
                className={styles.input_register}
                label="Número de Documento"
                placeholder="Número de Documento"
                name="documentNumber"
                value={documentNumber}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.container_register_input}>
              <Input
                className={styles.input_register}
                label="Correo"
                placeholder="email@educamas.co"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
              <Input
                className={styles.input_register}
                label="Telefono"
                placeholder="300 000 00 00"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.container_register_input}>
              <Input
                className={styles.input_register}
                type="password"
                label="Contraseña"
                placeholder="******"
                name="password"
                value={password}
                onChange={handleChangeInput}
              />
              <Input
                className={styles.input_register}
                type="password"
                label="Confirmar contraseña"
                placeholder="******"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
              />
            </div>

            <button className={styles.button_submit_register} type="submit">
              CREAR CUENTA DE ADMINISTRADOR
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}


