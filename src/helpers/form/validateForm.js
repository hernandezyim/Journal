import { types } from "../../types/msgError/types";

export const validateForm = (values, setError) => {
  const errors = {};
  const reExpEmail = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

  const NamesValues = {
    name: () => {
      if (!values.name) errors.name = types.name.required;
      if (!values.name && !values.password)
        errors.userAndPass = types.userAndPass.undefined;
    },
    username: () => {
      if (!values.username) errors.username = types.username.required;
    },
    email: () => {
      if (!values.email) errors.email = types.email.required;
      else if (!reExpEmail.exec(values.email))
        errors.email = types.email.invalid;
    },
    password: () => {
      if (!values.password) errors.password = types.password.required;
      // else if (values.password.length < 6)
      //   errors.password = types.password.characters;
    },
    password2: () => {
      if (!values.password2) errors.password2 = types.password2.undefined;
      else if (values.password2 !== values.password)
        errors.passAndPass2 = types.passAndPass2.notIqual;
    },
  };

  Object.keys(values).forEach((nameProperty) => {
    values[nameProperty] = values[nameProperty].trim();
    NamesValues[nameProperty]();
  });

  if (Object.keys(errors).length) {
    setError(errors);
    return false;
  }

  setError({});
  return true;
};
