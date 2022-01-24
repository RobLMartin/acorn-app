import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../app/contexts/auth.context";

export default function NoRoute() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => !isAuth && navigate("/auth"), []);

  if (!isAuth) {
    return null;
  }

  return <div>No Route</div>;
}
