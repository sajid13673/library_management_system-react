// utils/ProtectedRoutes.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authProvider';

export const ProtectedRoute = ({ roles }) => {
  const { token } = useAuth();
  const role = token && token.role;
  roles && console.log(roles.includes(role));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
