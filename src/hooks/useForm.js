import { useState } from "react";

export default function useForm(initialState = {}) {
  const [values, setFormValues] = useState(initialState);

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setFormValues({ ...values, [name]: value });
  };

  return [values, handleInputChange];
}
