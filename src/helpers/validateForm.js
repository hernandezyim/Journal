import types from "../types/msgError/types";

export default function validateForm(values) {
  const errors = {};
  const reExpEmail = /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

  const { name, userAndPass, email, password, passAndPass2, password2 } = types;

  const validValues = {
    name: () => {
      if (!values.name) errors.name = name.required;
      if (!values.name && !values.password)
        errors.userAndPass = userAndPass.undefined;
      if (values.name.length < 3 || values.name.length > 8)
        errors.name = name.characters;
    },
    email: () => {
      if (!values.email) errors.email = email.required;
      else if (!reExpEmail.exec(values.email)) errors.email = email.invalid;
    },
    password: () => {
      if (!values.password) errors.password = password.required;
      else if (values.password.length < 6 && values.name)
        errors.password = types.password.characters;
    },
    passwordConfirmation: () => {
      if (!values.passwordConfirmation) errors.password2 = password2.undefined;
      else if (values.passwordConfirmation !== values.password)
        errors.passAndPass2 = passAndPass2.notIqual;
    },
  };

  Object.keys(values).forEach((key) => {
    values[key] = values[key].trim();
    validValues[key]();
  });

  return Object.keys(errors).length ? errors : null;
}
