'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { addItem } = useCart();
  const params = useParams();
  const productId = params.id as string;
  
  // Try to find product by ID first, then by name
  const product = products.find(p => p.id === productId) || 
                 products.find(p => p.name.toLowerCase() === productId.toLowerCase());

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
        position: 'bottom-right',
        style: {
          background: '#92400e',
          color: '#fff',
        },
      });
    }
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        <Link href="/products" className="mt-4 inline-block text-amber-600 hover:text-amber-700">
          Return to products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.isBestSeller && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Best Seller
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{product.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-900">₱{product.price}</span>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <Link
              href={`/category/${product.category}s`}
              className="text-amber-600 hover:text-amber-700"
            >
              ← Back to {product.category}s
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 