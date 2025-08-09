import { Product, Category, Review, Coupon } from '@/types';

export const categories: Category[] = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'asian', name: 'Asian', icon: '🍜' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    rating: 4.8,
    reviews: 124,
    isPopular: true,
    isFeatured: true,
    tags: ['beef', 'classic', 'popular']
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, basil, and tomato sauce',
    price: 16.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.9,
    reviews: 89,
    isFeatured: true,
    tags: ['italian', 'vegetarian', 'classic']
  },
  {
    id: '3',
    name: 'Chicken Ramen Bowl',
    description: 'Rich broth with tender chicken, soft-boiled egg, and fresh vegetables',
    price: 14.50,
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'asian',
    rating: 4.7,
    reviews: 156,
    isPopular: true,
    tags: ['chicken', 'soup', 'asian']
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 8.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'desserts',
    rating: 4.6,
    reviews: 78,
    tags: ['chocolate', 'dessert', 'warm']
  },
  {
    id: '5',
    name: 'Fresh Fruit Smoothie',
    description: 'Blend of seasonal fruits with yogurt and honey',
    price: 6.99,
    image: 'https://images.pexels.com/photos/775030/pexels-photo-775030.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'beverages',
    rating: 4.5,
    reviews: 45,
    tags: ['healthy', 'fruit', 'fresh']
  },
  {
    id: '6',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and Caesar dressing',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'salads',
    rating: 4.4,
    reviews: 67,
    tags: ['healthy', 'vegetarian', 'fresh']
  },
  {
    id: '7',
    name: 'BBQ Bacon Burger',
    description: 'Smoky BBQ sauce, crispy bacon, and melted cheddar on a brioche bun',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'burgers',
    rating: 4.7,
    reviews: 98,
    isPopular: true,
    tags: ['bbq', 'bacon', 'premium']
  },
  {
    id: '8',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella cheese and our signature tomato sauce',
    price: 18.99,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'pizza',
    rating: 4.8,
    reviews: 142,
    isPopular: true,
    tags: ['pepperoni', 'classic', 'popular']
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    productId: '1',
    rating: 5,
    comment: 'Amazing burger! The beef was perfectly cooked and the sauce was incredible.',
    date: '2025-01-10',
    helpful: 12
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Smith',
    productId: '1',
    rating: 4,
    comment: 'Great taste but took a bit longer to arrive than expected.',
    date: '2025-01-08',
    helpful: 8
  },
  {
    id: '3',
    userId: '3',
    userName: 'Mike Johnson',
    productId: '2',
    rating: 5,
    comment: 'Best pizza in town! Fresh ingredients and perfect crust.',
    date: '2025-01-09',
    helpful: 15
  }
];

export const coupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME20',
    description: '20% off your first order',
    discount: 20,
    type: 'percentage',
    minOrder: 25,
    expiryDate: '2025-12-31',
    isActive: true
  },
  {
    id: '2',
    code: 'SAVE5',
    description: '$5 off orders over $30',
    discount: 5,
    type: 'fixed',
    minOrder: 30,
    expiryDate: '2025-06-30',
    isActive: true
  }
];