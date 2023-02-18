import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apiAgora from "../../../api/index";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import {
  isEmpty,
  isEmail,
  isLengthcontactNumber,
} from "../../../utils/validation";
import styles from "./register.module.css";

import logo from "../../../assets/logos/Programate-academy-negros.png";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import LazyLoad from "react-lazy-load";

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

export function UpdateRegisterAdmin() {
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
  } = user;

  let navigate = useNavigate();

  const fetchAdmins = async (url, id) => {
    const res = await apiAgora.get("api/get_admin/" + url, {
      headers: { Authorization: id },
    });
    setUser(res.data);
  };
  useEffect(() => {
    fetchAdmins(userID, id_user);
  }, [userID, id_user]);

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

    if (!isEmail(email))
      return setUser({
        ...user,
        err: "Este correo electronico ya existe :(",
        success: "",
      });

    try {
      if (auth.isSuperAdmin) {
        const res = await apiAgora.put(
          "/api/update_admin/" + userID,
          {
            firstName,
            middleName,
            lastName,
            secondSurname,
            documentType,
            documentNumber,
            contactNumber,
            email,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg(
          "Perfil Actualizado",
          "Los cambios en el usuario se ha realizado satisfactoriamente"
        );
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
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
        <LazyLoad>
          <img className={styles.logo_register} src={logo} alt="logo" />
        </LazyLoad>
        <h2 className={styles.title_register}>Administrador</h2>

        <div className={styles.register_form_content}>
          <form className={styles.register_form} onSubmit={handleSubmit}>
            <div className={styles.container_register_input}>
              <div className={styles.input_register}>
                <label>Primer Nombre</label>
                <input
                  placeholder="Primer Nombre"
                  name="firstName"
                  value={firstName}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.input_register}>
                <label>Segundo Nombre</label>
                <input
                  placeholder="Segundo Nombre"
                  name="middleName"
                  value={middleName}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className={styles.container_register_input}>
              <div className={styles.input_register}>
                <label>Apellido Paterno</label>
                <input
                  placeholder="Primer apellido"
                  name="lastName"
                  value={lastName}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.input_register}>
                <label>Apellido Materno</label>
                <input
                  placeholder="Apellido Materno"
                  name="secondSurname"
                  value={secondSurname}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className={styles.container_register_input}>
              <div className={styles.input_register}>
                <label className={styles.input_label}>Tipo de Documento</label>
                <select
                  className={styles.form_select}
                  aria-label="Default select example"
                  name="documentType"
                  defaultValue={documentType}
                  onChange={handleChangeInput}
                >
                  <option selected>Seleccione...</option>
                  <option value="CC">Cédula de Ciudadania</option>
                  <option value="TI">Tarjeta de Identitdad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PEP">Permiso Especial de Permanencia</option>
                  <option value="PPT">Permiso de Protección Temporal</option>
                  <option value="PA">Pasporte</option>
                </select>
              </div>
              <div className={styles.input_register}>
                <label>Numero de documento</label>
                <input
                  label="Número de Documento"
                  placeholder="Número de Documento"
                  name="documentNumber"
                  value={documentNumber}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className={styles.container_register_input}>
              <div className={styles.input_register}>
                <label>Correo</label>
                <input
                  label="Correo"
                  placeholder="email@educamas.co"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.input_register}>
                <label>Telefono</label>
                <input
                  label="Telefono"
                  placeholder="300 000 00 00"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            <button className={styles.button_submit_register} type="submit">
              ACTUALIZAR ADMINISTRADOR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
