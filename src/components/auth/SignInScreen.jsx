import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, setErrors } from "../../actions/ui";
import { CLIENT_ID } from "../../configs/keys";

import validateForm from "../../helpers/validateForm";
import useForm from "../../hooks/useForm";
import HelperText from "../ui/HelperText";
import LoadingScreen from "../ui/LoadingScreen";
import useUi from "../../hooks/useUi";
import startAuth from "../../services/auth/startAuth";
import startGoogleSignIn from "../../services/auth/startGoogleSignIn";

export default function SignInScreen() {
  const dispatch = useDispatch();
  const { loading, errors } = useUi();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const googleBtn = useRef();

  const { email, password } = formValues;

  const handleSignIn = (event) => {
    event.preventDefault();

    const errors = validateForm({ ...formValues });

    if (errors) return dispatch(setErrors(errors));

    dispatch(clearErrors());
    dispatch(startAuth({ email, password }));
  };

  const handleGoogleSignIn = ({ credential }) =>
    dispatch(startGoogleSignIn(credential));

  useEffect(
    () => {
      /* global google */
      const { initialize, renderButton } = google.accounts.id;

      const configAuthGoogle = {
        client_id: CLIENT_ID,
        callback: handleGoogleSignIn,
      };

      const configButton = {
        theme: "filled_blue",
        width: 310,
      };

      initialize(configAuthGoogle);
      renderButton(googleBtn.current, configButton);

      return () => errors && dispatch(clearErrors());
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {loading && <LoadingScreen />}
      <div
        className="auth__box-container bg-white animate__animated animate__flip"
        id="sign-in"
      >
        <h3 className="auth__title text-center mb-3 fw-bold">Journal App</h3>
        <form
          onSubmit={handleSignIn}
          noValidate
          autoComplete="off"
          spellCheck={false}
        >
          <input
            type="email"
            placeholder="Dirección de correo"
            name="email"
            className={`form-control mb-2 ${
              errors.email || errors.emailAndPass ? "error" : ""
            }`}
            onChange={handleInputChange}
            value={email}
          />
          <HelperText msg={errors.email} />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className={`form-control mb-2 ${
              errors.password || errors.emailAndPass ? "error" : ""
            }`}
            onChange={handleInputChange}
            value={password}
          />
          <HelperText msg={errors.password} />
          <HelperText msg={errors.emailAndPass} />

          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
          <div className="py-3" ref={googleBtn} />
          <Link to="/auth/sign-up" className="btn a text-primary fw-bold  ">
            Regístrate
          </Link>
        </form>
      </div>
    </>
  );
}
