
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';

export const useAuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState<string | undefined>(undefined);
  
  const { isAuthenticated } = useAuth();
  
  /**
   * Check if user is authenticated before executing an action
   * If not authenticated, show auth modal
   * @param action Function to execute if authenticated
   * @param redirectUrl Optional URL to redirect after auth
   */
  const requireAuth = (action: () => void, redirectUrl?: string) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setPendingRedirectUrl(redirectUrl);
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setPendingAction(null);
    setPendingRedirectUrl(undefined);
  };
  
  /**
   * Execute the pending action if user is authenticated
   * Used after successful login/registration
   */
  const executePendingAction = () => {
    if (isAuthenticated && pendingAction) {
      pendingAction();
      setPendingAction(null);
      setPendingRedirectUrl(undefined);
    }
  };
  
  return {
    isModalOpen,
    pendingRedirectUrl,
    requireAuth,
    closeModal,
    executePendingAction
  };
};

export default useAuthModal;
