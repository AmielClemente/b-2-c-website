'use client';

import { products } from '@/data/products';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { category } = useParams();
  
  const filteredProducts = products.filter(
    product => product.category === category
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-amber-900 capitalize">
        {category} Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link 
            href={`/products/${product.id}`} 
            key={product.id}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-48"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-amber-900">{product.name}</h2>
              <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-amber-800">₱{product.price}</span>
                <span className="text-sm text-gray-500 capitalize">{product.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 