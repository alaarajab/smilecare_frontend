import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm"; // ✅ useForm
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose, onRegisterClick }) {
  const { values, errors, handleChange, resetForm, isValid } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email address" : "",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : "",
    },
  );

  const handleClose = () => {
    resetForm();
    onClose();
  };
  const { login } = useUser();
  const navigate = useNavigate();

  /*const handleSubmit = () => {
    console.log("Login values:", values); 

    resetForm(); 
    onClose();
  };*/
  const handleSubmit = async () => {
    try {
      console.log("LOGIN SUBMIT:", values); // optional proof

      await login({ email: values.email, password: values.password });

      resetForm();
      onClose();
      navigate("/profile");
    } catch (err) {
      console.error("LOGIN FAILED:", err);
      // Optional: show error in UI if you have a state for it
    }
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
