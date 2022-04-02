import React, { useState, useEffect } from "react";
import style from "../CreateUpdateCohort.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import apiAgora from "../../../api";
import { useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const initialStateCohort = {
  nameCohort: "",
  numberCohort: "",
  imageCohort: "",
  descriptionCohort: "",
  startDateBootcamp: "",
  endBootcamp: "",
  err: "",
  success: "",
};

export function CreateCohort() {
  const params = useParams();
  const bootcampID = params.id;
  let navigate = useNavigate();

  const [cohort, setCohort] = useState(initialStateCohort);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({
    id: "",
    fullName: "",
  });
  const [addedTeacher, setAddedTeacher] = useState([]);
  const [assignedTeachersID, setAssignedTeachersID] = useState([]);
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const [image, setImage] = useState("");
  const {
    nameCohort,
    numberCohort,
    imageCohort,
    descriptionCohort,
    startDateBootcamp,
    endBootcamp,
    success,
  } = cohort;

  //Info Cohort
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCohort({ ...cohort, [name]: value, err: "", success: "" });
  };
  // Get teachers info from database
  const fetchTeachers = async (id) => {
    const res = await apiAgora.get("api/all_teacher", {
      headers: { Authorization: id },
    });
    setTeachers(res.data);
  };

  // Get info selected teacher
  const handleChangeSelect = (e) => {
    setSelectedTeacher({
      id: e.target.value,
      fullName: e.target.options[e.target.selectedIndex].text,
    });
  };

  // Add teachers info to database
  const onClickTeacher = () => {
    if (
      selectedTeacher.id &&
      !assignedTeachersID.includes(selectedTeacher.id)
    ) {
      setAddedTeacher((prev) => [
        ...prev,
        { name: selectedTeacher.fullName, id: selectedTeacher.id },
      ]);
      setAssignedTeachersID((prev) => [...prev, selectedTeacher.id]);
    }
  };

  const handleImage = (e) => {
    const { name, value } = e.target;
    setCohort({
      ...cohort,
      [name]: value,
      err: "",
      success: "",
    });
    setImage(value);
  };

  const onClearTeacher = (userID) => {
    setAddedTeacher(addedTeacher.filter((e) => e.id !== userID));
    setAssignedTeachersID(assignedTeachersID.filter((e) => e !== userID));
  };

  // Create new cohort
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.post(
          "/api/agora/new-cohort",
          {
            bootcampID,
            assignedTeachersID,
            imageCohort,
            nameCohort,
            numberCohort,
            descriptionCohort,
            startDateBootcamp,
            endBootcamp,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg("Nueva Cohorte","se ha registrado una nueva cohorte satisfactoriamente");
        setCohort({ ...cohort, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setCohort({ ...cohort, err: err.response.data.msg, success: "" });
    }
  };

  useEffect(() => {
    fetchTeachers(id_user);
  }, [id_user]);
  return (
    <div className={style.formContainer}>
      <button className={style.button_return} onClick={() => navigate(-1)}>
        <BsArrowLeftCircle size={30} />
      </button>
      <div className={style.wrapper}>
        <h2 className={style.typing_demo}>Crear Cohorte</h2>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.containerOne}>
            <div className={style.numberC}>
              <input
                type="number"
                placeholder="#"
                name="numberCohort"
                value={numberCohort}
                onChange={handleChangeInput}
                min="1"
              />
            </div>
            <div className={style.inputName}>
              <input
                type="text"
                placeholder="Nombre de la cohorte"
                name="nameCohort"
                value={nameCohort}
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div>
            <div className={style.textarea}>
              <textarea
                placeholder="Descripción"
                name="descriptionCohort"
                value={descriptionCohort}
                onChange={handleChangeInput}
              ></textarea>
            </div>
            <div className={style.containerTwo}>
              <div className={style.initialDate}>
                <label>Fecha de inicio</label>
                <input
                  type="date"
                  placeholder="Fecha de inico"
                  name="startDateBootcamp"
                  value={startDateBootcamp}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={style.finalDate}>
                <label>Fecha final</label>
                <input
                  type="date"
                  placeholder="Fecha final"
                  name="endBootcamp"
                  value={endBootcamp}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className={style.containerFormadores}>
              <div className={style.select}>
                <select
                  aria-label="Default select example"
                  name="user"
                  onChange={handleChangeSelect}
                >
                  <option value="" selected>
                    Formadores
                  </option>
                  {teachers.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.firstName} {item.middleName} {item.lastName}{" "}
                      {item.secondSurname}
                    </option>
                  ))}
                </select>
                <button
                  className={style.buttonAdd}
                  type="button"
                  onClick={onClickTeacher}
                >
                  <MdOutlineAddCircle size={30} />
                </button>
              </div>
              {addedTeacher.length !== 0
                ? addedTeacher.map((item, index) => (
                    <div key={index} className={style.teacherSelect}>
                      <li>{item.name}</li>
                      <button
                        onClick={() => onClearTeacher(item.id)}
                        type="button"
                      >
                        <MdDeleteForever size={25} />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div>
          <div className={style.img_preview}>
            <img className={style.image} src={image} alt="Logo Cohorte" />
          </div>
          <div className={style.file}>
            <input
              className={style.input__logoURL}
              placeholder="Inserta URL de la imagen Bootcamp"
              type="text"
              name="imageCohort"
              value={imageCohort}
              onChange={handleImage}
            />
          </div>
          <div className={style.container_submit}>
            <button className={style.buttonCreateCohort} type="submit">
              Crear Cohorte
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
