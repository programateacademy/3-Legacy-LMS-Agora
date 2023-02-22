import React, { useState, useEffect } from "react";
import style from "../CreateUpdateCohort.module.css";
import { MdDeleteForever, MdOutlineAddCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from "../../../utils/notification";
import apiAgora from "../../../api/index";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LazyLoad from "react-lazy-load";
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
    const startDateBootcamp2 = res.data.startDateBootcamp;
    const endBootcamp2 = res.data.endBootcamp;
    setCohort({
      ...cohort,
      startDateBootcamp: new Date(startDateBootcamp2).toLocaleDateString(
        "en-CA"
      ),
      err: "",
      success: "",
      endBootcamp: new Date(endBootcamp2).toLocaleDateString("en-CA"),
    });
  };

  const alertErase = (cohortID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar esta Cohorte?",
      text: "Este proceso no es reversible, recuerde borrar primero sus Estudiantes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBootcamp(cohortID);
        Swal.fire("Completado", "El Bootcamp ha sido eliminado", "success");
      }
    });
  };

  const deleteBootcamp = async (cohortID) => {
    await apiAgora.delete("api/agora/delete-cohort/" + cohortID, {
      headers: { Authorization: id_user },
    });
    navigate(-1);
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
        showSuccessMsg("Cohorte Actualizada","Los cambios en la cohorte se ha realizado satisfactoriamente");
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
  }, [id_user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={style.formContainer}>
        <div className={style.button_container}>
          <button className={style.button_return} onClick={() => navigate(-1)}>
            <BsArrowLeftCircle size={30} />
          </button>
          <button
            type="button"
            className={style.button_clear}
            onClick={() => alertErase(cohortID)}
          >
            Eliminar Cohorte
          </button>
        </div>
        <div className={style.wrapper}>
          <h2 className={style.typing_upgrade}>Actualizar Cohorte</h2>
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
                  placeholder="Description"
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
            <LazyLoad className={style.img_preview}>
              <img className={style.image} src={image} alt="Logo Cohorte" />
            </LazyLoad>
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
                Actualizar Cohorte
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
