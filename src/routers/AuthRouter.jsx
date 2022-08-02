import { Navigate, Route, Routes } from "react-router-dom";
import SignInScreen from "../components/auth/SignInScreen";
import SignUpScreen from "../components/auth/SignUpScreen";

export default function AuthRouter() {
  return (
    <div className="auth__main vh-100 d-flex justify-content-center align-items-center">
      <Routes>
        <Route path="sign-in" element={<SignInScreen />} />
        <Route path="sign-up" element={<SignUpScreen />} />

        <Route path="*" element={<Navigate to="sign-up" />} />
      </Routes>
    </div>
  );
}
