import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
      {/* Clean dark overlay — no gradient */}
      <div className="absolute inset-0 bg-background/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Floating glow orbs */}
      {/* <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "hsl(183, 100%, 50%)" }}
        animate={{ x: [0, 120, -80, 50, 0], y: [0, -80, 60, -40, 0], scale: [1, 1.3, 0.8, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] top-0 right-0"
        style={{ background: "hsl(260, 80%, 60%)" }}
        animate={{ x: [0, -100, 60, -30, 0], y: [0, 60, -50, 30, 0], scale: [1, 0.7, 1.3, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15 blur-[90px] bottom-10 left-10"
        style={{ background: "hsl(320, 80%, 55%)" }}
        animate={{ x: [0, 70, -90, 0], y: [0, -40, 70, 0], scale: [1, 1.3, 0.7, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-20">
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
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg font-accent text-xs sm:text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] transition-all duration-300"
          >
            Explore Our Work
          </button>
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
