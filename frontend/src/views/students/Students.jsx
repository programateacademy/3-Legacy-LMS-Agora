import React, { useState, useEffect } from "react";
import apiAgora from "../../api/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ProfilesTable } from "../../components/profilesTable/ProfilesTable";
import { Searchbar } from "../../components/searchbar/Searchbar";
import style from "./Students.module.css";
import { FaSearch } from "react-icons/fa";

export function Students() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  const params = useParams();
  const cohortID = params.id;
  const [cohortName, setCohortName] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");

  const fetchStudents = async (url, id) => {
    const res = await apiAgora.get(`api/all_students/${url}`, {
      headers: { Authorization: id },
    });
    setStudents(res.data);
  };

  const fetchCohortName = async (url, id) => {
    const resName = await apiAgora.get(`/api/agora/get-cohort/${url}`, {
      headers: { Authorization: id },
    });
    setCohortName(resName.data.nameCohort);
  };

  const filteredStudents = students.filter((item) => {
    return `${item.firstName} ${item.middleName} ${item.lastName} ${item.secondSurname} ${item.email} ${item.contactNumber}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        student
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );
  });

  useEffect(() => {
    fetchStudents(cohortID, id_user);
    fetchCohortName(cohortID, id_user);
  }, [cohortID, id_user]);

  return (
    <div className={style.container}>
      <h2>Estudiantes cohorte {cohortName}</h2>
      <div className={style.searchbar}>
        <div>
          <Searchbar student={student} setStudent={setStudent} />
        </div>

        <div>
          <FaSearch size={30} color="var(--colorYellow)" />
        </div>
      </div>
      
      <div className={style.studentsTable}>
        <ProfilesTable
          list={student ? filteredStudents : students}
          cohortID={cohortID}
        />
      </div>
    </div>
  );
}
