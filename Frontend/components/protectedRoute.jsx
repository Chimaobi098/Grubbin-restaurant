import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import LoadingScreen from "./loadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading && !user) {
    return <LoadingScreen />;
  }

  if (!user) {
    // If user is not logged in, redirect to /login

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
