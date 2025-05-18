
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import useAuthModal from './useAuthModal';

/**
 * Custom hook for handling navigation that requires authentication
 */
export const useAuthNavigation = () => {
  const { isAuthenticated } = useAuth();
  const { requireAuth } = useAuthModal();
  const navigate = useNavigate();

  /**
   * Navigate to a protected route, showing auth modal if user is not authenticated
   * @param route The route to navigate to
   * @param options Optional configuration
   */
  const navigateToProtected = (
    route: string, 
    options?: { 
      replace?: boolean,
      state?: any
    }
  ) => {
    if (isAuthenticated) {
      navigate(route, options);
    } else {
      // Show authentication modal with the destination as redirect URL
      requireAuth(
        () => navigate(route, options), 
        route
      );
    }
  };

  return {
    navigateToProtected
  };
};

export default useAuthNavigation;
