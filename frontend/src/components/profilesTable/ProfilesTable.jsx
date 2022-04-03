import React from "react";
import { Link } from "react-router-dom";
import style from "../table/Table.module.css";
export function ProfilesTable(props) {
  const { list, cohortID } = props;

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
        {list
          ? list.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{`${student.firstName} ${student.middleName}`}</td>
                  <td>{`${student.lastName} ${student.secondSurame}`}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>
                    <Link to={`/profile/${cohortID}/${student.id}`}>
                      Ver perfil
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
