import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm"; // ✅ useForm

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  // ✅ useForm manages all input values and validation
  const { values, errors, handleChange, resetForm, isValid } = useForm(
    {
      email: "",
      password: "",
    },
    {
      // ✅ Custom validation rules
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : "",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : "",
    }
  );

  const handleClose = () => {
    resetForm(); // ✅ clears everything
    onClose(); // ✅ closes modal
  };

  const handleSubmit = () => {
    console.log("Login values:", values); // ✅ values from useForm

    resetForm(); // ✅ reset after submit
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign In"
      submitText="Sign In"
      onSubmit={handleSubmit}
      isValid={isValid}
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
      {/* ✅ controlled inputs */}
      {/* Email */}
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="login-email"
          className="modal__input"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      {/* Password */}
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="login-password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
