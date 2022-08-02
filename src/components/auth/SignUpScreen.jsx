import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, setErrors } from "../../actions/ui";

import validateForm from "../../helpers/validateForm";
import useForm from "../../hooks/useForm";
import LoadingScreen from "../ui/LoadingScreen";
import HelperText from "../ui/HelperText";
import useUi from "../../hooks/useUi";
import startAuth from "../../services/auth/startAuth";

export default function SignUpScreen() {
  const dispatch = useDispatch();

  const { loading, errors } = useUi();

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { name, email, password, passwordConfirmation } = formValues;

  const handleSignUp = (event) => {
    event.preventDefault();

    const errors = validateForm({ ...formValues });

    if (errors) return dispatch(setErrors(errors));

    dispatch(clearErrors());
    dispatch(startAuth({ name, email, password }));
  };

  useEffect(
    () => () => errors && dispatch(clearErrors()),
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className="auth__box-container bg-white animate__animated animate__flip"
        id="sign-up"
      >
        <h3 className="auth__title text-center fw-bold">Registro</h3>
        <form
          onSubmit={handleSignUp}
          noValidate
          autoComplete="off"
          spellCheck={false}
        >
          <input
            type="text"
            placeholder="Nombre completo"
            name="name"
            className={`form-control mb-1 ${errors.name ? "error" : ""}`}
            onChange={handleInputChange}
            value={name}
          />
          <HelperText msg={errors.name} />
          <input
            type="email"
            placeholder="Dirección de correo"
            name="email"
            className={`form-control mb-1 ${errors.email ? "error" : ""}`}
            onChange={handleInputChange}
            value={email}
          />
          <HelperText msg={errors.email} />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className={`form-control mb-1 ${
              errors.password || errors.passAndPass2 ? "error" : ""
            }`}
            onChange={handleInputChange}
            value={password}
          />
          <HelperText msg={errors.password} />

          <input
            type="password"
            placeholder="Confirmación de contraseña"
            name="passwordConfirmation"
            className={`form-control mb-1 ${
              errors.password2 || errors.passAndPass2 ? "error" : ""
            }`}
            onChange={handleInputChange}
            value={passwordConfirmation}
          />
          <HelperText msg={errors.password2} />
          <HelperText msg={errors.passAndPass2} />

          <button
            type="submit"
            className="btn btn-primary btn-block mb-3 w-100"
          >
            Crear cuenta
          </button>

          <Link to="/auth/sign-in" className="btn a text-primary fw-bold">
            Ya estás registrado?
          </Link>
        </form>
      </div>
    </>
  );
}
