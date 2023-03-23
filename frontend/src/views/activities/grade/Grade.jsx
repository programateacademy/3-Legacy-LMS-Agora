import React, { useState, useEffect } from "react";
import styles from "./Grade.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiAgora from "../../../api";

export function Grade() {
  const auth = useSelector((state) => state.auth);
  const id_user = auth.user.id;
  let navigate = useNavigate();
  const params = useParams();
  const activityID = params.id;
  const kind = params.kind;
  const cohortID = params.cohort;
  const [students, setStudents] = useState([]);
  const [activity, setAtivity] = useState([]);
  const [infoActivity, setInfoActivity] = useState("");

  const fetchStudents = async (url, id) => {
    const res = await apiAgora.get(`api/cohort/all_students/${url}`, {
      headers: { Authorization: id },
    });
    setStudents(res.data);
  };
  const fetchActivity = async (url, id) => {
    const res = await apiAgora.get(`api/agora/get-delivery-activity/${url}`, {
      headers: { Authorization: id },
    });
    const studentsIDs = res.data;
    const aa = studentsIDs.map((item) => item.userID);
    const aaa = aa.filter((e, index) => aa.indexOf(e) === index);
    setAtivity(aaa);
  };

  const fetchInfoActivity = async (kind, activity, url, id) => {
    const res = await apiAgora.get(`/api/agora/get-${activity}/${url}`, {
      headers: { Authorization: id },
    });
    if (kind === "project") {
      setInfoActivity(res.data.titleProject);
    }
    if (kind === "workbook") {
      setInfoActivity(res.data.titleWorkbook);
    }
    if (kind === "query") {
      setInfoActivity(res.data.titleQuery);
    }
  };

  useEffect(() => {
    fetchInfoActivity(kind, activityID, id_user);
    fetchActivity(activityID, id_user);
    fetchStudents(cohortID, id_user);
  }, [kind, cohortID, id_user, activityID]);

  const orderedTableList = students.sort((a, b) => {
    return a.lastName.toUpperCase() > b.lastName.toUpperCase() ? 1 : -1;
  });
  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button_return} onClick={() => navigate(-1)}>
          <i className="ri-arrow-go-back-line"></i>
        </button>
        <h3 className={styles.title}>{infoActivity}</h3>
      </div>
      <div className={styles.studentsTableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderedTableList.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.firstName + " " + user.middleName}</td>
                  <td>{user.lastName + " " + user.secondSurname}</td>
                  <td>
                    {activity.find((e) => e === user.id)
                      ? "Entrego"
                      : "No Entrego"}
                  </td>
                  <td>
                    <Link
                      to={`/deliveryTeacher/${kind}/${activityID}/${user.id}`}
                    >
                      <i
                        class="ri-eye-2-line"
                      ></i>

                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
