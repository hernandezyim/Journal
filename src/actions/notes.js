import Swal from "sweetalert2";
import TYPES from "../types/notes/types";
import startSaveNote from "../services/notes/startSaveNote";

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

export const loadImage = (file) => async (dispatch, getState) => {
  const { activeNote } = getState().notes;

  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (fileRead) => {
    const { result } = fileRead.target;
    const newNote = { ...activeNote, photo_temp: result, file: file };

    dispatch(setActiveNote(newNote));
  };
};

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

  const OldNote = JSON.stringify(note);
  const currentNote = JSON.stringify(activeNote);

  if (!OldNote || OldNote === currentNote) return dispatch(action);

  const { isConfirmed } = await Swal.fire({
    title: "Deseas guardar los cambios ?",
    showDenyButton: true,
    confirmButtonText: "Si",
    denyButtonText: `No`,
  });

  if (!isConfirmed) return dispatch(action);

  dispatch(startSaveNote());
};
