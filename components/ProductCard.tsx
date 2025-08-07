'use client';

import { Star, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer" onClick={() => onViewDetails?.(product)}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isFeatured && (
            <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>
          )}
          {product.isPopular && (
            <Badge variant="secondary">Popular</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 w-8 h-8 p-0 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-white/80 text-gray-600'} hover:bg-red-100 hover:text-red-500`}
          onClick={toggleFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-orange-600">${product.price}</span>
        </div>
        <Button
          onClick={handleAddToCart}
          className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}