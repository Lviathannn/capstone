import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ requiredRole, children }) => {
  const role = useSelector((state) => state.auth.user?.role);
  const location = useLocation();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    if (role != requiredRole) {
      if (!hasNavigated) {
=======
    console.log("Current role:", role);
    console.log("Required role:", requiredRole);

    if (role != requiredRole ) {
        if (!hasNavigated) {
>>>>>>> e4c74baaea5ee6d5277a862088c7da7c485c926f
        toast.error("Hanya Super Admin yang memiliki akses");
        setHasNavigated(true);
        }
    } else {
      setHasNavigated(false);
    }
  }, [role, requiredRole, location.pathname, hasNavigated]);

  if (role != requiredRole) {
    return <Navigate to="/dashboard"  />;
  }
  else return children ? children : <Outlet />;
};

export default ProtectedRoute;