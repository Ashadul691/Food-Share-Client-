import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  if (user && user.email) {
    return children;
  }

  return (
    <Navigate
      to="/auth/signin"
      state={location.pathname}
      replace
    />
  );
};

export default PrivateRoute;