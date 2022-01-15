import { useCallback, useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const reset = useCallback(
    (newState = initialState) => setFormValues(newState),
    [initialState]
  );
  // const reset = (newState = initialState) => setFormValues(newState);

  return [formValues, handleInputChange, reset];
};
