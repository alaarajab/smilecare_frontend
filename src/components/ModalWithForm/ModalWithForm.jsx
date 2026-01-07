import React from "react";
import closeIcon from "../../assets/closeIcon_gray.png";
import "./ModalWithForm.css";

// ✅ NEW: import useForm
import { useForm } from "../../hooks/useForm";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
  footer,
  loading = false,
}) {
  // ✅ NEW: initialize useForm
  const { isValid } = useForm();
  // NOTE: Modal itself only needs isValid
  // Inputs will use handleChange via cloning (see below)

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
          {/* 
            ✅ IMPORTANT CHANGE:
            We inject form props into children WITHOUT changing their structure
          */}
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  // child will receive handleChange, errors, etc. if needed
                })
              : child
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isValid || loading} // ✅ controlled validation
          >
            {submitText}
          </button>
        </form>

        {/* Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default ModalWithForm;
