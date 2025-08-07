'use client';

import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { Cart, CartItem, Product, Coupon } from '@/types';

interface CartContextType {
  cart: Cart;
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('freshbite-cart');
    const savedCoupon = localStorage.getItem('freshbite-coupon');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('freshbite-cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
    setAppliedCoupon(null);
    localStorage.removeItem('freshbite-cart');
    localStorage.removeItem('freshbite-coupon');
  };

  const applyCoupon = (coupon: Coupon) => {
    if (cart.total >= coupon.minOrder) {
      setAppliedCoupon(coupon);
      localStorage.setItem('freshbite-coupon', JSON.stringify(coupon));
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('freshbite-coupon');
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (cart.total * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const getFinalTotal = () => {
    const subtotal = cart.total;
    const discount = getDiscountAmount();
    const deliveryFee = 2.99;
    const tax = (subtotal - discount) * 0.08;
    
    return Math.max(0, subtotal - discount + deliveryFee + tax);
  };

  return (
    <CartContext.Provider value={{
      cart,
      appliedCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      getDiscountAmount,
      getFinalTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}