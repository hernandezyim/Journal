import Swal from "sweetalert2";
import { saveNote } from "../../actions/notes";
import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";

export default function startSaveNote() {
  return async (dispatch, getState) => {
    const { notes, auth } = getState();
    const { token } = auth;
    const { activeNote } = notes;
    const { photo_temp, ...note } = activeNote;

    const endPoint = `/notes/${note.id || ""}`;
    const url = API_URL + endPoint;

    const noteData = new FormData();
    Object.keys(note).forEach((key) => noteData.append(key, note[key]));

    const requestOptions = {
      method: note.id ? "PUT" : "POST",
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
