import Swal from "sweetalert2";
import TYPES from "../types/notes/types";
import startSaveNote from "../services/notes/startSaveNote";
import isEqual from "../helpers/isEqual";

export const setActiveNote = (note) => ({
  type: TYPES.NOTES.SET_ACTIVE,
  payload: {
    ...note,
  },
});

export const loadNotes = (notes) => ({
  type: TYPES.NOTES.LOAD,
  payload: notes,
});

export const saveNote = (note) => ({
  type: TYPES.NOTES.SAVE,
  payload: {
    ...note,
  },
});

export const deleteNote = (id) => ({
  type: TYPES.NOTES.DELETE,
  payload: id,
});

export const signOutCleaningNote = () => ({
  type: TYPES.NOTES.SIGN_OUT_CLEANING,
});

export const closeNote = () => async (dispatch, getState) => {
  const { activeNote, notes } = getState().notes;

  const action = { type: TYPES.NOTES.CLOSE };

  const note = notes.find(({ id }) => id === activeNote.id);

  if (!note || isEqual(note, activeNote)) return dispatch(action);

  const { isConfirmed } = await Swal.fire({
    title: "Deseas guardar los cambios ?",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`,
  });

  if (!isConfirmed) return dispatch(action);

  dispatch(startSaveNote());
};
