import Swal from "sweetalert2";
import { saveNote } from "../../actions/notes";
import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";
import isEqual from "../../helpers/isEqual";
import types from "../../types/notes/types";

export default function startSaveNote() {
  return async (dispatch, getState) => {
    const { notes, auth } = getState();
    const { token } = auth;
    let { activeNote } = notes;
    let { id, photo_url = "" } = activeNote;

    const note = notes.notes.find((note) => note.id === id);
    if (isEqual(note, activeNote))
      return dispatch({
        type: types.NOTES.CLOSE,
      });

    if (photo_url.length > 93) photo_url = "";

    const endPoint = `/notes/${activeNote.id || ""}`;
    const url = API_URL + endPoint;

    const noteData = new FormData();
    Object.keys(activeNote).forEach((key) =>
      noteData.append(key, activeNote[key])
    );

    const requestOptions = {
      method: activeNote.id ? "PUT" : "POST",
      headers: {
        "x-access-token": "Bearer " + token,
      },
      body: noteData,
    };

    const noteSaved = await customFetch({ url, requestOptions }, dispatch);

    await Swal.fire("Nota guardada", noteSaved.title, "success");
    dispatch(saveNote(noteSaved));
  };
}
