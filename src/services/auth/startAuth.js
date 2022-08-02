import { signIn } from "../../actions/auth";
import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";

export default function startAuth(userCredentials) {
  return async (dispatch) => {
    const { name } = userCredentials;

    const endPoint = `/auth/${name ? "sign-up" : "sign-in"}`;
    const url = API_URL + endPoint;
    const method = "POST";
    const body = userCredentials;

    const data = await customFetch({ url, method, body }, dispatch);

    if (!data) return;

    const { id, name: nameR, token, refreshToken } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    dispatch(signIn({ id, name: name ?? nameR, token }));
  };
}
