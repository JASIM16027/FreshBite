'use client';

import { useState } from 'react';
import { Star, DollarSign, Clock, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  categories: string[];
  tags: string[];
  deliveryTime: string;
  dietary: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, onClearFilters, isOpen, onClose }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten Free', icon: '🌾' },
    { id: 'dairy-free', label: 'Dairy Free', icon: '🥛' },
    { id: 'keto', label: 'Keto Friendly', icon: '🥑' },
    { id: 'low-carb', label: 'Low Carb', icon: '🥩' },
  ];

  const deliveryOptions = [
    { id: 'fast', label: 'Under 20 min', icon: '⚡' },
    { id: 'standard', label: '20-30 min', icon: '🚚' },
    { id: 'scheduled', label: 'Schedule Later', icon: '📅' },
  ];

  const popularTags = [
    'spicy', 'healthy', 'comfort food', 'premium', 'family size', 'single serving'
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    handleFilterChange('tags', newTags);
  };

  const handleDietaryToggle = (dietary: string) => {
    const newDietary = localFilters.dietary.includes(dietary)
      ? localFilters.dietary.filter(d => d !== dietary)
      : [...localFilters.dietary, dietary];
    handleFilterChange('dietary', newDietary);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 50) count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.tags.length > 0) count++;
    if (localFilters.dietary.length > 0) count++;
    if (localFilters.deliveryTime) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:relative lg:bg-transparent lg:z-auto">
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto lg:relative lg:w-full lg:shadow-none">
        <Card className="h-full rounded-none lg:rounded-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2 bg-orange-500">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  Clear
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
                  ✕
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Price Range
              </h3>
              <div className="px-2">
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={50}
                  min={0}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${localFilters.priceRange[0]}</span>
                  <span>${localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={localFilters.rating === rating}
                      onCheckedChange={() => handleFilterChange('rating', rating)}
                    />
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{rating} & above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Delivery Time */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Delivery Time
              </h3>
              <div className="space-y-2">
                {deliveryOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={localFilters.deliveryTime === option.id}
                      onCheckedChange={() => handleFilterChange('deliveryTime', option.id)}
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dietary Preferences */}
            <div>
              <h3 className="font-medium mb-3">Dietary Preferences</h3>
              <div className="space-y-2">
                {dietaryOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={localFilters.dietary.includes(option.id)}
                      onCheckedChange={() => handleDietaryToggle(option.id)}
                    />
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator />

            {/* Popular Tags */}
            <div>
              <h3 className="font-medium mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={localFilters.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagToggle(tag)}
                    className={`text-xs ${
                      localFilters.tags.includes(tag)
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'hover:bg-orange-50 hover:border-orange-300'
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}