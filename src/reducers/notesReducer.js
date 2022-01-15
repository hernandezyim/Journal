import { types } from "../types/notes/types";

const initialState = {
  notes: [],
  activeNote: null,
};

export const notesReducer = (state = initialState, action) => {
  let newNotes = [];
  switch (action.type) {
    case types.setActiveNote:
      return {
        ...state,
        activeNote: {
          ...action.payload,
        },
      };
    case types.loadNote:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.saveNote:
      newNotes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );

      const isExits = newNotes.find(({ id }) => id === action.payload.id);
      if (!isExits) newNotes.push(action.payload);

      return {
        ...state,
        activeNote: null,
        notes: [...newNotes],
      };

    case types.deleteNote:
      newNotes = state.notes.filter(({ id }) => id !== action.payload);

      return {
        ...state,
        activeNote: null,
        notes: [...newNotes],
      };

    case types.closeNote:
      return {
        ...state,
        activeNote: null,
      };
    case types.logoutCleaningNote:
      return {
        ...state,
        activeNote: null,
        notes: [],
      };
    default:
      return state;
  }
};
