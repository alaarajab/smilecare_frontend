import { useState, useEffect } from "react";

export function useForm(initialValues = {}, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validate all fields whenever values or errors change
  useEffect(() => {
    const noErrors = Object.values(errors).every((e) => !e);
    const requiredFieldsFilled = Object.keys(validators).every((field) => {
      const value = values[field];
      const error = validators[field] ? validators[field](value, values) : "";
      return !error;
    });

    setIsValid(noErrors && requiredFieldsFilled);
  }, [values, errors, validators]);

  // Update values and run validation
  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    setValues((prev) => {
      const nextValues = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Validate the changed field
      let error = "";
      if (validators[name]) {
        error = validators[name](nextValues[name], nextValues);
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

      return nextValues;
    });
  }

  // Track touched fields (optional for showing errors only after blur)
  
  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  // Reset form to initial state
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
    isValid, // now automatically considers conditional validation
    handleChange,
    handleBlur,
    resetForm,
  };
}
