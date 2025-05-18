
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { User, Lock, Mail } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  
  // Extract mode and redirect URL from query params
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'register' ? 'register' : 'login';
  const redirectUrl = queryParams.get('redirect_url') || '/';
  
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  // Handle login form changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Handle register form changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // Validate login form
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginForm.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate register form
  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!registerForm.name) {
      newErrors.name = 'El nombre es obligatorio';
    }
    
    if (!registerForm.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!registerForm.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    try {
      const success = await login(loginForm);
      
      if (success) {
        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate(redirectUrl, { replace: true });
      } else {
        toast({
          title: "Error al iniciar sesión",
          description: "Correo electrónico o contraseña incorrectos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    try {
      const success = await register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      });
      
      if (success) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada correctamente.",
        });
        navigate(redirectUrl, { replace: true });
      } else {
        toast({
          title: "Error al registrarse",
          description: "El correo electrónico ya está en uso.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error al registrarse",
        description: "Ha ocurrido un error. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="py-16 px-4 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <Tabs value={mode} onValueChange={(value) => setMode(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>
                    Accede a tu cuenta para gestionar tus cotizaciones y favoritos.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Procesando..." : "Iniciar Sesión"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Crear una cuenta</CardTitle>
                  <CardDescription>
                    Crea una cuenta para aprovechar todas las funciones.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegisterSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          name="name"
                          type="text"
                          placeholder="Tu nombre"
                          className="pl-10"
                          value={registerForm.name}
                          onChange={handleRegisterChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Correo electrónico</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Procesando..." : "Crear Cuenta"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Para fines de prueba, puedes usar:
              <br />
              Admin: admin@vicarperu.com / admin123
              <br />
              Cliente: customer@vicarperu.com / customer123
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Auth;
