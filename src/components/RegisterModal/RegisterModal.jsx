import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useUser } from "../../context/UserContext";

function RegisterModal({ isOpen, onClose, onLoginClick }) {
  const { values, handleChange, resetForm, errors, isValid } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: (value) => (!value.trim() ? "Name is required" : ""),
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : "",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : "",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : "",
    }
  );
  const handleClose = () => {
    resetForm();
    onClose();
  };
  const { login } = useUser();
  /*
  const handleSubmit = () => {
    console.log("Register data:", values);

    resetForm();
    onClose();
  }; */
  const handleSubmit = () => {
    const newUser = { name: values.name, email: values.email };
    login(newUser); // ✅ sets user
    onClose();
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={handleClose}
      title="Sign Up"
      submitText="Create Account"
      onSubmit={handleSubmit}
      isValid={isValid}
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
      {/* Name */}
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Your name"
          value={values.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      {/* Password */}
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="register-confirm-password" className="modal__label">
        Password Confirmation
        <input
          className="modal__input"
          type="password"
          name="confirmPassword"
          id="register-confirm-password"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <span className="modal__error">{errors.confirmPassword}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
