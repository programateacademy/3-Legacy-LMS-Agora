import React from "react";
import "./modalEditimg.css"
import close_buttom from "../../assets/icons/close_page.svg"

const Modal_edit = ({state, chageState}) => {
    return(
        <>
            {state && 
                <div className="Overlay-modal">
                    <div className="container-modal">
                        <div>
                        <div className="cajaUlt">
                                <input
                                    className="input__imageURL"
                                    placeholder="Inserta URL de la imagen"
                                    type="text"
                                    name="image"
                                />
                            </div>
                        </div>
                        <button onClick={() => chageState(false)} className="close_button"><img src={close_buttom}/></button>
                    </div>
                </div> 
            } 
        </>
    )
}

export default Modal_edit;