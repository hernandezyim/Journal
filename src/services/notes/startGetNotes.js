import { loadNotes } from "../../actions/notes";
import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";

export default function startGetNotes() {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const endPoint = "/notes";
    const url = API_URL + endPoint;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "x-access-token": "Bearer " + token,
    };
    const notes = await customFetch({ url, method, headers });
    dispatch(loadNotes(notes));
  };
}
