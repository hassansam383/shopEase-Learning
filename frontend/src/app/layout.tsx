import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'A simple e-commerce application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <a href="/" className="text-2xl font-bold text-primary-600">
                  🛒 ShopEase
                </a>
                <div className="flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                    Products
                  </a>
                  <a href="/cart" className="text-gray-700 hover:text-primary-600 font-medium">
                    Cart
                  </a>
                  <a href="/orders" className="text-gray-700 hover:text-primary-600 font-medium">
                    Orders
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
