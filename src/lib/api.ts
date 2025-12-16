const API_URL = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:8000';




let token: string | null = null;

export const setToken = (t: string | null) => {
  token = t;
  if (t) localStorage.setItem('cartify_token', t); else localStorage.removeItem('cartify_token');
};

export const getToken = () => {
  if (token) return token;
  const t = localStorage.getItem('cartify_token');
  token = t;
  return t;
};

export async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const t = getToken();
  if (t) headers['Authorization'] = `Bearer ${t}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  const ct = res.headers.get('content-type');
  if (ct && ct.includes('application/json')) return res.json();
  return res.text();
}

type ProductPayload = {
  name: string;
  categoryId?: number;
  price: number;
  comparePrice?: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  trending?: boolean;
  discount?: number;
  tags?: string[];
  deliveryTime?: number;
};

type ApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  role: 'seller' | 'delivery';
  details: string;
  extraInfo: string;
};

export const api = {
  auth: {
    register: (name: string, email: string, password: string, role: string) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) }),
    login: (email: string, password: string) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    me: () => request('/auth/me'),
  },
  products: {
    list: (params: Record<string, string | number | boolean> = {}) => {
      const q = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString();
      return request(`/products${q ? `?${q}` : ''}`);
    },
    get: (id: string) => request(`/products/${id}`),
    create: (data: ProductPayload) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: ProductPayload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) => request(`/products/${id}`, { method: 'DELETE' }),
  },
  orders: {
    create: (items: { productId: string; quantity: number }[], shippingAddress: string) =>
      request('/orders', { method: 'POST', body: JSON.stringify({ items, shippingAddress }) }),
    my: () => request('/orders/me'),
  },
  admin: {
    applications: {
      submit: (payload: ApplicationPayload) => request('/admin/applications', { method: 'POST', body: JSON.stringify(payload) }),
      list: (status?: string) => request(`/admin/applications${status ? `?status=${status}` : ''}`),
      updateStatus: (id: string, status: string) => request(`/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    },
    categories: {
      list: () => request('/admin/categories'),
      add: (name: string) => request('/admin/categories', { method: 'POST', body: JSON.stringify({ name }) }),
      remove: (id: number) => request(`/admin/categories/${id}`, { method: 'DELETE' }),
    },
  },
};

export default API_URL;