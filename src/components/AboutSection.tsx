import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Rocket } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-4 md:py-8 relative">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text">
            Who We Are
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-8 neon-border border"
          >
            <Rocket className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-xl mb-4 text-foreground">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Tech-Venture is more than just a startup — it’s a movement fueled by curiosity,
              creativity, and courage. We were born out of a simple idea: technology should inspire,
              empower, and transform lives. Unlike traditional companies weighed down by years of
              rigid processes, we thrive on agility and fresh perspectives. Every challenge excites
              us, every project is a new frontier, and every success is proof that passion beats
              convention. We are explorers in the digital age, constantly learning, adapting, and
              pushing boundaries to create solutions that matter.
            </p>
          </motion.div>

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5 sm:p-8 space-y-5"
          >
            <h3 className="font-display text-xl mb-4 text-foreground">Let’s Connect</h3>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Whether you’re a fellow innovator, a curious learner, or someone with a bold idea,
              we’d love to hear from you. Collaboration is at the heart of everything we do, and
              every conversation sparks new possibilities. Reach out to us — let’s build something
              extraordinary together.
            </p>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a
                href="mailto:techventure04@gmail.com"
                className="text-sm hover:text-primary transition-colors"
              >
                techventure04@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <a
                href="tel:+919328621177"
                className="text-sm hover:text-primary transition-colors"
              >
                +91 9328621177
              </a>
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