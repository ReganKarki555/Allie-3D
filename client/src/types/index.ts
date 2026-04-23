export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  rating?: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role?: 'customer' | 'vendor';
  isAdmin?: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
  confirmPassword: string;
  phoneNumber?: string;
  role?: 'customer' | 'vendor';
};

export type AuthResponse = User & {
  token: string;
};

export type Order = {
  _id: string;
  user: string;
  orderItems: CartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
};
