import { types } from "../types/auth/types";
const initialState = {
  logged: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.auth.login:
      return {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        photoUrl: action.payload.photoUrl,
        logged: true,
      };
    case types.auth.logout:
      return {
        logged: false,
      };

    default:
      return state;
  }
};
