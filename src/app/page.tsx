
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Quote } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/products/ProductCard';

export default function Home() {
  const featuredDrinks = [
    {
      id: "blue-soda",
      name: "Arctic Blue Fizz",
      price: 4.50,
      flavor: "Blue Raspberry & Lemon",
      imageUrl: PlaceHolderImages.find(i => i.id === 'soda-blue')?.imageUrl || "",
      category: "Soda"
    },
    {
      id: "orange-juice",
      name: "Sunrise Burst",
      price: 5.99,
      flavor: "Valencia Orange & Tangerine",
      imageUrl: PlaceHolderImages.find(i => i.id === 'juice-orange')?.imageUrl || "",
      category: "Juice"
    },
    {
      id: "tropical-mocktail",
      name: "Island Breezer",
      price: 7.50,
      flavor: "Passionfruit & Pineapple",
      imageUrl: PlaceHolderImages.find(i => i.id === 'mocktail-fancy')?.imageUrl || "",
      category: "Mocktail"
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={PlaceHolderImages.find(i => i.id === 'hero-bg')?.imageUrl || ""}
            alt="Summer Vibe"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-secondary-foreground text-sm font-bold animate-float">
              Refreshing Summer 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Refresh Your Mood <br />
              <span className="text-primary italic">with Every Sip</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-lg">
              Ice-cold drinks crafted for instant freshness. Using 100% natural fruit extracts and zero artificial colors.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8 h-14 summer-gradient font-bold text-lg">
                  Explore Drinks
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 bg-white/20 backdrop-blur-md border-white font-bold text-lg hover:bg-white hover:text-primary">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 glass-card rounded-3xl text-center space-y-4 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">100% Refreshing</h3>
            <p className="text-sm text-muted-foreground">Scientifically formulated to lower your body temperature instantly.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl text-center space-y-4 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-secondary/20 text-secondary-foreground rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Instant Chill</h3>
            <p className="text-sm text-muted-foreground">Unique flash-freeze technology keeps our drinks cold for up to 12 hours.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl text-center space-y-4 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">Only the freshest organic ingredients from sustainable local farms.</p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Chills</h2>
            <p className="text-muted-foreground">Our most loved refreshments this week</p>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-primary font-bold group">
              View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDrinks.map((drink) => (
            <ProductCard key={drink.id} {...drink} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Sippers Say</h2>
            <p className="text-muted-foreground">Join over 10,000+ satisfied customers nationwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivera", quote: "The Sunrise Burst literally saved my beach day. So refreshing!", city: "Miami, FL" },
              { name: "Sarah Jenkins", quote: "I've tried a lot of energy drinks, but nothing hits quite like the Neon Green.", city: "Austin, TX" },
              { name: "Michael Chen", quote: "Perfect balance of sweetness. Doesn't feel like I'm drinking liquid sugar.", city: "San Diego, CA" }
            ].map((t, i) => (
              <div key={i} className="p-8 glass-card rounded-2xl space-y-6 relative">
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/10 rotate-180" />
                <p className="italic text-lg text-muted-foreground">"{t.quote}"</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="rounded-[3rem] summer-gradient p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <h2 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
            Ready for a Fresh <br /> Experience?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get your favorite ChillSip drinks delivered straight to your door. Freshness guaranteed.
          </p>
          <div className="pt-8">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 font-bold text-xl shadow-xl shadow-black/10">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
