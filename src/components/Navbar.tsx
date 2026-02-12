import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const navLinks = [
  { path: "/", label: "Home", color: "hsl(183,100%,50%)" },
  { path: "/about", label: "About", color: "hsl(260,80%,60%)" },
  { path: "/services", label: "Services", color: "hsl(50,100%,50%)" },
  { path: "/projects", label: "Projects", color: "hsl(120,60%,45%)" },
  { path: "/blogs", label: "Blogs", color: "hsl(320,80%,55%)" },
  { path: "/faqs", label: "FAQs", color: "hsl(50,100%,50%)" },
  { path: "/contact", label: "Contact", color: "hsl(340,80%,55%)" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Tech-Venture" className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-110" />
            <span className="font-display text-lg md:text-xl neon-text tracking-wider">TECH-VENTURE</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 rounded-lg font-accent text-xs tracking-wider uppercase transition-all duration-300"
                  style={{
                    color: isActive ? link.color : undefined,
                    textShadow: isActive ? `0 0 10px ${link.color}80, 0 0 30px ${link.color}40` : undefined,
                    borderColor: isActive ? `${link.color}60` : "transparent",
                    backgroundColor: isActive ? `${link.color}10` : undefined,
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {!isActive && <span className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</span>}
                  {isActive && link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 rounded-full" style={{ backgroundColor: link.color, boxShadow: `0 0 8px ${link.color}` }} />
                  )}
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-lg font-accent text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg font-accent text-xs tracking-wider uppercase bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 animate-fade-in">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg font-accent text-sm tracking-wider uppercase transition-all"
                  style={{
                    color: isActive ? link.color : undefined,
                    textShadow: isActive ? `0 0 10px ${link.color}80` : undefined,
                    backgroundColor: isActive ? `${link.color}08` : undefined,
                  }}
                >
                  {!isActive && <span className="text-muted-foreground">{link.label}</span>}
                  {isActive && link.label}
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={() => { handleLogout(); setOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg font-accent text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</span>
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg font-accent text-sm tracking-wider uppercase text-primary"
              >
                <span className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Sign In</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
