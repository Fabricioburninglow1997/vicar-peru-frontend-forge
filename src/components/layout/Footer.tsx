
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Map, Clock, Facebook, Instagram, YouTube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vicar-gray text-white">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Encuéntranos y Contáctanos</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Map size={18} className="mr-2 mt-1 flex-shrink-0" />
                <p>Av. República de Panamá 4642, Surquillo, Lima, Perú</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+51123456789" className="hover:underline">+51 123 456 789</a>
              </div>
              <div className="flex items-center">
                <div className="w-[18px] h-[18px] mr-2 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.373-12-12-12zm0 22.5c-5.8 0-10.5-4.7-10.5-10.5S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z" />
                  </svg>
                </div>
                <a href="https://wa.me/51123456789" className="hover:underline">WhatsApp: +51 123 456 789</a>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:contacto@vicarperu.com" className="hover:underline">contacto@vicarperu.com</a>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Información Importante</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="hover:underline">Nosotros</Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:underline">Términos y Condiciones</Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:underline">Políticas de Privacidad</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">Preguntas Frecuentes</Link>
              </li>
              <li>
                <Link to="/garantia" className="hover:underline">Garantía y Devoluciones</Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:underline">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Newsletter & Social Media */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Recibe Ofertas Exclusivas</h3>
              <p className="mb-3">Suscríbete a nuestro newsletter y no te pierdas nuestras promociones.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="px-4 py-2 rounded-l flex-grow border-0 text-gray-800"
                />
                <button className="bg-vicar-blue px-4 py-2 rounded-r font-medium">
                  Suscribirse
                </button>
              </form>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Visita nuestra página de Facebook" className="bg-white text-vicar-blue p-2 rounded-full hover:bg-vicar-blue hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Visita nuestro perfil de Instagram" className="bg-white text-vicar-blue p-2 rounded-full hover:bg-vicar-blue hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Visita nuestro canal de YouTube" className="bg-white text-vicar-blue p-2 rounded-full hover:bg-vicar-blue hover:text-white transition-colors">
                  <YouTube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600 py-4">
        <div className="container-wide flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 VICAR-PERU. Todos los derechos reservados.</p>
          <div className="mt-2 md:mt-0">
            <p>Aceptamos: Yape, Plin, BCP, IBK</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
