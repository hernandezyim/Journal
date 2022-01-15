import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  startGoogleLogin,
  startmiddlewareLogin,
} from "../../actions/auth";
import { validateForm } from "../../helpers/form/validateForm";
import { useForm } from "../../hooks/useForm";
import { HelperText } from "../ui/HelperText";
import { LoadingScreen } from "../ui/LoadingScreen";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [msgError, setError] = useState({});

  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    validateForm({ ...formValues }, setError) &&
      dispatch(startmiddlewareLogin(email, password, setError));
  };
  const handleGoogleLogin = () => dispatch(startGoogleLogin());

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="auth__main vh-100 d-flex justify-content-center align-items-center">
        <div className="auth__box-container bg-white l animate__animated animate__flip">
          <h3 className="auth__title text-center mb-3 fw-bold">Journal App</h3>
          <form onSubmit={handleLogin} noValidate>
            <input
              type="email"
              placeholder="Dirección de correo"
              name="email"
              className={`form-control mb-2 ${
                msgError.email || msgError.emailAndPass ? "error" : ""
              }`}
              onChange={handleInputChange}
              value={email}
              spellCheck={false}
            />
            <HelperText msg={msgError.email} />

            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              className={`form-control mb-2 ${
                msgError.password || msgError.emailAndPass ? "error" : ""
              }`}
              onChange={handleInputChange}
              value={password}
            />
            <HelperText msg={msgError.password} />
            <HelperText msg={msgError.emailAndPass} />

            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
            <div className="py-3 d-flex justify-content-center align-items-center">
              <div className="google-btn pointer" onClick={handleGoogleLogin}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>
                <p className="btn-text text-white text-center mt-2">
                  <b> Inicia sesión con Google</b>
                </p>
              </div>
            </div>

            <Link
              to="/auth/register"
              className="btn a text-primary fw-bold  "
            >
              Registrate
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
