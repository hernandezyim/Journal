import types from "../types/msgError/types";

export default function handleError({ status, message }) {
  console.error(`Error: ${status} - ${message}`);

  const validStatus = {
    400: () => ({ emailAndPass: types.emailAndPass.incorrect }),
    401: () => ({ emailAndPass: types.emailAndPass.incorrect }),
    409: () => ({ email: types.email.used }),
  };

  return validStatus[status] ? validStatus[status]() : {};
}
