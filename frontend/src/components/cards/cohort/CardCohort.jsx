import React from "react";
import styles from "./CardCohort.module.css";
import { Button } from "../../buttons/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { dispatchMenuHide } from "../../../redux/actions/menuAction";
export function CardCohort({ info, principal, teacher }) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const { menuView } = menu;

  const {
    id,
    nameCohort,
    numberCohort,
    imageCohort,
    descriptionCohort,
    startDateBootcamp,
    endBootcamp,
  } = info;
  return (
    <div>
      <div className={styles.cohort}>
        <div className={styles.cohortImage}>
          <img src={imageCohort} alt={nameCohort} />
        </div>
        <div className={styles.cohortInfo}>
          <h3>{`${nameCohort} - Cohorte ${numberCohort}`}</h3>
          <p>{descriptionCohort}</p>
          <h5>{`Duración: ${new Date(
            startDateBootcamp
          ).toLocaleDateString()} - ${new Date(
            endBootcamp
          ).toLocaleDateString()}`}</h5>
        </div>
        {teacher ? (
          <div
            onClick={() => dispatch(dispatchMenuHide())}
            className={styles.buttonsContainer}
          >
            <Button title="Dashboard" link={`dashboard/${id}/statistics`} />
          </div>
        ) : (
          <div className={styles.buttonsContainer}>
            {principal ? (
              <Button
                title="Dashboard"
                link={`/bootcamp/dashboard-cohort/${id}`}
              />
            ) : null}
            <Button
              title="Estudiantes"
              link={`/bootcamp/cohort/students/${id}`}
            />
            <Button title="Editar" link={`/cohort/update/${id}`} />
          </div>
        )}
      </div>
    </div>
  );
}
