import { signIn } from "../../actions/auth";
import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";

export default function startGoogleSignIn(credential) {
  return async (dispatch) => {
    const method = "POST";
    const endPoint = "/auth/sign-in-google";
    const url = API_URL + endPoint;
    const body = {
      credential,
    };

    const data = await customFetch({ url, method, body }, dispatch);

    if (!data) return;

    const { id, name, token, refreshToken } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    dispatch(signIn({ id, name, token }));
  };
}
