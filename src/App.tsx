
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import ShoppingProvider from "./contexts/ShoppingContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/guards/AuthGuard";
import AdminGuard from "./components/guards/AdminGuard";

// Import main pages
import Auth from "./pages/Auth";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Notifications from "./pages/Notifications";
import Services from "./pages/Services";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCategories from "./pages/admin/Categories";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ShoppingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/servicios" element={<Services />} />
              
              {/* Protected routes - require authentication */}
              <Route path="/catalogo" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/productos" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/categorias/:category" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/categorias/:category/:subcategory" element={<AuthGuard><Catalog /></AuthGuard>} />
              <Route path="/producto/:id" element={<AuthGuard><ProductDetails /></AuthGuard>} />
              <Route path="/carrito" element={<AuthGuard><Cart /></AuthGuard>} />
              <Route path="/favoritos" element={<AuthGuard><Favorites /></AuthGuard>} />
              <Route path="/notificaciones" element={<AuthGuard><Notifications /></AuthGuard>} />
              
              {/* User profile routes */}
              <Route path="/perfil" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/pedidos" element={<AuthGuard><Orders /></AuthGuard>} />
              
              {/* Admin routes - require admin/superuser role */}
              <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
              <Route path="/admin/productos" element={<AdminGuard><AdminProducts /></AdminGuard>} />
              <Route path="/admin/categorias" element={<AdminGuard><AdminCategories /></AdminGuard>} />
              <Route path="/admin/usuarios" element={<AdminGuard><AdminUsers /></AdminGuard>} />
              <Route path="/admin/configuracion" element={<AdminGuard><AdminSettings /></AdminGuard>} />
              
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ShoppingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
