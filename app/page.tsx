'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { FeaturedSection } from '@/components/FeaturedSection';
import { Cart } from '@/components/Cart';
import { FilterSidebar } from '@/components/FilterSidebar';
import { OrderTracking } from '@/components/OrderTracking';
import { CartProvider } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { Product, Order, Address } from '@/types';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 50] as [number, number],
    rating: 0,
    categories: [] as string[],
    tags: [] as string[],
    deliveryTime: '',
    dietary: [] as string[],
  });

  // Mock order for demonstration
  const mockOrder: Order = {
    id: 'ORD-2025-001',
    userId: '1',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 }
    ],
    total: 42.97,
    status: 'preparing',
    deliveryAddress: {
      id: '1',
      label: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    orderDate: '2025-01-15T10:30:00Z',
    estimatedDelivery: '2025-01-15T11:15:00Z',
    paymentMethod: 'Credit Card'
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
    
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => product.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesTags;
  });

  const handleClearFilters = () => {
    setFilters({
      priceRange: [0, 50],
      rating: 0,
      categories: [],
      tags: [],
      deliveryTime: '',
      dietary: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 py-12">
          <FeaturedSection />
          
          {/* Order Tracking Demo */}
          <div className="mb-8">
            <Button
              onClick={() => setShowOrderTracking(!showOrderTracking)}
              variant="outline"
              className="mb-4"
            >
              {showOrderTracking ? 'Hide' : 'Show'} Order Tracking Demo
            </Button>
            {showOrderTracking && (
              <div className="max-w-2xl">
                <OrderTracking order={mockOrder} />
              </div>
            )}
          </div>
          
          <section id="menu" className="scroll-mt-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Menu</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our full menu of delicious dishes made with fresh, quality ingredients
              </p>
            </div>
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="flex gap-8">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                  isOpen={true}
                  onClose={() => {}}
                />
              </div>
              
              {/* Main Content */}
              <div className="flex-1">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </Button>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onViewDetails={setSelectedProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🍔</span>
                </div>
                <h3 className="text-xl font-bold">FreshBite</h3>
              </div>
              <p className="text-gray-400">
                Delivering delicious, fresh food right to your doorstep.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Burgers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pizza</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Asian Food</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Desserts</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (555) 123-4567</li>
                <li>📧 hello@freshbite.com</li>
                <li>📍 123 Food Street, City</li>
                <li>🕒 Open 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FreshBite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}