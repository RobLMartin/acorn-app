import { useAuth } from "../../contexts/auth.context";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/auth" />;
}
