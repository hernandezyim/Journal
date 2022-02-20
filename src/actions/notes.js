import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth, db } from "../configs/firebaseConfig";
import { fileUpload } from "../helpers/cloudinary/fileUpload";
import { fetchDocs } from "../helpers/firebase/fetchDocs";
import { handleError } from "../helpers/ui/handleError";
import { types } from "../types/notes/types";
import { endLoading, startLoading } from "./ui";

export const setActiveNote = (note) => ({
  type: types.setActiveNote,
  payload: {
    ...note,
  },
});

export const loadNotes = (notes) => ({
  type: types.loadNote,
  payload: notes,
});

export const startLoadingNotes = () => {
  return async (dispatch) => {
    try {
      const { uid } = auth.currentUser;
      const notes = await fetchDocs(collection(db, `${uid}/journal/notes`));

      dispatch(loadNotes(notes));
    } catch (error) {
      handleError(error.code, error.message);
    }
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const { activeNote } = getState().notes;
      const { uid } = auth.currentUser;

      if (activeNote.file) {
        activeNote.url = await fileUpload(activeNote.file);
        delete activeNote.file;
      }

      if (activeNote.id) {
        const noteRef = doc(db, `${uid}/journal/notes/${activeNote.id}`);
        const { id, ...note } = activeNote;
        await setDoc(noteRef, note);
      } else {
        const notesRef = collection(db, `${uid}/journal/notes`);
        const noteRef = await addDoc(notesRef, activeNote);
        activeNote.id = noteRef.id;
      }

      dispatch(endLoading());
      await Swal.fire("Nota guardada", activeNote.title, "success");
      dispatch(saveNote(activeNote));
      
    } catch (error) {
      handleError(error.code, error.message);
    }
  };
};

export const saveNote = (note) => ({
  type: types.saveNote,
  payload: {
    ...note,
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { activeNote } = getState().notes;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ({ target }) => {
      activeNote.url = target.result;
      activeNote.file = file;
      dispatch(setActiveNote(activeNote));
    };
  };
};

export const startDeletingNote = (id) => {
  return async (dispatch) => {
    const { uid } = auth.currentUser;

    Swal.fire({
      title: "Deseas borrar esta nota ?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote(id));
        Swal.fire("Nota borrada", "", "success");
        deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
      }
    });
  };
};

export const deleteNote = (id) => ({
  type: types.deleteNote,
  payload: id,
});

export const logoutCleaningNote = () => ({
  type: types.logoutCleaningNote,
});

export const closeNote = () => ({
  type: types.closeNote,
});

export const startCloseNote = () => {
  return (dispatch, getState) => {
    const { activeNote, notes } = getState().notes;
    if (activeNote.id) {
      const originNote = notes.find((note) => note.id === activeNote.id);

      if (JSON.stringify(originNote) === JSON.stringify(activeNote)) {
        dispatch(closeNote());
      } else {
        Swal.fire({
          title: "Deseas guardar los cambios ?",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startSaveNote());
          } else if (result.isDenied) {
            dispatch(closeNote());
          }
        });
      }
    } else {
      dispatch(closeNote());
    }
  };
};
