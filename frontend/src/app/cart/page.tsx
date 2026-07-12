'use client'

import { useState, useEffect } from 'react'
import { createOrder } from '@/lib/api'

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const updateCart = (items: CartItem[]) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const removeItem = (productId: number) => {
    updateCart(cartItems.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    updateCart(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      await createOrder({
        userId: 1,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      })
      localStorage.removeItem('cart')
      setCartItems([])
      setOrderPlaced(true)
    } catch (error) {
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        <a href="/orders" className="mt-6 inline-block bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700">
          View Orders
        </a>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <a href="/" className="mt-6 inline-block bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700">
          Continue Shopping
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-lg font-semibold w-24 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}
