import { signOutCleaningNote } from "./notes";
import TYPES from "../types/auth/types";

export const signIn = (user) => ({
  type: TYPES.AUTH.SIGN_IN,
  payload: user,
});

export const signOut = () => async (dispatch, getState) => {
  const { notes, activeNote } = getState().notes;

  if (notes.length !== 0 || activeNote) dispatch(signOutCleaningNote());

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  /* global google */
  google.accounts.id.disableAutoSelect();

  dispatch({
    type: TYPES.AUTH.SIGN_OUT,
  });
};
