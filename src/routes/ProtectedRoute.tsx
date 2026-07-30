import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const storedRecruiter = localStorage.getItem("currentRecruiter");

  if (!storedRecruiter) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;