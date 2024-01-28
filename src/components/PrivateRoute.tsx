import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

interface ProtectedRouteProps {
  outlet: React.ReactNode;
}

const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const { currentUser } = useAuthContext();
  if (currentUser) {
    return outlet;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
