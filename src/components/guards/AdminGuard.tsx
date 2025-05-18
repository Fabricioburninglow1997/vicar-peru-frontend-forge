
import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { Navigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // If user is not authenticated or doesn't have admin/superuser role, redirect to home page
  if (!isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'superuser')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
