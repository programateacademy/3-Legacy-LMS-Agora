import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import {
  isEmpty,
  isEmail,
  isLengthcontactNumber,
} from "../../../utils/validation";
import styles from './register.module.css'
import { Input } from "../../../components/input/Input";
import logo from "../../../assets/logos/programateLogo.png";
import {Link} from "react-router-dom";

const initialState = {
  
  firstName: "",
  middleName: "",
  lastName: "",
  secondSurname: "",
  documentType: "",
  documentNumber: "",
  contactNumber: "",
  role: 0,
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export function UpdateRegister() {
  const params = useParams();
  const userID = params.id;
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
    err,
    success
  } = user;

  const fetchAdmins = async () => {
    const res = await apiAgora.get('api/get_user/'+userID, {
      headers: { Authorization: id_user }
    })
    setUser(res.data)
  }
  useEffect(()=>{
    fetchAdmins()
  }, [])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(firstName) || isEmpty(lastName))
      return setUser({
        ...user,
        err: "Todos los campos son obligatorios",
        success: "",
      });

    if (isLengthcontactNumber(contactNumber))
      return setUser({
        ...user,
        err: "El telefono debe tener al menos 10 caracteres",
        success: "",
      });

    try {
      if (auth.isAdmin) {
        const res = await apiAgora.put("/api/update_user/"+userID, {
          firstName,
          middleName,
          lastName,
          secondSurname,
          documentType,
          documentNumber,
          contactNumber,
          email
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
        <img className={styles.logo_register} src={logo} alt="logo" />
        <Link className={styles.button_return} to="/">
              Volver
            </Link>
        <h2 className={styles.title_register}>USUARIO</h2>
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

            <button className={styles.button_submit_register} type="submit">
              ACTUALIZAR USUARIO
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}


