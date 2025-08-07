'use client';

import { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { coupons } from '@/data/products';
import { Coupon } from '@/types';

interface CouponSectionProps {
  onApplyCoupon: (coupon: Coupon) => void;
  appliedCoupon?: Coupon | null;
}

export function CouponSection({ onApplyCoupon, appliedCoupon }: CouponSectionProps) {
  const [couponCode, setCouponCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showAllCoupons, setShowAllCoupons] = useState(false);

  const activeCoupons = coupons.filter(coupon => coupon.isActive);
  const displayedCoupons = showAllCoupons ? activeCoupons : activeCoupons.slice(0, 2);

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive);
    if (coupon) {
      onApplyCoupon(coupon);
      setCouponCode('');
    }
  };

  const handleCopyCoupon = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy coupon code:', err);
    }
  };

  const formatDiscount = (coupon: Coupon) => {
    return coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `$${coupon.discount} OFF`;
  };

  return (
    <div className="space-y-4">
      {/* Apply Coupon */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Tag className="w-5 h-5 mr-2 text-orange-500" />
            Apply Coupon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button 
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Apply
            </Button>
          </div>

          {appliedCoupon && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Coupon Applied!</p>
                  <p className="text-sm text-green-600">
                    {appliedCoupon.code} - {appliedCoupon.description}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {formatDiscount(appliedCoupon)}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Coupons */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Available Offers</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCoupons(!showAllCoupons)}
            >
              {showAllCoupons ? 'Show Less' : `View All (${activeCoupons.length})`}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border border-dashed border-orange-300 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className="bg-orange-500 text-white font-bold">
                      {coupon.code}
                    </Badge>
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      {formatDiscount(coupon)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{coupon.description}</p>
                  <p className="text-xs text-gray-500">
                    Min order: ${coupon.minOrder} • Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="text-xs"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onApplyCoupon(coupon)}
                    className="bg-orange-500 hover:bg-orange-600 text-xs"
                    disabled={appliedCoupon?.id === coupon.id}
                  >
                    {appliedCoupon?.id === coupon.id ? 'Applied' : 'Apply'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}