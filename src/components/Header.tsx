'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-amber-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/brown-logo.png"
              alt="Filipino Food Store Logo"
              width={120}
              height={40}
              className="w-auto"
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-amber-200">
              All Products
            </Link>
            <Link href="/cart" className="hover:text-amber-200 relative">
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link href="/orders" className="hover:text-amber-200">
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-amber-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-amber-200">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 