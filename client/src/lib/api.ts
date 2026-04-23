import type { Order, Product, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getProducts(): Promise<Product[]> {
  return requestJson<Product[]>('/products');
}

export function getProductById(id: string): Promise<Product> {
  return requestJson<Product>(`/products/${id}`);
}

export function getCurrentUser(): Promise<User> {
  return requestJson<User>('/users/profile');
}

export function getOrders(): Promise<Order[]> {
  return requestJson<Order[]>('/orders');
}
