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
                  <td>{`${student.lastName} ${student.secondSurame}`}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>
                    <Link to={`profile/${student.id}`}>Ver perfil</Link>
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}
