'use client';

import { useState } from 'react';
import { Star, Plus, Minus, X, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Product, Review } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { reviews } from '@/data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  if (!isOpen || !product) return null;

  const productReviews = reviews.filter(review => review.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? 'text-red-500' : ''}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="flex space-x-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  {product.isFeatured && (
                    <Badge className="bg-orange-500">Featured</Badge>
                  )}
                  {product.isPopular && (
                    <Badge variant="secondary">Popular</Badge>
                  )}
                </div>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-orange-600">${product.price}</span>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg"
              >
                Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                <div>
                  <div className="font-semibold">🚚 Delivery</div>
                  <div>20-30 min</div>
                </div>
                <div>
                  <div className="font-semibold">🔥 Fresh</div>
                  <div>Made to order</div>
                </div>
                <div>
                  <div className="font-semibold">⭐ Quality</div>
                  <div>Premium ingredients</div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Tabs */}
          <div className="space-y-6">
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 px-1 font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Reviews ({productReviews.length})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <p className="text-gray-600">
                    Fresh, high-quality ingredients sourced locally. Contains allergens: gluten, dairy.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Nutritional Info</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Calories</div>
                      <div>450</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Protein</div>
                      <div>25g</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Carbs</div>
                      <div>35g</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="font-semibold">Fat</div>
                      <div>22g</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Add Review */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Write a Review</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Rating:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          >
                            <Star className="w-full h-full" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      placeholder="Share your experience..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="min-h-[80px]"
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Submit Review
                    </Button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium">{review.userName}</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{review.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.helpful} found helpful
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}