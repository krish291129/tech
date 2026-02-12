import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Tech-Venture" className="w-8 h-8" />
            <span className="font-display text-sm neon-text tracking-wider">TECH-VENTURE</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-xs">A young startup building bold digital experiences with passion and innovation.</p>
        </div>
        <div>
          <p className="font-accent text-xs text-primary tracking-wider uppercase mb-3">Quick Links</p>
          <div className="grid grid-cols-2 gap-1">
            {["/services", "/projects", "/about", "/blogs", "/faqs", "/contact"].map((path) => (
              <Link key={path} to={path} className="text-xs text-muted-foreground hover:text-primary transition-colors py-1 capitalize">
                {path.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-accent text-xs text-primary tracking-wider uppercase mb-3">Contact</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <a href="mailto:techventure04@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Mail className="w-3 h-3 text-primary" /> techventure04@gmail.com</a>
            <a href="tel:+919328621177" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Phone className="w-3 h-3 text-primary" /> +91 9328621177</a>
            <a href="https://wa.me/919328621177" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[hsl(142,70%,45%)] transition-colors"><MessageCircle className="w-3 h-3 text-[hsl(142,70%,45%)]" /> WhatsApp</a>
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-primary" /> Gujarat, India</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground/50">© {new Date().getFullYear()} Tech-Venture. All rights reserved.</p>
        <Link to="/admin" className="text-muted-foreground/20 hover:text-primary/40 transition-colors duration-700 text-xs select-none" title="">⚙</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
