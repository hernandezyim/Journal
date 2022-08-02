import TYPES from "../types/auth/types";
const initialState = {
  logged: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.AUTH.SIGN_IN:
      return {
        id: action.payload.id,
        name: action.payload.name,
        photoUrl: action.payload.photoUrl,
        token: action.payload.token,
        logged: true,
      };
    case TYPES.AUTH.SIGN_OUT:
      return {
        logged: false,
      };
    default:
      return state;
  }
}
