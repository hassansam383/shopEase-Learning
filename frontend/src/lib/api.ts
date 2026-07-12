const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: 'CUSTOMER' | 'ADMIN';
}

// Product API
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products/category/${category}`);
  return res.json();
}

export async function searchProducts(name: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/products/search?name=${name}`);
  return res.json();
}

// Order API
export async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders`);
  return res.json();
}

export async function getOrdersByUser(userId: number): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/api/orders/user/${userId}`);
  return res.json();
}

export async function createOrder(order: { userId: number; items: { productId: number; productName: string; quantity: number; price: number }[] }): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  return res.json();
}

// User API
export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`);
  return res.json();
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
}
