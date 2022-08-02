import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ logged, children }) {
  return logged ? children : <Navigate to="/auth/sign-in" />;
}

PrivateRoute.propTypes = {
  logged: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
