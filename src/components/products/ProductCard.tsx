
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '@/lib/contexts/cart-context';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  flavor: string;
  imageUrl: string;
  category: string;
}

export default function ProductCard({ id, name, price, flavor, imageUrl, category }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, quantity: 1, imageUrl });
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your shopping bag.`,
    });
  };

  return (
    <Link href={`/products/${id}`} className="group">
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/80 backdrop-blur-sm text-primary font-bold hover:bg-white">
              {category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-5 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{name}</h3>
            <span className="font-bold text-primary">${price.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 italic">{flavor}</p>
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-4 rounded-xl summer-gradient font-bold"
          >
            <Plus className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
