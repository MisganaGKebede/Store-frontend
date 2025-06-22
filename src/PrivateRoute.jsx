import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const username = localStorage.getItem("username");
  const location = useLocation();

  if (!username) {
    // Save where the user was trying to go
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
