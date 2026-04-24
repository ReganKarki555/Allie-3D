import type { CartItem } from '@/types';

const USD_TO_NPR_RATE = 133;

export function formatPrice(amount: number): string {
  const nprAmount = amount * USD_TO_NPR_RATE;

  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    maximumFractionDigits: 0
  }).format(nprAmount);
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
