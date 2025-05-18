
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-5xl font-bold text-vicar-blue mb-4">404</h1>
          <p className="text-2xl text-gray-700 mb-6">Página no encontrada</p>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
