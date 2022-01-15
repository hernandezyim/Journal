import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../configs/firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { types } from "../types/auth/types";
import { endLoading, startLoading } from "./ui";
import { handleError } from "../helpers/ui/handleError";
import { logoutCleaningNote } from "./notes";

export const startmiddlewareLogin = (email, password, setError) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = user;

      dispatch(endLoading());
      dispatch(login(uid, displayName));
    } catch ({ code, message }) {
      dispatch(endLoading());

      handleError(code, message, setError);
      // console.table(Object.entries(console).sort());
    }
  };
};

export const startmiddlewareLogout = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await signOut(auth);

      dispatch(logoutCleaningNote());
      dispatch(endLoading());
      dispatch(logout());
    } catch ({ code, message }) {
      dispatch(endLoading());
      handleError(code, message);
    }
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithPopup(auth, googleAuthProvider);
      const { uid, displayName } = user;

      dispatch(login(uid, displayName));
    } catch ({ code, message }) {
      dispatch(endLoading());
      handleError(code, message);
    }
  };
};

export const startRegisterUserWithEmailAndPass = (
  email,
  password,
  name,
  setError
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(endLoading());
      await updateProfile(user, { displayName: name });
      const { uid, displayName } = user;

      dispatch(login(uid, displayName));
    } catch ({ code, message }) {
      dispatch(endLoading());
      handleError(code, message, setError);
    }
  };
};
export const login = (uid, displayName, photoUrl) => ({
  type: types.auth.login,
  payload: {
    uid,
    displayName,
    photoUrl,
  },
});

export const logout = () => ({
  type: types.auth.logout,
});
