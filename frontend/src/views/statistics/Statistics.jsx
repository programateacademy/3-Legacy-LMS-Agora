import React from "react";
import style from "./Statistics.module.css";
export function Statistics() {
  const a = [
    { label: "Progreso de la cohorte", id: "progreso", value: 80.5 },
    { label: "Tasa de éxito de la cohorte", id: "tasa", value: 30 },
    { label: "Mi Tasa de éxito", id: "Mitasa", value: 40 },
  ];
  return (
    <>
      <div className={style.contAllStatistics}>
        <h3 className={style.estitle}>Estadísticas</h3>
        <div className={style.Recuadro}>
          {a.map((item, index) => (
            <div key={index} className={style.progressBar}>
              <label for={item.label}>{item.label}</label>
              <progress id={item.label} max="100" value={item.value} className={item.id}>
                {item.value} 
              </progress>
            </div>
          ))}
          <div className={style.cont}>
            <div className={style.contenedores}>
              <label>entregas corregidas:</label>
              <div className={style.contTareasEntregas}>
                <div className={style.contQuality}>
                  <h2>5</h2>
                  <span>/</span>
                  <h2>9</h2>
                </div>
              </div>
            </div>
            <div className={style.contenedores}>
              <label>Insignias:</label>
              <div className={style.contInsignias}>
                <div className={style.contQuality}>
                  <h2>5</h2>
                  <span>/</span>
                  <h2>9</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
