//Importamos las funciones de React y exportamos la función con un html de contenido
import React from "react";

export function Error404() {
  return (
    <div style={{ height: "75vh", padding: "90px" }}>
      <h2>Error 404 - Aquí no hay nada que mostrar</h2>
      <p>Selecciona otro link en el menu de navegación</p>
    </div>
  );
}
