import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Rocket } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-8 md:py-14 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">About</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">Who We Are</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-8 neon-border border"
          >
            <Rocket className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-xl mb-4 text-foreground">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tech-Venture is a brand-new startup born from a passion for technology. 
              We don't have years of corporate experience — and that's our superpower. 
              We bring fresh eyes, relentless energy, and a hunger to learn and deliver. 
              Every project is a chance to grow and prove what's possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-8 space-y-5"
          >
            <h3 className="font-display text-xl mb-4 text-foreground">Get in Touch</h3>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">techventure04@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">+91 9328621177</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Gujarat, India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
