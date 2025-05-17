'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { addItem } = useCart();
  const bestSellers = products.filter(product => product.isBestSeller);

  const categories = [
    {
      id: 'dishes',
      name: 'Dishes',
      description: 'Traditional Filipino main dishes',
      image: '/images/adobo.jpg',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet Filipino treats',
      image: '/images/leche-flan.jpg',
    },
    {
      id: 'snacks',
      name: 'Snacks',
      description: 'Quick Filipino bites',
      image: '/images/lumpia.jpg',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-amber-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/filipino-food.jpg"
          alt="Filipino Food"
          fill
          className="object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Filipino Cuisine</h1>
          <p className="text-lg md:text-xl mb-8">Experience the rich flavors of the Philippines</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-4">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Best Seller
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-900">₱{product.price}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                      }}
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
