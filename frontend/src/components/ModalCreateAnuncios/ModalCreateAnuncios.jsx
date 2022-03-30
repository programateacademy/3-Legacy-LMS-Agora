import React from 'react'
import "./ModalCreateAnuncios.css"
export function ModalCreateAnuncios() {
  return (
    <div class="modal">
    <div class="containerModal">
        <div>
            <button class="close">
                cerrar
            </button>
        </div>
        <div class="containerTitle">
            <h1> <u>Crear Anuncios</u> </h1>
        </div>
        <div class="modalInp">
            <input type="text" placeholder="Titulo"/>
            <textarea name="" id="" cols="30" rows="10" placeholder="Comentario"></textarea>
        </div>
        <div class="modalButton">
            <button>Crear</button>
        </div>
    </div>
</div>
  );
}