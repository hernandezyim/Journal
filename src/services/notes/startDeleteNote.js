import { deleteNote } from "../../actions/notes";
import { API_URL } from "../../configs/keys";
import Swal from "sweetalert2";
import customFetch from "../../helpers/customFetch";

export default function startDeleteNote(id) {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const { isConfirmed } = await Swal.fire({
      title: "Deseas borrar esta nota ?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    });

    if (!isConfirmed) return;

    const endPoint = `/notes/${id}`;
    const url = API_URL + endPoint;

    const method = "DELETE";
    const headers = {
      "x-access-token": "Bearer " + token,
    };

    await customFetch({ url, method, headers }, dispatch);
    Swal.fire("Nota borrada", "", "success");

    dispatch(deleteNote(id));
  };
}
