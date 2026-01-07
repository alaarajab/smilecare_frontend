import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css"; // Optional, you can keep extra styles

function RegisterModal({ isOpen, onClose, onLoginClick }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      onClose();
    } catch {
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      submitText={loading ? "Creating..." : "Create Account"}
      onSubmit={handleSubmit}
      loading={loading}
      footer={
        <>
          Already have an account?{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={onLoginClick}
          >
            Sign In
          </button>
        </>
      }
    >
      {error && <p className="modal__error">{error}</p>}

      <input
        className="modal__input"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      <input
        className="modal__input"
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="modal__input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        className="modal__input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
