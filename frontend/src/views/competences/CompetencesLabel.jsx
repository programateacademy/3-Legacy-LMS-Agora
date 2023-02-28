import React from "react";
import styles from "./competences.module.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import apiAgora from "../../api/index";

export function CompetencesLabel(props) {
  const {
    identifierCompetence,
    competenceID,
    name,
    adminID,
    fetchCohortCompetence,
  } = props;

  const alertErase = (userID) => {
    Swal.fire({
      background: "#E5E5E5",
      title: "¿Desea eliminar esta competencia?",
      text: "Este proceso no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC02",
      cancelButtonColor: "#010101",
      confirmButtonText: "Si, seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompetence(userID);
        Swal.fire("Completado", "La competencia ha sido eliminada", "success");
      }
    });
  };

  const deleteCompetence = async (competenceID) => {
    if (adminID != null) {
      await apiAgora.delete("api/agora/delete-competence/" + competenceID, {
        headers: { Authorization: adminID },
      });
      fetchCohortCompetence();
    }
  };

  return (
    <div className={styles.cardReferences}>
      <p>
        {identifierCompetence} {name}
      </p>
      <Link
        className={styles.button__edit}
        to={"/competences-update/" + competenceID}
      >
        <i className="ri-edit-line"></i>
      </Link>
      <button
        className={styles.button__delete}
        onClick={() => alertErase(competenceID)}
      >
        <i className="ri-delete-bin-5-line"></i>
      </button>
    </div>
  );
}
