import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ requiredRole, children }) => {
  const role = useSelector((state) => state.auth.user?.role);
  const location = useLocation();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (role && role != requiredRole) {
      if (!hasNavigated) {
        toast.error("Hanya Super Admin yang memiliki akses");
        setHasNavigated(true);
      }
    } else {
      setHasNavigated(false);
    }
  }, [role, requiredRole, location.pathname, hasNavigated]);

  if (role && role != requiredRole) {
    return <Navigate to="/dashboard" />;
  } else return children ? children : <Outlet />;
};

export default ProtectedRoute;
