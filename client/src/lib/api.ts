import type { AuthResponse, CreateProductPayload, LoginPayload, Order, Product, RegisterPayload, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
};

async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    method: options.method ?? 'GET',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? `Request failed with status ${response.status}`);
  }

  return data as T;
}

export function getProducts(): Promise<Product[]> {
  return requestJson<Product[]>('/products');
}

export function getProductById(id: string): Promise<Product> {
  return requestJson<Product>(`/products/${id}`);
}

export function createProduct(payload: CreateProductPayload, token: string): Promise<Product> {
  return requestJson<Product>('/products', {
    method: 'POST',
    body: payload,
    token
  });
}

export function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/users/register', {
    method: 'POST',
    body: payload
  });
}

export function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>('/users/login', {
    method: 'POST',
    body: payload
  });
}

export function getCurrentUser(token: string): Promise<User> {
  return requestJson<User>('/users/profile', {
    token
  });
}

export function getOrders(): Promise<Order[]> {
  return requestJson<Order[]>('/orders');
}
