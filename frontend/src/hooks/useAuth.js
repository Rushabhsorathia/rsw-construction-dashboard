import useAuthStore from '../store/authStore';

/**
 * Convenience hook that wraps the auth Zustand store.
 *
 * Usage:
 *   const { user, isAuthenticated, login, logout } = useAuth();
 */
export default function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const setUser = useAuthStore((s) => s.setUser);
  const fetchCurrentUser = useAuthStore((s) => s.fetchCurrentUser);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const changePassword = useAuthStore((s) => s.changePassword);
  const initialise = useAuthStore((s) => s.initialise);

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    setUser,
    fetchCurrentUser,
    updateProfile,
    changePassword,
    initialise,
  };
}
