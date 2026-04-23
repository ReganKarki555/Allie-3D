import type { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/helpers';

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div>
        <h3 className="font-medium text-zinc-950">{item.name}</h3>
        <p className="text-sm text-zinc-500">Qty {item.quantity}</p>
      </div>
      <span className="font-semibold text-zinc-950">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  );
}
