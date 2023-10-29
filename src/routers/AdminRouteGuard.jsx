import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRouteGuard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) =>
    state.auth.user ? state.auth.user.roles.includes('admin') : false,
  );

  if (!isAuthenticated || !isAdmin) {
    // Redirect to the admin login page if not authenticated or not an admin
    return <Navigate to="/admin/login" />;
  }

  // Render the protected content (nested routes)
  return <Outlet />;
};

export default AdminRouteGuard;
