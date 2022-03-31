import React from "react";
import styles from "./Table.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import apiAgora from "../../api";
import Swal from "sweetalert2";

export function Table(props) {
  const { tableList, superAdminID, adminID, fetchUser } = props;

  const alertErase = (userID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar este usuario?",
      text: "Este proceso no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userID);
        Swal.fire("Completado", "El usuario ha sido eliminado", "success");
      }
    });
  };

  const deleteUser = async (userID) => {
    if (superAdminID != null) {
      await apiAgora.delete("api/delete_admin/" + userID, {
        headers: { Authorization: superAdminID },
      });
      fetchUser();
    }
    if (adminID != null) {
      await apiAgora.delete("api/delete_user/" + userID, {
        headers: { Authorization: adminID },
      });
      fetchUser();
    }
  };

  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {tableList.map((user, index) => {
          return (
            <tr key={index}>
              <td>{user.firstName + " " + user.middleName}</td>
              <td>{user.lastName + " " + user.secondSurname}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                <Link
                  to={
                    superAdminID
                      ? "/update_admin/" + user.id
                      : adminID
                      ? "/update_user/" + user.id
                      : "/"
                  }
                  className={styles.edit}
                >
                  <FiEdit />
                </Link>
              </td>
              <td>
                <button
                  className={styles.delete}
                  onClick={() => alertErase(user.id)}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
