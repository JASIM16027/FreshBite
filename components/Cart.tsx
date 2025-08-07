'use client';

import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { CouponSection } from './CouponSection';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, appliedCoupon, applyCoupon, removeCoupon, getDiscountAmount, getFinalTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <Card className="h-full rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl">Your Cart</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">Your cart is empty</p>
                <p className="text-gray-400 text-sm text-center mt-2">
                  Add some delicious items to get started!
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 py-3 border-b">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">${item.product.price}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <span className="font-semibold text-orange-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <CouponSection 
                    onApplyCoupon={applyCoupon}
                    appliedCoupon={appliedCoupon}
                  />
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${cart.total.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({appliedCoupon.code}):</span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery fee:</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax:</span>
                    <span>${((cart.total - getDiscountAmount()) * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">
                      ${getFinalTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}