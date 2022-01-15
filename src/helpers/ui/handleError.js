import Swal from "sweetalert2";
import { types } from "../../types/firebaseCode/types";
import { types as typesMsg } from "../../types/msgError/types";

export const handleError = (code, message, setError) => {
  switch (code) {
    case types.auth.userNotFound:
      return setError({ emailAndPass: typesMsg.emailAndPass.incorrect });
    case types.auth.wrongPass:
      return setError({ emailAndPass: typesMsg.emailAndPass.incorrect });
    case types.auth.emailAlreadyInUse:
      return setError({ email: typesMsg.email.used });
    case types.auth.invalidEmail:
      return setError({ email: typesMsg.email.invalid });
    case types.auth.popudCloseByUser:
      return;
    default:
      return Swal.fire("Error", message, "error");
  }
};
