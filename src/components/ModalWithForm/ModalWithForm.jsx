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

  // ✅ NEW: controlled submit handler
  function handleSubmit(e) {
    e.preventDefault(); // disable native validation UI
    onSubmit(e); // keep your existing submit logic
  }

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icoForm" />
        </button>

        {/* Title */}
        <h2 className="modal__title">{title}</h2>

        {/* Form */}
        <form
          className="modal__form"
          onSubmit={handleSubmit} // ✅ CHANGED
          noValidate // ✅ DISABLE native browser validation
        >
          {children}

          {/* Submit Button */}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isValid} // ✅ controlled validation
          >
            {loading ? "Processing..." : submitText}
          </button>
        </form>

        {/* Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default ModalWithForm;
