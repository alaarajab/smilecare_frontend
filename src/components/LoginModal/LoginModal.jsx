import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm"; // ✅ ADDED
import "./LoginModal.css"; // Optional

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  // ✅ ADDED: useForm hook
  const { values, handleChange, isValid, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ values now come from useForm
    console.log(values);

    alert("Logged in with email!");
    resetForm(); // ✅ reset form after submit
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={() => {
        resetForm(); // ✅ reset when modal closes
        onClose();
      }}
      title="Sign In"
      submitText="Sign In"
      onSubmit={handleSubmit}
      loading={!isValid} // ✅ disables submit button
      footer={
        <>
          Don’t have an account?{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
        </>
      }
    >
      {/* ✅ CHANGED: controlled input */}
      <input
        className="modal__input"
        type="email"
        name="email" // ✅ REQUIRED for useForm
        placeholder="Email"
        value={values.email} // ✅ controlled
        onChange={handleChange} // ✅ useForm handler
        required
      />

      {/* ✅ CHANGED: controlled input */}
      <input
        className="modal__input"
        type="password"
        name="password" // ✅ REQUIRED
        placeholder="Password"
        value={values.password} // ✅ controlled
        onChange={handleChange} // ✅ useForm handler
        required
        minLength="6"
      />
    </ModalWithForm>
  );
}

export default LoginModal;
