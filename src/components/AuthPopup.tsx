import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthPopup = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsLoggedIn(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) setVisible(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn || dismissed) return;
    const alreadyDismissed = sessionStorage.getItem("auth-popup-dismissed");
    if (alreadyDismissed) { setDismissed(true); return; }

    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [isLoggedIn, dismissed]);

  const handleClose = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("auth-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!form.name.trim()) { toast.error("Name is required"); setLoading(false); return; }
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { name: form.name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
      }
      handleClose();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { lovable } = await import("@/integrations/lovable/index");
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) toast.error(error.message || "Google sign-in failed");
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="glass rounded-2xl p-6 md:p-8 w-full max-w-md neon-border border relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              {mode === "login" ? <LogIn className="w-6 h-6 text-primary" /> : <UserPlus className="w-6 h-6 text-primary" />}
              <h2 className="font-display text-xl text-foreground">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all"
              >
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-accent">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full py-3 rounded-lg font-accent text-sm tracking-wider flex items-center justify-center gap-3 border border-border bg-secondary/50 text-foreground hover:bg-secondary/80 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign in with Google
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary hover:underline font-accent"
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopup;
