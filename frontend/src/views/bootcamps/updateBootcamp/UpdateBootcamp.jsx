import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateBootcamp.module.css";

import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import Swal from "sweetalert2";
import LazyLoad from "react-lazy-load";

export function UpdateBootcamp() {
  const params = useParams();
  const bootcampID = params.id;
  let navigate = useNavigate();

  const [image, setImage] = useState("");
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;

  const [bootcamp, setBootcamp] = useState({});
  const { nameBootcamp, imageBootcamp, descriptionBootcamp} =
    bootcamp;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBootcamp({ ...bootcamp, [name]: value, err: "", success: "" });
  };

  const handleImage = (e) => {
    setBootcamp({
      ...bootcamp,
      imageBootcamp: e.target.value,
      err: "",
      success: "",
    });
    setImage(e.target.value);
  };

  const fetchBootcamp = async (url, id) => {
    const res = await apiAgora.get("api/agora/get-bootcamps/" + url, {
      headers: { Authorization: id },
    });
    setBootcamp(res.data);
    setImage(res.data.imageBootcamp);
  };

  const alertErase = (bootcampID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar este Bootcamp?",
      text: "Este proceso no es reversible, recuerde borrar primero las cohortes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBootcamp(bootcampID);
        Swal.fire("Completado", "El Bootcamp ha sido eliminado", "success");
      }
    });
  };

  const deleteBootcamp = async (bootcampID) => {
          await apiAgora.delete("api/agora/delete-bootcamp/" + bootcampID, {
        headers: { Authorization: id_user },
      });
      navigate(-1);
  };

  useEffect(() => {
    fetchBootcamp(bootcampID, id_user);
  }, [bootcampID, id_user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.put(
          "/api/agora/update-bootcamp/" + bootcampID,
          {
            nameBootcamp,
            imageBootcamp,
            descriptionBootcamp,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg("Bootcamp Actualizada","Los cambios en el bootcamp se ha realizado satisfactoriamente");
        setBootcamp({ ...bootcamp, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setBootcamp({ ...bootcamp, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
      <div className={styles.button_container}>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
            <button type="button" className={styles.button_clear} onClick={() => alertErase(bootcampID)}>
        Eliminar Bootcamp
      </button>
      </div>
      <div className={styles.wrapper}>
        <h2 className={styles.typing_demo}>Actualizar Bootcamp</h2>
      </div>
      <form className={styles.form__content} onSubmit={handleSubmit}>
        <div className={styles.container__columns}>
          <div className={styles.column__one}>
            <input
              className={styles.input__createBoot}
              placeholder="nombre"
              value={nameBootcamp}
              onChange={handleChangeInput}
              name="nameBootcamp"
            />
            <textarea
              className={styles.textarea__createBoot}
              placeholder="description"
              value={descriptionBootcamp}
              onChange={handleChangeInput}
              name="descriptionBootcamp"
            />
          </div>
          <div className={styles.column__two}>
            <LazyLoad className={styles.img_preview}>
              <img className={styles.image} src={image} alt="Logo Bootcamp" />
            </LazyLoad>
            <input
              className={styles.input__logoURL}
              placeholder="Inserta URL de la imagen Bootcamp"
              type="text"
              name="imageBootcamp"
              value={imageBootcamp}
              onChange={handleImage}
            />
            <input
              type="submit"
              value="Enviar datos"
              className={styles.submit}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
