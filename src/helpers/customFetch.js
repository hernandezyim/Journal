import { endLoading, setErrors, startLoading } from "../actions/ui";
import handleError from "./handleError";

export default async function customFetch(options, dispatch = () => {}) {
  const {
    url,
    method,
    headers = {
      "Content-Type": "application/json",
    },
    body,
    requestOptions,
  } = options;

  const reqOpts = requestOptions ?? {
    method,
    headers,
    body: JSON.stringify(body),
  };

  dispatch(startLoading());

  const response = await fetch(url, reqOpts);

  if (response.ok) {
    dispatch(endLoading());
    return await response.json();
  }

  const errors = handleError({
    status: response.status,
    message: response.statusText,
  });

  dispatch(setErrors(errors));
  dispatch(endLoading());
}
