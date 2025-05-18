
import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Productos</h2>
          <p className="text-2xl font-semibold">120</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Categorías</h2>
          <p className="text-2xl font-semibold">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Usuarios</h2>
          <p className="text-2xl font-semibold">45</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Pedidos</h2>
          <p className="text-2xl font-semibold">24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
