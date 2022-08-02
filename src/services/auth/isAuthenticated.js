import { API_URL } from "../../configs/keys";
import customFetch from "../../helpers/customFetch";

export default async function isAuthenticated() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return;

  const endPoint = "/auth/refresh-token";
  const url = API_URL + endPoint;
  const method = "POST";
  const headers = {
    "x-access-token": "Bearer " + refreshToken,
  };

  const data = await customFetch({ url, method, headers });

  if (!data) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return;
  }

  const { newToken, id, name } = data;

  localStorage.setItem("token", newToken);

  return { id, name, token: newToken };
}
