import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If user is authenticated, render the children
  // Otherwise, redirect to auth page with the current location as redirect_url
  if (!isAuthenticated) {
    return <Navigate to={`/auth?redirect_url=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
