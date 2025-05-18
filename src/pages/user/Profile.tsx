
import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-2">
          <strong>Nombre:</strong> {user?.name || 'Usuario'}
        </p>
        <p className="text-lg mb-2">
          <strong>Correo electrónico:</strong> {user?.email || 'email@ejemplo.com'}
        </p>
        <p className="text-lg">
          <strong>Rol:</strong> {user?.role || 'cliente'}
        </p>
      </div>
    </div>
  );
};

export default Profile;
