import { useCallback, useState } from "react";

export default function useForm(initialState = {}) {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const reset = useCallback(
    (newState = initialState) => setFormValues(newState),
    [initialState]
  );
  return [formValues, handleInputChange, reset];
}
