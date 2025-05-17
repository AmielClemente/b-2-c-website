'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBestSellersOnly, setShowBestSellersOnly] = useState(false);
  const { addItem } = useCart();
  const params = useParams();
  const category = params.category as string;

  // Map URL category to product category
  const categoryMap: { [key: string]: string } = {
    'dishes': 'dish',
    'desserts': 'dessert',
    'snacks': 'snacks'
  };

  const productCategory = categoryMap[category] || 'dish';

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = product.category === productCategory;
    const matchesBestSeller = !showBestSellersOnly || product.isBestSeller;

    return matchesSearch && matchesCategory && matchesBestSeller;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showBestSellersOnly}
              onChange={(e) => setShowBestSellersOnly(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <span>Best Sellers Only</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.isBestSeller && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Best Seller
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
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
  );
} 