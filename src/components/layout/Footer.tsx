
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/50 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">
            Chill<span className="text-secondary">Sip</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Crafting the finest ice-cold drinks to refresh your day and boost your mood. Summer in every sip.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-primary transition-colors">Our Drinks</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>123 Fresh Way, Summer Beach, CA 90210</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+1 (800) CHILL-SIP</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>hello@chillsip.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Get the latest refreshements delivered to your inbox.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white border rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ChillSip Refreshments. All rights reserved.</p>
      </div>
    </footer>
  );
}
