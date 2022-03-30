import React from 'react'
import style from "./ModalCreateAnnouncements.module.css"
import {VscError} from "react-icons/vsc"
export function ModalCreateAnnouncements(props) {
    const {setModal}=props
  return (
    <div className={style.modal}>
    <div className={style.containerModal}>
        <div className={style.close}>
            <button onClick={()=> setModal((prevState) => !prevState)}>
                <VscError size={30}/>
            </button>
        </div>
        <div className={style.containerTitle}>
            <h1> <u>Crear Anuncios</u> </h1>
        </div>
        <div className={style.modalInp}>
            <input type="text" placeholder="Titulo"/>
            <textarea name="" id="" cols="30" rows="10" placeholder="Comentario"></textarea>
        </div>
        <div className={style.modalButton}>
            <button>Crear</button>
        </div>
    </div>
</div>
  );
}