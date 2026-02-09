// Configuración dinámica de API basada en variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecommerce-fht9.onrender.com';

export const apiEndpoints = {
  auth: {
    signin: `${API_BASE_URL}/api/auth/signin`,
    signup: `${API_BASE_URL}/api/auth/signup`,
    verify: `${API_BASE_URL}/api/auth/verify`
  },
  payment: {
    createPaymentIntent: `${API_BASE_URL}/api/payment/create-payment-intent`
  },
  products: {
    list: `${API_BASE_URL}/api/products`,
    detail: `${API_BASE_URL}/api/products`,
    admin: `${API_BASE_URL}/api/admin/products`
  },
  services: {
    list: `${API_BASE_URL}/api/services`,
    admin: `${API_BASE_URL}/api/admin/services`
  },
  orders: {
    create: `${API_BASE_URL}/api/orders`,
    user: `${API_BASE_URL}/api/orders/user`,
    admin: `${API_BASE_URL}/api/admin/orders`
  },
  news: {
    tech: `${API_BASE_URL}/api/news/tech`
  }
};

export default apiEndpoints;
