import React from "react";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  if (!isOpen) return null; // don't render if modal is closed

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call your API to log in
    alert("Logged in with email!");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
        <p className="modal-footer">
          You don’t have an account?{" "}
          <span className="modal-link" onClick={onRegisterClick}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
