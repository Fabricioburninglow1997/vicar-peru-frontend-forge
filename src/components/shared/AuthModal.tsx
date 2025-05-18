
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  modalTitle?: string;
  modalDescription?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  redirectUrl = '', 
  modalTitle = "Acceso Requerido",
  modalDescription = "Para continuar con esta acción, necesitas acceder a tu cuenta."
}) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate(`/auth?mode=login&redirect_url=${encodeURIComponent(redirectUrl || window.location.pathname)}`);
    onClose();
  };
  
  const handleRegister = () => {
    navigate(`/auth?mode=register&redirect_url=${encodeURIComponent(redirectUrl || window.location.pathname)}`);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{modalTitle}</DialogTitle>
          <DialogDescription className="text-center">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 py-4">
          <Button onClick={handleLogin} className="flex items-center justify-center gap-2 w-full">
            <User size={18} />
            <span>Iniciar Sesión</span>
          </Button>
          
          <Button onClick={handleRegister} variant="outline" className="flex items-center justify-center gap-2 w-full">
            <Lock size={18} />
            <span>Crear una Cuenta</span>
          </Button>
          
          <p className="text-sm text-gray-500 text-center px-6 mt-2">
            Al acceder podrás guardar tus productos favoritos y realizar cotizaciones de manera más rápida.
          </p>
        </div>
        
        <DialogFooter className="flex justify-center">
          <Button variant="ghost" onClick={onClose}>
            Continuar navegando como invitado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
