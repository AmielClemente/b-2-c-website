'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart, items, getTotal } = useCart();
  const { user } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    
    const paymentIntentId = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');

    if (!paymentIntentId || !paymentIntentClientSecret) {
      router.push('/');
      return;
    }

    hasProcessed.current = true;

    // Create the order
    const createOrder = async () => {
      try {
        // Get contact details from localStorage
        const contactDetails = JSON.parse(localStorage.getItem('contactDetails') || '{}');

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId,
            amount: getTotal(),
            contactDetails,
            items: items.map(item => ({
              productId: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price
            }))
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        // Clear the cart and contact details after successful order creation
        clearCart();
        localStorage.removeItem('contactDetails');
        
        // Show success message
        toast.success('Payment successful! Your order has been placed.', {
          duration: 5000,
          position: 'bottom-right',
          style: {
            background: '#92400e',
            color: '#fff',
          },
        });

        // Redirect to orders page after 3 seconds
        setTimeout(() => {
          router.push('/orders');
        }, 3000);
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error('Something went wrong. Please contact support.');
      }
    };

    createOrder();
  }, [router, searchParams, clearCart, items, getTotal]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-amber-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. You will be redirected to your order history shortly.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/orders')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            View Order History
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="text-sm text-gray-500">
            (You will be automatically redirected in 3 seconds)
          </div>
        </div>
      </div>
      <div className="animate-pulse">
        <div className="h-2 w-48 bg-amber-200 rounded mx-auto"></div>
      </div>
    </div>
  );
} 