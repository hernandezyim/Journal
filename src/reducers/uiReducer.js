import { types } from "../types/ui/types";

const initialState = {
  loading: false,
};
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ui.startLoading:
      return {
        ...state,
        loading: true,
      };
    case types.ui.endLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
