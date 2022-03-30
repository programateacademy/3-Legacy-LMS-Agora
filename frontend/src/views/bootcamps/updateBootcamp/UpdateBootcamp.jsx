import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateBootcamp.module.css";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";

export function UpdateBootcamp() {
  const params = useParams();
  const userID = params.id;
  let navigate = useNavigate();

  const fetchAdmins = async () => {
    const res = await apiAgora.get("api/agora/get-bootcamps/" + userID, {
      headers: { Authorization: id_user },
    });
    setBootcamp(res.data);
    setImage(res.data.imageBootcamp);
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const [image, setImage] = useState("");
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;

  const [bootcamp, setBootcamp] = useState({});
  const { nameBootcamp, imageBootcamp, descriptionBootcamp, success } =
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.put(
          "/api/agora/update-bootcamp/" + userID,
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
    <div>
      <div>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <BsArrowLeftCircle size={30} />
        </button>
      </div>
      <div class={styles.wrapper}>
        <h2 class={styles.typing_demo}>Actualizar Bootcamp</h2>
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
            <div className={styles.img_preview}>
              <img className={styles.image} src={image} alt="Logo Cohorte" />
            </div>
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
