
"use client";

import { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = ["All", "Soda", "Juice", "Energy", "Mocktail"];

// Hardcoded for demo, normally fetched from Firestore
const MOCK_PRODUCTS = [
  { id: "1", name: "Arctic Blue Fizz", price: 4.50, flavor: "Blue Raspberry", category: "Soda", imageUrl: PlaceHolderImages.find(i => i.id === 'soda-blue')?.imageUrl || "" },
  { id: "2", name: "Sunrise Burst", price: 5.99, flavor: "Valencia Orange", category: "Juice", imageUrl: PlaceHolderImages.find(i => i.id === 'juice-orange')?.imageUrl || "" },
  { id: "3", name: "Neon Surge", price: 4.99, flavor: "Citrus Lime", category: "Energy", imageUrl: PlaceHolderImages.find(i => i.id === 'energy-vibrant')?.imageUrl || "" },
  { id: "4", name: "Island Breezer", price: 7.50, flavor: "Passionfruit", category: "Mocktail", imageUrl: PlaceHolderImages.find(i => i.id === 'mocktail-fancy')?.imageUrl || "" },
  { id: "5", name: "Purple Chill", price: 4.50, flavor: "Midnight Grape", category: "Soda", imageUrl: "https://picsum.photos/seed/soda2/600/800" },
  { id: "6", name: "Green Glow", price: 6.50, flavor: "Kale & Apple", category: "Juice", imageUrl: "https://picsum.photos/seed/juice2/600/800" },
  { id: "7", name: "Red Lightning", price: 5.50, flavor: "Wild Cherry", category: "Energy", imageUrl: "https://picsum.photos/seed/energy2/600/800" },
  { id: "8", name: "Sunset Martini", price: 8.50, flavor: "Strawberry Basil", category: "Mocktail", imageUrl: "https://picsum.photos/seed/mocktail2/600/800" },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.flavor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">The Chill Selection</h1>
        <p className="text-muted-foreground">Choose from our curated collection of refreshing drinks</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between sticky top-20 z-40 bg-background/80 backdrop-blur-md p-4 rounded-2xl border">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full transition-all",
                activeCategory === cat ? "summer-gradient" : "bg-white"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search drinks..." 
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-24 space-y-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Filter className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No drinks found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            <Button variant="link" onClick={() => {setActiveCategory("All"); setSearchQuery("");}}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
