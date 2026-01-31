
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">Have questions or want to partner with us? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-3xl space-y-12">
            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold">Email Us</h4>
                <p className="text-muted-foreground">hello@chillsip.com</p>
                <p className="text-xs text-primary">Response within 24hrs</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-foreground shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold">Call Us</h4>
                <p className="text-muted-foreground">+1 (800) CHILL-SIP</p>
                <p className="text-xs text-primary">Mon-Fri, 9am - 5pm EST</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold">Visit Us</h4>
                <p className="text-muted-foreground">123 Fresh Way, Suite 400<br />Summer Beach, CA 90210</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden h-64 relative border">
             <div className="absolute inset-0 bg-primary/5 flex items-center justify-center italic text-muted-foreground">
               Interactive Map Placeholder
             </div>
          </div>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Send us a Message</h3>
            <p className="text-sm text-muted-foreground">Tell us how we can help you stay refreshed.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="rounded-xl h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Partnership Inquiry" required className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." required className="rounded-xl min-h-[150px]" />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl summer-gradient font-bold text-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
