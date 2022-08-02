import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PublicRoute({ logged, children }) {
  return !logged ? children : <Navigate to="/" />;
}

PublicRoute.propTypes = {
  logged: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
