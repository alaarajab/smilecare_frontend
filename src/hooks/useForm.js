import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const form = e.target.closest("form");

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: e.target.validationMessage,
    }));

    setIsValid(form.checkValidity());
  }

  function resetForm(newValues = {}, newErrors = {}, newIsValid = false) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
