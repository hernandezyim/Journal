import TYPES from "../types/ui/types";

const initialState = {
  loading: false,
  errors: {},
};
export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.UI.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TYPES.UI.END_LOADING:
      return {
        ...state,
        loading: false,
      };

    case TYPES.UI.SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case TYPES.UI.CLEAR_ERROR:
      return {
        ...state,
        errors: {},
      };

    default:
      return state;
  }
}
