import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({ logged, children }) => {
  return logged ? children : <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  logged: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
