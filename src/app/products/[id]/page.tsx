
"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/contexts/cart-context';
import { toast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart, Leaf, Droplets, Info } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

// Mocking the fetch - in real app use Firestore
const getProduct = (id: string) => {
  const products = [
    { id: "1", name: "Arctic Blue Fizz", price: 4.50, flavor: "Blue Raspberry", category: "Soda", ingredients: "Carbonated Water, Natural Blue Raspberry Flavor, Organic Cane Sugar, Citric Acid, Sea Salt.", description: "Experience an explosion of cool blue raspberry flavor balanced with a zesty citrus finish. Perfectly carbonated for that crisp refreshing bite.", imageUrl: PlaceHolderImages.find(i => i.id === 'soda-blue')?.imageUrl || "" },
    { id: "2", name: "Sunrise Burst", price: 5.99, flavor: "Valencia Orange", category: "Juice", ingredients: "Cold-pressed Valencia Oranges, Tangerine Zest, Vitamin C, Filtered Water.", description: "Fresh from the groves to your glass. We cold-press our oranges daily to preserve every nutrient and peak-season flavor.", imageUrl: PlaceHolderImages.find(i => i.id === 'juice-orange')?.imageUrl || "" },
    { id: "3", name: "Neon Surge", price: 4.99, flavor: "Citrus Lime", category: "Energy", ingredients: "Sparkling Water, Green Tea Extract, Electrolytes, Natural Lime Oil, B-Vitamins.", description: "Natural energy that doesn't leave you crashing. Powered by green tea extracts and fortified with essential electrolytes.", imageUrl: PlaceHolderImages.find(i => i.id === 'energy-vibrant')?.imageUrl || "" },
    { id: "4", name: "Island Breezer", price: 7.50, flavor: "Passionfruit", category: "Mocktail", ingredients: "Passionfruit Puree, Pineapple Juice, Mint Extract, Crushed Ice Essence, Coconut Nectar.", description: "A tropical vacation in a glass. This non-alcoholic mocktail combines exotic fruits with a refreshing minty undertone.", imageUrl: PlaceHolderImages.find(i => i.id === 'mocktail-fancy')?.imageUrl || "" },
  ];
  return products.find(p => p.id === id) || products[0];
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProduct(resolvedParams.id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      quantity, 
      imageUrl: product.imageUrl 
    });
    toast({
      title: "Success!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden border">
               <Image src={product.imageUrl} alt="thumbnail" fill className="object-cover opacity-60" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden border">
               <Image src="https://picsum.photos/seed/detail1/400/400" alt="thumbnail" fill className="object-cover opacity-60" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden border">
               <Image src="https://picsum.photos/seed/detail2/400/400" alt="thumbnail" fill className="object-cover opacity-60" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none text-sm px-4 py-1">{product.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <div className="p-6 glass-card rounded-2xl space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-green-600"><Leaf className="h-4 w-4" /> 100% Organic</span>
              <span className="flex items-center gap-2 text-blue-600"><Droplets className="h-4 w-4" /> Eco-friendly pack</span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> Ingredients</h4>
            <p className="text-sm text-muted-foreground bg-white/50 p-4 rounded-xl border border-dashed">
              {product.ingredients}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center border rounded-2xl p-2 bg-white">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                In Stock & Ready to Chill
              </p>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 rounded-2xl h-16 summer-gradient font-bold text-lg shadow-xl shadow-primary/20"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
