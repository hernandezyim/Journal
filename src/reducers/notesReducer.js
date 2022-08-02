import TYPES from "../types/notes/types";

const initialState = {
  notes: [],
  activeNote: null,
};

export default function notesReducer(state = initialState, action) {
  let newNotes = [];
  switch (action.type) {
    case TYPES.NOTES.SET_ACTIVE:
      return {
        ...state,
        activeNote: {
          ...action.payload,
        },
      };
    case TYPES.NOTES.LOAD:
      return {
        ...state,
        notes: [...action.payload],
      };
    case TYPES.NOTES.SAVE:
      newNotes = [...state.notes];
      const index = newNotes.findIndex((n) => n.id === action.payload.id);
      if (index >= 0) {
        newNotes[index] = action.payload;
      } else {
        newNotes.push(action.payload);
      }
      return {
        ...state,
        activeNote: null,
        notes: [...newNotes],
      };

    case TYPES.NOTES.DELETE:
      newNotes = state.notes.filter(({ id }) => id !== action.payload);

      return {
        ...state,
        activeNote: null,
        notes: [...newNotes],
      };

    case TYPES.NOTES.CLOSE:
      return {
        ...state,
        activeNote: null,
      };
    case TYPES.NOTES.SIGN_OUT_CLEANING:
      return {
        ...state,
        activeNote: null,
        notes: [],
      };
    default:
      return state;
  }
}
