import TYPES from "../types/ui/types";

export const startLoading = () => ({
  type: TYPES.UI.START_LOADING,
});
export const endLoading = () => ({
  type: TYPES.UI.END_LOADING,
});

export const setErrors = (error) => ({
  type: TYPES.UI.SET_ERROR,
  payload: error,
});
export const clearErrors = () => ({
  type: TYPES.UI.CLEAR_ERROR,
});
