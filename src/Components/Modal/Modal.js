import React from 'react';
import './Modal.css';

const Modal = ({selectedImage, setSelectedImage}) => {

    const clickhandler =(event) => {
        if(event.target.classList.contains("modal__backdrop")){
            setSelectedImage(null);
        }   
    }
    return (
        <div className="modal__backdrop" onClick={clickhandler}>
            <img src={selectedImage} alt=""/>
        </div>
    )
}

export default Modal;
