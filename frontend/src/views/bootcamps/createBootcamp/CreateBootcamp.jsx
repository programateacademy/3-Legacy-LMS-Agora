import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateBootcamp.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";

const initialStateBootcamp = {
  nameBootcamp: "",
  imageBootcamp: "",
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
  const { nameBootcamp, imageBootcapm, descriptionBootcamp, success } =
    bootcamp;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setBootcamp({ ...bootcamp, [name]: value, err: "", success: "" });
    console.log(imageBootcapm);
  };

  const handleImage = (e) => {
    setBootcamp({
      ...bootcamp,
      imageBootcapm: e.target.value,
      err: "",
      success: "",
    });
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.post(
          "/api/agora/new-bootcamp",
          {
            nameBootcamp,
            imageBootcapm,
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

  // useEffect(() => {
  //   setImage(imageBootcapm)
  // }, [imageBootcapm]);

  return (
    <div>
      <div>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <form className={styles.form__content} onSubmit={handleSubmit}>
        <div className={styles.container__columns}>
          <div className={styles.column__one}>
            <h3>
              <u>Crear un nuevo Bootcamp</u>
            </h3>
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
            <img className={styles.image} src={image} alt="Logo Cohorte" />
            <input
              className={styles.input__logoURL}
              placeholder="Inserta URL de la imagen Bootcamp"
              type="text"
              name="imageBootcamp"
              value={imageBootcapm}
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
