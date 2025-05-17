'use client';

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious Filipino food to your cart!</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#92400e',
        color: '#fff',
      },
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-amber-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.product.id} className="p-6 flex items-center">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">₱{item.product.price}</p>
                    <div className="mt-4 flex items-center">
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 border border-gray-300 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="mx-4 text-gray-900 border-t border-b border-gray-300 px-4 py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 px-2 py-1 border border-gray-300 rounded-r-md"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="ml-6 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-900">
                      ₱{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₱{getTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">₱{getTotal()}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full mt-6 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 