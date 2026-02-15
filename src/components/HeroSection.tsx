import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — responsive object position */}
      <motion.img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center sm:object-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />
      {/* Clean dark overlay */}
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="font-accent text-primary text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Welcome to
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold gradient-text leading-none mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 80 }}
          >
            TECH-VENTURE
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mx-auto mb-4 font-body leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A young startup fueled by curiosity and passion. We may be new, but we dream big
            and build bold — one project at a time.
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-accent tracking-[0.15em] sm:tracking-[0.2em] mb-8 sm:mb-10 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-primary">Learning</span>
            <span className="text-muted-foreground/60 mx-2">•</span>
            <span style={{ color: "hsl(260, 80%, 65%)" }}>Building</span>
            <span className="text-muted-foreground/60 mx-2">•</span>
            <span style={{ color: "hsl(50, 100%, 55%)" }}>Growing</span>
            <span className="text-muted-foreground/60 mx-2">•</span>
            <span style={{ color: "hsl(320, 80%, 60%)" }}>Shipping</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          {/* <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-accent text-xs sm:text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] transition-all duration-300"
          >
            Explore Our Work
          </button> */}
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-accent text-xs sm:text-sm tracking-wider uppercase border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
