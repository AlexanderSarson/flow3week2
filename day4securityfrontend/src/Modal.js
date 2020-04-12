import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal");

const Modal = ({ children, toggleModalLogin }) => {
  const modalRef = useRef(null);
  if (!modalRef.current) {
    modalRef.current = document.createElement("div");
  }
  useEffect(() => {
    modalRoot.appendChild(modalRef.current);
    function keyListener(e) {
      if (e.keyCode === 27) {
        toggleModalLogin();
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => modalRoot.removeChild(modalRef.current);
  }, [])

  return createPortal(<div>{children}</div>, modalRef.current);
}

export default Modal;