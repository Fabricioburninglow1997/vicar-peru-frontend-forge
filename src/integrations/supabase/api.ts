
import { Product } from '@/contexts/ShoppingContext';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock product data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Alarma Viper 3305V',
    sku: 'ALRM-VIP-3305V',
    price: 450,
    discountPrice: 382.5,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Alarma con tecnología de última generación, incluye 2 controles y sirena de alta potencia.',
    category: 'alarmas',
    isBestseller: true,
    isOnSale: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Autoradio Pioneer MVH-S215BT',
    sku: 'ARRD-PIO-215BT',
    price: 299,
    image: 'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Autoradio con Bluetooth, USB, control remoto y función manos libres.',
    category: 'autoradios',
    isBestseller: true,
    isOnSale: false,
  },
  {
    id: '3',
    name: 'GPS Tracker GT06E',
    sku: 'GPS-TRK-GT06E',
    price: 250,
    discountPrice: 200,
    image: 'https://images.unsplash.com/photo-1621265840088-1823cff253cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Localizador GPS con corte de motor, monitoreo en tiempo real y alerta de velocidad.',
    category: 'gps',
    isBestseller: false,
    isOnSale: true,
    discount: 20
  },
  {
    id: '4',
    name: 'Luces LED H4 SuperBright',
    sku: 'LZ-LED-H4SB',
    price: 120,
    image: 'https://images.unsplash.com/photo-1591639861723-22a7f7f9fe15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Kit de luces LED de alta luminosidad, 6000K, fácil instalación y larga duración.',
    category: 'luces',
    isBestseller: false,
    isOnSale: false,
  },
  {
    id: '5',
    name: 'Llave con Chip Toyota Hilux',
    sku: 'LLAV-TOY-HIL22',
    price: 180,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Llave con chip para Toyota Hilux 2018-2022, incluye programación y corte.',
    category: 'llaves',
    isBestseller: true,
    isOnSale: false,
  },
  {
    id: '6',
    name: 'Parlantes Pioneer TS-A1670F',
    sku: 'PRLNT-PIO-1670F',
    price: 220,
    discountPrice: 180,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Parlantes de 6.5", 320W, 3 vías, alta calidad de sonido y fácil instalación.',
    category: 'parlantes',
    isBestseller: false,
    isOnSale: true,
    discount: 18
  },
];

// Mock categories data
export const mockCategories = [
  {
    id: '1',
    name: 'Llaves',
    emoji: '🔑',
    subcategories: ['Llaves con chip', 'Duplicados', 'Carcasas']
  },
  {
    id: '2',
    name: 'Alarmas',
    emoji: '🚨',
    subcategories: ['Alarmas Viper', 'Sin llave', 'Con llave']
  },
  {
    id: '3',
    name: 'Luces',
    emoji: '💡',
    subcategories: ['LED', 'Halógenos', 'Barras LED']
  },
  {
    id: '4',
    name: 'GPS',
    emoji: '📍',
    subcategories: ['Trackers', 'Dispositivos GPS']
  },
  {
    id: '5',
    name: 'Parlantes',
    emoji: '🔊',
    subcategories: ['Pioneer', 'Amplificadores', 'Subwoofers']
  },
  {
    id: '6',
    name: 'Autoradios',
    emoji: '📻',
    subcategories: ['Con chip', 'Sin chip', 'Consolas']
  },
  {
    id: '7',
    name: 'Corporativas',
    emoji: '🏢',
    subcategories: ['Sistemas de seguridad', 'Flotas', 'Empresas']
  }
];

// Mock orders data
export const mockOrders = [
  {
    id: '1',
    date: '2023-06-15',
    status: 'completed',
    total: 630,
    items: [
      {
        productId: '1',
        name: 'Alarma Viper 3305V',
        sku: 'ALRM-VIP-3305V',
        price: 450,
        quantity: 1
      },
      {
        productId: '4',
        name: 'Luces LED H4 SuperBright',
        sku: 'LZ-LED-H4SB',
        price: 120,
        quantity: 1.5
      }
    ]
  },
  {
    id: '2',
    date: '2023-05-23',
    status: 'processing',
    total: 220,
    items: [
      {
        productId: '6',
        name: 'Parlantes Pioneer TS-A1670F',
        sku: 'PRLNT-PIO-1670F',
        price: 220,
        quantity: 1
      }
    ]
  }
];

// Mock notifications
export const mockNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'Orden completada',
    message: 'Tu orden #1 ha sido entregada con éxito.',
    isRead: false,
    createdAt: '2023-06-16T10:30:00Z'
  },
  {
    id: '2',
    type: 'promo',
    title: '¡Nueva oferta disponible!',
    message: '15% de descuento en alarmas Viper este fin de semana.',
    isRead: true,
    createdAt: '2023-06-10T14:15:00Z'
  },
  {
    id: '3',
    type: 'info',
    title: 'Actualización de horarios',
    message: 'Nuestros horarios de atención han sido actualizados.',
    isRead: false,
    createdAt: '2023-06-05T09:45:00Z'
  }
];

// API functions

// Products
export async function fetchProducts(filters: any = {}): Promise<Product[]> {
  await delay(800);
  
  let filtered = [...mockProducts];
  
  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply price filter
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= filters.minPrice;
    });
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price;
      return price <= filters.maxPrice;
    });
  }
  
  // Apply sort
  if (filters.sort) {
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }
  
  return filtered;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(500);
  const product = mockProducts.find(p => p.id === id);
  return product || null;
}

// Categories
export async function fetchCategories() {
  await delay(300);
  return mockCategories;
}

// Orders
export async function fetchOrders(userId: string) {
  await delay(600);
  return mockOrders;
}

export async function fetchOrderById(orderId: string) {
  await delay(400);
  return mockOrders.find(order => order.id === orderId) || null;
}

// Notifications
export async function fetchNotifications(userId: string) {
  await delay(300);
  return mockNotifications;
}

export async function markNotificationAsRead(notificationId: string) {
  await delay(200);
  // This is just a simulation, in a real app this would update the backend
  return { success: true };
}
