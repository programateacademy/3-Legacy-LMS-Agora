import React, { useState, useEffect } from "react";
import { Input } from "../../../components/input/Input";
import style from "./CreateCohorte.module.css";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";

const initialStateCohort = {
  bootcampID: "",
  nameCohort: "",
  numberCohort: "",
  imageCohort: "",
  descriptionCohort: "",
  startDateBootcamp: "",
  endBootcamp: "",
  err: "",
  success: "",
};

export function CreateCohorte() {
  const [cohort, setCohort] = useState(initialStateCohort);
  const [teachers, setTeachers] = useState([]);
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    bootcampID,
    nameCohort,
    numberCohort,
    imageCohort,
    descriptionCohort,
    startDateBootcamp,
    endBootcamp,
    err,
    success,
  } = cohort;

  const fetchTeachers = async () => {
    const res = await apiAgora.get("api/all_teacher", {
      headers: { Authorization: id_user },
    });
    setTeachers(res.data);
  };
  useEffect(() => {
    fetchTeachers();
    if (!selectedImage) {
      setImage("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImage(objectUrl);
    // Desmontar la imagen para liberar la memoria
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCohort({ ...cohort, [name]: value, err: "", success: "" });
    // Solo una imagen
    console.log(e.target.value);
  };
  const handleChangeImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiAgora.post("http://localhost:3005/api/agora/new-cohort");
    console.log(res)
  }; */
  return (
    <>
      <h1>Crear Cohorte</h1>
      <form className={style.form} /* onSubmit={handleSubmit} */>
        <div className={style.inputs}>
          <div className={style.containerOne}>
            <input
              className={style.numberC}
              type="number"
              placeholder="#"
              name="numberCohort"
              value={numberCohort}
              onChange={handleChangeInput}
              min="1"
            />
            <input
              className={style.inputName}
              type="text"
              placeholder="Nombre de la cohorte"
              name="nameCohort"
              value={nameCohort}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className={style.textarea}
              placeholder="Description"
              name="descriptionCohort"
              value={descriptionCohort}
              onChange={handleChangeInput}
            ></textarea>
            <div className={style.containerTwo}>
              <input
                type="text"
                placeholder="Fecha de inico"
                name="startDateBootcamp"
                value={startDateBootcamp}
                onChange={handleChangeInput}
              />
              <input
                type="text"
                placeholder="Fecha final"
                name="endBootcamp"
                value={endBootcamp}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <select
                aria-label="Default select example"
                name="user"
                onChange={handleChangeInput}
              >
                <option selected>Formadores</option>
                {teachers.map((item) => (
                  <option>{item.firstName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className={style.img_preview}>
            <img className={style.image} src={image} alt="Logo Cohorte" />
          </div>
          <div className={style.file}>
            <p className={style.texto}>Agregar imagen</p>
            <input
              className={style.btn_add}
              type="file"
              accept="image/png, image/jpeg"
              name="imageCohort"
              value={imageCohort}
              onChange={handleChangeImage}
            />
          </div>
        </div>
      </form>
    </>
  );
}
