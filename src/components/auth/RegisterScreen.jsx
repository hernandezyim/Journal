import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startRegisterUserWithEmailAndPass } from "../../actions/auth";
import { validateForm } from "../../helpers/form/validateForm";
import { useForm } from "../../hooks/useForm";
import { LoadingScreen } from "../ui/LoadingScreen";
import { HelperText } from "../ui/HelperText";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [msgError, setError] = useState({});
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Yim",
    email: "yimhernandez212@hotmail.com",
    password: "ydh123456789",
    password2: "ydh123456789",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    validateForm({ ...formValues }, setError) &&
      dispatch(
        startRegisterUserWithEmailAndPass(email, password, name, setError)
      );
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <div className="auth__main vh-100 d-flex justify-content-center align-items-center">
        <div className="auth__box-container r bg-white animate__animated animate__flip">
          <h3 className="auth__title text-center fw-bold">Registro</h3>
          <form onSubmit={handleRegister} noValidate>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              className={`form-control mb-1 ${msgError.name ? "error" : ""}`}
              autoComplete="off"
              onChange={handleInputChange}
              value={name}
              spellCheck={false}
            />
            <HelperText msg={msgError.name} />
            <input
              type="email"
              placeholder="Dirección de correo"
              name="email"
              className={`form-control mb-1 ${msgError.email ? "error" : ""}`}
              autoComplete="off"
              onChange={handleInputChange}
              value={email}
              spellCheck={false}
            />
            <HelperText msg={msgError.email} />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              className={`form-control mb-1 ${
                msgError.password ? "error" : ""
              }`}
              onChange={handleInputChange}
              value={password}
            />
            <HelperText msg={msgError.password} />

            <input
              type="password"
              placeholder="Confirmación"
              name="password2"
              className={`form-control mb-1 ${
                msgError.password2 ? "error" : ""
              }`}
              onChange={handleInputChange}
              value={password2}
            />
            <HelperText msg={msgError.password2} />
            <HelperText msg={msgError.passAndPass2} />

            <button
              type="submit"
              className="btn btn-primary btn-block mb-3 w-100"
            >
              Crear cuenta
            </button>

            <Link to="/auth/login" className="btn a text-primary fw-bold">
              Ya estas registrado?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
