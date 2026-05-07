import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * Route guard component.
 *
 * Wraps any route that requires authentication.
 * If the user is not authenticated, redirects to /signin
 * while preserving the originally requested location so we
 * can redirect back after login.
 *
 * Usage:
 *   <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass the current location so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
