import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateBootcamp.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";

const initialStateBootcamp = {
  nameBootcamp: "",
  descriptionBootcamp: "",
  err: "",
  success: "",
};

export function CreateBootcamp() {
  let navigate = useNavigate();
  const [image, setImage] = useState("");
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;

  const [bootcamp, setBootcamp] = useState(initialStateBootcamp);
  const { nameBootcamp, imageBootcamp, descriptionBootcamp, success } =
    bootcamp;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBootcamp({ ...bootcamp, [name]: value, err: "", success: "" });
    console.log(imageBootcamp);
  };

  const handleImage = (e) => {
    const { name, value } = e.target;
    setBootcamp({
      ...bootcamp,
      [name]: value,
      err: "",
      success: "",
    });
    setImage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.post(
          "/api/agora/new-bootcamp",
          {
            nameBootcamp,
            imageBootcamp,
            descriptionBootcamp,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg(success);
        setBootcamp({ ...bootcamp, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setBootcamp({ ...bootcamp, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div class={styles.wrapper}>
        <h2 class={styles.typing_demo}>Crear Bootcamps</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.column__one}>
            <input
              placeholder="Nombre del bootcamp"
              value={nameBootcamp}
              onChange={handleChangeInput}
              name="nameBootcamp"
            />
            <textarea
              className={styles.textarea__createBoot}
              placeholder="Descripción"
              value={descriptionBootcamp}
              onChange={handleChangeInput}
              name="descriptionBootcamp"
            />
          </div>
        </div>
        <div className={styles.column__two}>
          <div className={styles.image_preview}>
            <img className={styles.image} src={image} alt="Logo Cohorte" />
          </div>
          <div className={styles.file}>
            <input
              className={styles.input__logoURL}
              placeholder="Inserta URL de la imagen Bootcamp"
              type="text"
              name="imageBootcamp"
              value={imageBootcamp}
              onChange={handleImage}
            />
          </div>
          <div className={styles.container_submit}>
            <button className={styles.buttonCreateBootcamp} type="submit">
              Crear Bootcamp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}