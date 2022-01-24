import { useAuth } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" /> : children;
}
