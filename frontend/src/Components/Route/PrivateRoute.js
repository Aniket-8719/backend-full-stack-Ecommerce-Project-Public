import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = ({ isAdmin, Component }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if (isAdmin && (!user || user.role !== "admin")) {
      if (!toastShown) {
        const hasSeenToast = sessionStorage.getItem('adminAccessToastShown');
        if (!hasSeenToast) {
          toast.error("You do not have the right to access this resource");
          sessionStorage.setItem('adminAccessToastShown', 'true');
        }
        setToastShown(true);
      }
    }
  }, [isAdmin, user, toastShown]);

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdmin && (!user || user.role !== "admin")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default PrivateRoute;
