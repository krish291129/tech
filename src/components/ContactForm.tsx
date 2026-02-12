import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, MessageSquare, Zap, HeartHandshake, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { addMessageToDB } from "@/lib/supabase-store";
import { toast } from "sonner";

const whyCards = [
  { icon: MessageSquare, title: "Free Consultation", desc: "Let's discuss your project needs", color: "from-[hsl(183,100%,50%)] to-[hsl(200,100%,60%)]", shadow: "hsl(183,100%,50%)" },
  { icon: Zap, title: "Quick Turnaround", desc: "Fast delivery without compromising quality", color: "from-[hsl(50,100%,50%)] to-[hsl(30,100%,55%)]", shadow: "hsl(50,100%,50%)" },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "We're here for you after launch", color: "from-[hsl(260,80%,55%)] to-[hsl(290,80%,65%)]", shadow: "hsl(260,80%,60%)" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "techventure04@gmail.com", href: "mailto:techventure04@gmail.com", color: "hsl(183,100%,50%)" },
  { icon: Phone, label: "Phone", value: "+91 9328621177", href: "tel:+919328621177", color: "hsl(260,80%,60%)" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919328621177", color: "hsl(142,70%,45%)" },
  { icon: MapPin, label: "Location", value: "Gujarat, India", href: undefined, color: "hsl(120,60%,45%)" },
  { icon: Clock, label: "Response", value: "Within 24 hours", href: undefined, color: "hsl(50,100%,50%)" },
];

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    setSending(true);
    try {
      await addMessageToDB({ name: form.name, email: form.email, subject: form.subject, message: form.message });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
      setTimeout(() => setSent(false), 3000);
    } catch {
      toast.error("Failed to send message");
    }
    setSending(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {contactInfo.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, y: -3 }}
            onClick={() => item.href && (item.href.startsWith("http") ? window.open(item.href, "_blank") : (window.location.href = item.href))}
            className="glass rounded-xl p-4 text-center cursor-pointer group"
          >
            <item.icon className="w-5 h-5 mx-auto mb-2" style={{ color: item.color }} />
            <p className="font-accent text-xs text-muted-foreground tracking-wider mb-1">{item.label}</p>
            <p className="text-foreground text-xs font-medium break-all">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Form + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass rounded-2xl p-8 md:p-10 border border-glass-border/30"
        >
          <h3 className="font-display text-xl gradient-text mb-6">Send Us a Message</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-accent tracking-wider text-foreground mb-2">
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-accent tracking-wider text-foreground mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-accent tracking-wider text-foreground mb-2">
              Subject <span className="text-primary">*</span>
            </label>
            <input
              type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              maxLength={200}
              className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base"
              placeholder="Project Inquiry"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-accent tracking-wider text-foreground mb-2">
              Your Message <span className="text-primary">*</span>
            </label>
            <textarea
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={2000} rows={8}
              className="w-full px-4 py-3.5 rounded-xl bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-base"
              placeholder="Tell us about your project in detail..."
            />
          </div>
          <button
            type="submit" disabled={sending}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-accent text-sm tracking-wider uppercase bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all duration-300 font-semibold"
          >
            {sent ? <><CheckCircle className="w-5 h-5" /> Sent!</> : sending ? "Sending..." : <><Send className="w-5 h-5" /> Send Message</>}
          </button>
        </motion.form>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 border border-glass-border/30"
          >
            <h3 className="font-display text-lg neon-text mb-5">Why Work With Us?</h3>
            <div className="space-y-4">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    style={{ boxShadow: `0 4px 15px ${card.shadow}30` }}
                  >
                    <card.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-foreground text-sm">{card.title}</p>
                    <p className="text-muted-foreground text-xs">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Process section below Why Work With Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-glass-border/30"
          >
            <h3 className="font-display text-lg mb-5" style={{ color: "hsl(260,80%,65%)" }}>Our Process</h3>
            <div className="space-y-4">
              {[
                { step: "01", title: "Discovery", desc: "We understand your goals and vision", color: "hsl(183,100%,50%)" },
                { step: "02", title: "Design", desc: "Crafting a UI that speaks your brand", color: "hsl(260,80%,65%)" },
                { step: "03", title: "Develop", desc: "Clean code, modern tech, fast delivery", color: "hsl(50,100%,55%)" },
                { step: "04", title: "Launch", desc: "Deploy, support, and grow together", color: "hsl(320,80%,60%)" },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-sm border"
                    style={{ borderColor: `${item.color}50`, color: item.color }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
