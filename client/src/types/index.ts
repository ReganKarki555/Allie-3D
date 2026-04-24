export type Product = {
  _id: string;
  seller?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  sellerName?: string;
  deliveryTime?: string;
  deliveryCharge?: number;
  gallery?: string[];
  deliveryOptions?: Array<{
    label: string;
    description: string;
  }>;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  reviews?: Array<{
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
  }>;
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

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
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
