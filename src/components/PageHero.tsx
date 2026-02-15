import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeroProps {
  icon: LucideIcon;
  subtitle: string;
  title: string;
  description: string;
  gradient?: string;
  orbColors?: [string, string, string];
}

const PageHero = ({ icon: Icon, subtitle, title, description }: PageHeroProps) => {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="relative z-10 container mx-auto px-4 text-center py-16 md:py-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg"
          style={{ boxShadow: "0 8px 40px hsl(183 100% 50% / 0.3)" }}
        >
          <Icon className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;
