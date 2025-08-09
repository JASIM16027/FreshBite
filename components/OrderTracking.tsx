'use client';

import { useState } from 'react';
import { CheckCircle, Clock, Truck, Package, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';

interface OrderTrackingProps {
  order: Order;
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: CheckCircle, completed: true },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, completed: order.status !== 'pending' },
    { key: 'preparing', label: 'Preparing', icon: Package, completed: ['preparing', 'out-for-delivery', 'delivered'].includes(order.status) },
    { key: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, completed: ['out-for-delivery', 'delivered'].includes(order.status) },
    { key: 'delivered', label: 'Delivered', icon: MapPin, completed: order.status === 'delivered' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = order.status === step.key;
              const isCompleted = step.completed;

              return (
                <div key={step.key} className="flex flex-col items-center relative">
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute top-6 left-6 w-full h-0.5 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      style={{ width: 'calc(100% + 48px)' }}
                    />
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 text-center max-w-20 ${
                      isCompleted || isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-900">
                Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm text-orange-700">
                Your order will arrive in approximately 25-30 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Order Items</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Hide' : 'Show'} Details
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Delivery Address
          </h3>
          <p className="text-sm text-gray-700">
            {order.deliveryAddress.street}<br />
            {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            Contact Support
          </Button>
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}