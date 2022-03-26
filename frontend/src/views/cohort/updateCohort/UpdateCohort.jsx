import React, { useState, useEffect } from "react";
import style from "./UpdateCohort.module.css";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import apiAgora from "../../../api";
import { useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function UpdateCohort() {
  const params = useParams();
  const cohortID = params.id;
  let navigate = useNavigate();

  const [cohort, setCohort] = useState({});
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
  const fetchTeachers = async () => {
    const res = await apiAgora.get("api/all_teacher", {
      headers: { Authorization: id_user },
    });
    setTeachers(res.data);
    fetchCohort(res.data);
  };

  // Get info selected teacher
  const handleChangeSelect = (e) => {
    setSelectedTeacher({
      id: e.target.value,
      fullName: e.target.options[e.target.selectedIndex].text,
    });
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

  const onClearTeacher = (userID) => {
    setAddedTeacher(addedTeacher.filter((e) => e.id !== userID));
    setAssignedTeachersID(assignedTeachersID.filter((e) => e !== userID));
  };

  const fetchCohort = async (data) => {
    const res = await apiAgora.get(`/api/agora/get-cohort/${cohortID}`, {
      headers: { Authorization: id_user },
    });
    setCohort(res.data);
    setImage(res.data.imageCohort);
    const listTeacherAssigned = res.data.assignedTeachersID;
    listTeacherAssigned.map((item) =>
      setAddedTeacher((prev) => [
        ...prev,
        {
          name: data
            .map((e) =>
              e.id === item
                ? e.firstName +
                  " " +
                  e.middleName +
                  " " +
                  e.lastName +
                  " " +
                  e.secondSurname
                : ""
            )
            .toLocaleString()
            .split(","),
          id: item,
        },
      ])
    );
    listTeacherAssigned.map((item) =>
      setAssignedTeachersID((prev) => [...prev, item])
    );
  };
  // Create new cohort
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (auth.isAdmin) {
        const res = await apiAgora.put(
          `/api/agora/update-cohort/${cohortID}`,
          {
            assignedTeachersID,
            nameCohort,
            numberCohort,
            imageCohort,
            descriptionCohort,
            startDateBootcamp,
            endBootcamp,
          },
          {
            headers: { Authorization: id_user },
          }
        );
        showSuccessMsg(success);
        setCohort({ ...cohort, err: "", success: res.data.msg });
      }
    } catch (err) {
      showErrMsg(err.response.data.msg);
      err.response.data.msg &&
        setCohort({ ...cohort, err: err.response.data.msg, success: "" });
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className={style.formContainer}>
      <button className={style.button_return} onClick={() => navigate(-1)}>
        <BsArrowLeftCircle size={30} />
      </button>
      <h1>Actualizar información de la Cohorte</h1>
      <form className={style.form} onSubmit={handleSubmit}>
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
                Agregar
              </button>
              {addedTeacher.length !== 0
                ? addedTeacher.map((item, index) => (
                    <div key={index} className={style.teacherSelect}>
                      <li>{item.name}</li>
                      <button onClick={() => onClearTeacher(item.id)}>
                        <MdDeleteForever />
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
            <p className={style.texto}>Agregar imagen</p>
            <input
              className={style.input__logoURL}
              placeholder="Inserta URL de la imagen Bootcamp"
              type="text"
              name="imageCohort"
              value={imageCohort}
              onChange={handleImage}
            />
          </div>
        </div>
        
      </form>
      <div className={style.createCohort}>
        <button className={style.buttonCreateCohort} type="submit">
          Actualizar Cohorte
        </button>
      </div>
    </div>
  );
}
