import React from "react";
import { Link } from "react-router-dom";
import style from "../table/Table.module.css";
export function ProfilesTable(props) {
  const { list, cohortID } = props;

  const students = list.sort((a, b) => {
    return a.lastName.toUpperCase() > b.lastName.toUpperCase() ? 1 : -1;
  });
  return (
    <table className={style.userTable}>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Perfil</th>
        </tr>
      </thead>
      <tbody>
        {students
          ? students.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{`${student.firstName} ${student.middleName}`}</td>
                  <td>{`${student.lastName} ${student.secondSurname}`}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>
                    <Link
                     Style={{
                        textDecoration: 'none'
                     }}
                      to={`/profile/${cohortID}/${student.id}`}
                    >
                      <i 
                        class="ri-eye-fill"
                        style={{
                          fontSize: "30px",
                          color: "var(--colorYellow_65)",
                          transition: "color 0.2s ease-in-out"
                          
                        }}
                       
                      ></i>
                    </Link>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}
