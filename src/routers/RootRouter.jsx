import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { signIn } from "../actions/auth";

import JournalScreen from "../components/journal/JournalScreen";
import LoadingScreen from "../components/ui/LoadingScreen";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import useAuth from "../hooks/useAuth";
import isAuthenticated from "../services/auth/isAuthenticated";

export default function RootRouter() {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const { logged } = useAuth();

  useEffect(() => {
    (async () => {
      const user = await isAuthenticated();

      if (user) dispatch(signIn(user));

      setIsChecked(true);
    })();
  }, [dispatch]);

  return isChecked ? (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute logged={logged}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute logged={logged}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <LoadingScreen home={true} />
  );
}
