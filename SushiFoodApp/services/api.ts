import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://sushi-app-pxoh.onrender.com/api";

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await AsyncStorage.getItem("userToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API error: ${response.status}`);
  }

  return data;
}

// Authentication API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string, phone?: string) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    }),

  getProfile: () => apiRequest("/auth/profile"),
};

// Products API
export const productsApi = {
  getAll: () => apiRequest("/products"),
  getByCategory: (category: string) => apiRequest(`/categories/${category}`),
  getById: (id: string) => apiRequest(`/products/${id}`),
};

// Restaurants API
export const restaurantsApi = {
  getAll: () => apiRequest("/restaurants"),
  getFeatured: () => apiRequest("/restaurants/featured"),
  getPopular: () => apiRequest("/restaurants/popular"),
};

// Cart API
export const cartApi = {
  getCart: () => apiRequest("/cart"),
  addToCart: (productId: string, quantity: number = 1) =>
    apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  removeItem: (productId: string) =>
    apiRequest(`/cart/${productId}`, { method: "DELETE" }),
  clearCart: () => apiRequest("/cart/clear/all", { method: "DELETE" }),
};

// Orders API
export const ordersApi = {
  getOrders: () => apiRequest("/orders"),
  createOrder: (orderData: any) =>
    apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),
  getOrder: (id: string) => apiRequest(`/orders/${id}`),
};

// Payment API
export const paymentApi = {
  createPaymentIntent: (amount: number) =>
    apiRequest("/stripe/payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),
};

// Tracking API
export const trackingApi = {
  getLiveTracking: (orderId: string) => apiRequest(`/tracking/${orderId}`),
  updateTracking: (orderId: string, data: any) =>
    apiRequest(`/tracking/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  startSimulation: (orderId: string) =>
    apiRequest(`/tracking/${orderId}/simulate`, {
      method: "POST",
      body: JSON.stringify({ action: "start" }),
    }),
};

// Push Notification API
export const pushApi = {
  registerToken: (token: string, userId?: string) =>
    apiRequest("/push/register-token", {
      method: "POST",
      body: JSON.stringify({ token, userId }),
    }),
  sendPush: (token: string, title: string, body: string, data?: any) =>
    apiRequest("/push/send", {
      method: "POST",
      body: JSON.stringify({ token, title, body, data }),
    }),
  sendOrderUpdate: (token: string, orderId: string, status: string) =>
    apiRequest("/push/send-order-update", {
      method: "POST",
      body: JSON.stringify({ token, orderId, status }),
    }),
  sendPromo: (title: string, body: string, promoCode?: string) =>
    apiRequest("/push/send-promo", {
      method: "POST",
      body: JSON.stringify({ title, body, promoCode }),
    }),
};

