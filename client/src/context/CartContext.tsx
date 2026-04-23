'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '@/types';
import { getStoredAuth } from '@/lib/auth';

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem(product: Product) {
      const auth = getStoredAuth();
      const role = auth?.user.role;
      const isAllowedRole = role === 'customer' || role === 'vendor';

      if (!auth || !isAllowedRole) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login?redirect=%2Fproducts';
        }
        return;
      }

      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item._id === product._id);

        if (existingItem) {
          return currentItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...currentItems, { ...product, quantity: 1 }];
      });
    },
    removeItem(productId: string) {
      setItems((currentItems) => currentItems.filter((item) => item._id !== productId));
    },
    updateQuantity(productId: string, quantity: number) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    },
    clearCart() {
      setItems([]);
    }
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
}
