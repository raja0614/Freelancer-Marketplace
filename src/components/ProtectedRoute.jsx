import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function dashboardFor(role) {
  if (role === 'client') return '/client';
  if (role === 'freelancer') return '/freelancer';
  if (role === 'admin') return '/admin';
  return '/login';
}

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={dashboardFor(user.role)} replace />;
  }
  return children;
}

export { dashboardFor };
