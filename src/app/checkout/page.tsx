'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

// Initialize Stripe outside of component to avoid multiple initializations
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

function CheckoutForm({ total, contactDetails, items }: { 
  total: number; 
  contactDetails: ContactDetails;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) {
        toast.error(error.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : `Pay ₱${total}`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, getTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    // Store contact details in localStorage when they change
    localStorage.setItem('contactDetails', JSON.stringify(contactDetails));

    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: getTotal(),
            items: items.map(item => ({
              productId: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price
            }))
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to initialize payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [user, items, router, getTotal, contactDetails]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading payment form...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to initialize payment. Please try again.</p>
        <button
          onClick={() => router.push('/cart')}
          className="mt-4 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="text-gray-900">
                    ₱{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">₱{getTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactDetails.name}
                  onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={contactDetails.email}
                  onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={contactDetails.phone}
                  onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={contactDetails.address}
                  onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={contactDetails.city}
                    onChange={(e) => setContactDetails({ ...contactDetails, city: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={contactDetails.postalCode}
                    onChange={(e) => setContactDetails({ ...contactDetails, postalCode: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm 
              total={getTotal()} 
              contactDetails={contactDetails}
              items={items}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
} 