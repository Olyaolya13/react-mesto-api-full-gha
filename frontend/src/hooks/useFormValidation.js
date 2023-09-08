import { useState, useCallback } from 'react';

const useFormValidation = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  const handleChange = evt => {
    const { name, value, validationMessage, form, valid: isValid } = evt.target;

    setValue(obj => ({
      ...obj,
      [name]: value
    }));
    setError(err => ({
      ...err,
      [name]: validationMessage
    }));
    setIsInputValid(obj => ({
      ...obj,
      [name]: isValid
    }));
    setIsValid(form.checkValidity());
  };

  const resetValidation = useCallback(initialValues => {
    setValue(initialValues || {});
    setError({});
    setIsValid(false);
    setIsInputValid({});
  }, []);

  return {
    value,
    error,
    isValid,
    isInputValid,
    handleChange,
    resetValidation
  };
};

export default useFormValidation;
