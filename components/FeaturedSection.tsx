'use client';

import { ProductCard } from './ProductCard';
import { products } from '@/data/products';

export function FeaturedSection() {
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Dishes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our chef's special selections and customer favorites
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}