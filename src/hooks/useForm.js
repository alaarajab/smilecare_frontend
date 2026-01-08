import { useState } from "react";

export function useForm(initialValues = {}, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // ✅ NEW
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prev) => {
      const nextValues = { ...prev, [name]: value };

      let error = "";

      if (e.target.validationMessage) {
        error = e.target.validationMessage;
      }

      if (!error && validators[name]) {
        error = validators[name](value, nextValues);
      }

      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors, [name]: error };

        const allFieldsFilled = Object.values(nextValues).every(
          (v) => v.toString().trim() !== ""
        );
        const noErrors = Object.values(nextErrors).every((e) => !e);
        setIsValid(allFieldsFilled && noErrors);

        return nextErrors;
      });

      return nextValues;
    });
  }

  // ✅ NEW: only mark field as touched on blur
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
  }

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    resetForm,
  };
}
