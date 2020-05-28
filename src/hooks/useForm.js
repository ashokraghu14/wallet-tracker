import {useState, useEffect} from 'react';

const useForm = (callBack, validate) => {
  const [values, setValues] = useState({date: "", description:"", income:"", amount:""});
    const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const {name, value} = event.target;
    setValues({
      ...values, [name] : value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors(validate(values));
    }
    if (isSubmitting) {
      setIsSubmitting(false);
    }
  }, [values]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callBack();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors
  };
}

export default useForm;
