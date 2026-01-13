import React from "react";
import closeIcon from "../../assets/closeIcon_gray.png";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
  footer,
  isValid,
  loading = false,
}) {
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault(); // disable native validation UI
    onSubmit(e);
  }

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icoForm" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          {children}

          <button type="submit" className="modal__submit" disabled={!isValid}>
            {loading ? "Processing..." : submitText}
          </button>
        </form>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default ModalWithForm;
