import React from "react";
import style from "./Statistics.module.css";
export function Statistics() {
  const a = [
    { label: "Progreso de la cohorte", value: 80.5 },
    { label: "Tasa de éxitode la cohorte", value: 30 },
  ];
  return (
    <div>
      <h3>Estadísticas</h3>
      {a.map((item, index) => (
        <div key={index} className={style.progressBar}>
          <label for={item.label}>{item.label}</label>
          <progress id={item.label} max="100" value={item.value}>
            {item.value}
          </progress>
        </div>
      ))}
    </div>
  );
}
