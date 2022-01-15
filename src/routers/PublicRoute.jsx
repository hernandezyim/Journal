import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({ logged, children }) => {
  return !logged ? children : <Navigate to="/journal" />;
};

PublicRoute.propTypes = {
  logged: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
