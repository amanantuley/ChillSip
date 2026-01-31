
"use client";

import { useCart } from '@/lib/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven't added any drinks yet.</p>
        </div>
        <Link href="/products">
          <Button className="rounded-full summer-gradient font-bold h-12 px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex items-center gap-4">
        <Link href="/products">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Your Shopping Bag ({totalItems})</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4 bg-white/50 p-2 rounded-xl">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-6 sticky top-24">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-600 font-bold">FREE</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="w-full rounded-2xl h-14 summer-gradient font-bold text-lg shadow-xl shadow-primary/20">
                Place Order <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-[10px] text-center text-muted-foreground">
              By clicking Place Order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
