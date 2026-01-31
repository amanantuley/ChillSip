
"use client";

import { useAuth } from '@/lib/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Package, ShoppingCart, Users, Edit2, Trash2, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateProductDescription } from '@/ai/flows/generate-product-descriptions';
import { toast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    flavor: '',
    description: '',
    ingredients: '',
    category: 'Soda' as any,
    price: 0
  });

  const handleGenerateDescription = async () => {
    if (!newProduct.name || !newProduct.flavor) {
      toast({ title: "Incomplete info", description: "Please provide a name and flavor first." });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateProductDescription(newProduct);
      setNewProduct(prev => ({ ...prev, description: result.description }));
      toast({ title: "AI Generation Complete!", description: "Description has been updated." });
    } catch (e) {
      toast({ variant: "destructive", title: "GenAI Error", description: "Failed to generate description." });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) return <div className="p-24 text-center">Checking credentials...</div>;
  if (!isAdmin) return (
    <div className="p-24 text-center space-y-4">
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p>Only administrators can access this area.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your brand, products, and customers.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Admin Session</p>
            <p className="text-sm font-bold">admin@chillsip.com</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-8">
        <TabsList className="bg-white/50 p-1 h-14 rounded-2xl border w-full md:w-auto overflow-auto">
          <TabsTrigger value="products" className="rounded-xl px-8 h-12 data-[state=active]:summer-gradient data-[state=active]:text-white"><Package className="h-4 w-4 mr-2" /> Products</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-xl px-8 h-12 data-[state=active]:summer-gradient data-[state=active]:text-white"><ShoppingCart className="h-4 w-4 mr-2" /> Orders</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl px-8 h-12 data-[state=active]:summer-gradient data-[state=active]:text-white"><Users className="h-4 w-4 mr-2" /> Users</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1 glass-card p-8 rounded-3xl space-y-6 h-fit">
              <h3 className="text-xl font-bold flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> Add New Drink</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Drink Name</Label>
                  <Input placeholder="Arctic Blue Fizz" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Flavor Profile</Label>
                  <Input placeholder="Blue Raspberry & Lemon" value={newProduct.flavor} onChange={e => setNewProduct({...newProduct, flavor: e.target.value})} className="rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <select className="w-full h-10 px-3 border rounded-xl bg-background" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                      <option>Soda</option>
                      <option>Juice</option>
                      <option>Energy</option>
                      <option>Mocktail</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input type="number" placeholder="4.50" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Description</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-primary h-7 px-2" 
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                    >
                      <Wand2 className="h-3 w-3 mr-1" /> {isGenerating ? "Thinking..." : "AI Generate"}
                    </Button>
                  </div>
                  <Textarea placeholder="Generated or custom description..." className="rounded-xl min-h-[100px]" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
                <Button className="w-full rounded-xl summer-gradient font-bold h-12">
                  Save Product
                </Button>
              </div>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card rounded-3xl overflow-hidden border">
                <table className="w-full">
                  <thead className="bg-primary/5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 text-left">Product</th>
                      <th className="px-6 py-4 text-left">Category</th>
                      <th className="px-6 py-4 text-left">Price</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {[
                      { id: 1, name: "Arctic Blue Fizz", cat: "Soda", price: 4.50 },
                      { id: 2, name: "Sunrise Burst", cat: "Juice", price: 5.99 },
                      { id: 3, name: "Neon Surge", cat: "Energy", price: 4.99 }
                    ].map(p => (
                      <tr key={p.id} className="hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4 font-bold">{p.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{p.cat}</td>
                        <td className="px-6 py-4 font-medium text-primary">${p.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Edit2 className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="glass-card p-12 rounded-3xl text-center space-y-4">
             <ShoppingCart className="h-12 w-12 text-primary/20 mx-auto" />
             <h3 className="text-xl font-bold">No active orders found</h3>
             <p className="text-muted-foreground">Orders from customers will appear here once placed.</p>
          </div>
        </TabsContent>

        <TabsContent value="users">
           <div className="glass-card p-12 rounded-3xl text-center space-y-4">
             <Users className="h-12 w-12 text-primary/20 mx-auto" />
             <h3 className="text-xl font-bold">Manage Sippers</h3>
             <p className="text-muted-foreground">User accounts and permissions management.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
