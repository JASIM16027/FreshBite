'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'hover:bg-orange-50 hover:border-orange-300'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}