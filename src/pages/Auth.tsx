import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

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
          options: { data: { name: form.name }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { lovable } = await import("@/integrations/lovable/index");
      const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
      if (error) toast.error(error.message || "Google sign-in failed");
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, hsl(260 80% 20% / 0.4), transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(183 100% 20% / 0.3), transparent 50%)" }} />
      <motion.div className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: "hsl(183, 100%, 50%)" }} animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }} transition={{ duration: 14, repeat: Infinity }} />
      <motion.div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] top-20 right-10" style={{ background: "hsl(260, 80%, 60%)" }} animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }} transition={{ duration: 18, repeat: Infinity }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass rounded-3xl p-8 md:p-10 neon-border border">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4"
            >
              {mode === "login" ? <LogIn className="w-7 h-7 text-primary-foreground" /> : <UserPlus className="w-7 h-7 text-primary-foreground" />}
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl gradient-text mb-2">
              {mode === "login" ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login" ? "Sign in to your account" : "Create a new account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text" placeholder="Full Name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email" placeholder="Email Address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-accent text-sm tracking-wider uppercase bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all font-semibold"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-accent">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3.5 rounded-xl font-accent text-sm tracking-wider flex items-center justify-center gap-3 border border-border bg-secondary/50 text-foreground hover:bg-secondary/80 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-primary hover:underline font-accent font-semibold"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default Auth;
