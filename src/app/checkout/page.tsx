
"use client";

import { useState } from 'react';
import { useCart } from '@/lib/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      setIsOrdered(true);
      clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">Your refreshments are being prepared and will be with you shortly.</p>
          <p className="text-sm font-bold text-primary">Order ID: #CS-{Math.floor(Math.random() * 1000000)}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/products">
            <Button variant="outline" className="rounded-full">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button className="rounded-full summer-gradient">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Nothing to checkout</h2>
        <Link href="/products">
          <Button className="rounded-full summer-gradient">Browse Drinks</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-center">Complete Your Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Shipping Details
            </h3>
            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="alex@example.com" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Alex" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Rivera" required className="rounded-xl" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input id="address" placeholder="123 Main St" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Miami" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="33101" required className="rounded-xl" />
              </div>
            </form>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment Method
            </h3>
            <div className="p-4 border rounded-2xl bg-primary/5 border-primary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Credit / Debit Card</p>
                  <p className="text-xs text-muted-foreground">Secure checkout powered by Stripe</p>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-white ring-1 ring-primary" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Payment is processed securely. We don't store your card details.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-6 sticky top-24">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> Order Review
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex gap-3 items-center">
                    <span className="font-bold text-primary">{item.quantity}x</span>
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl h-16 summer-gradient font-bold text-lg shadow-xl shadow-primary/20"
            >
              {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
