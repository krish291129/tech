import { motion } from "framer-motion";
import { Star, Shield, Rocket, Clock, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "10+", label: "Happy Clients", color: "hsl(183,100%,50%)" },
  { icon: Rocket, value: "15+", label: "Projects Delivered", color: "hsl(260,80%,60%)" },
  { icon: Clock, value: "24h", label: "Avg Response Time", color: "hsl(50,100%,50%)" },
  { icon: Award, value: "100%", label: "Client Satisfaction", color: "hsl(120,60%,45%)" },
];

const reasons = [
  { icon: Rocket, title: "Fast Delivery", desc: "We ship quality work quickly without cutting corners, keeping your timeline on track.", color: "from-[hsl(183,100%,50%)] to-[hsl(200,100%,60%)]", shadow: "hsl(183,100%,50%)" },
  { icon: Shield, title: "Reliable & Secure", desc: "Security-first approach with clean, maintainable code you can trust long-term.", color: "from-[hsl(260,80%,55%)] to-[hsl(290,80%,65%)]", shadow: "hsl(260,80%,60%)" },
  { icon: Star, title: "Affordable Pricing", desc: "Premium quality at startup-friendly prices — we grow when you grow.", color: "from-[hsl(50,100%,50%)] to-[hsl(30,100%,55%)]", shadow: "hsl(50,100%,50%)" },
  { icon: Users, title: "Dedicated Support", desc: "We treat every client like a partner — ongoing support even after project launch.", color: "from-[hsl(120,60%,40%)] to-[hsl(150,70%,50%)]", shadow: "hsl(120,60%,45%)" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-8 md:py-14 relative">
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 text-center group"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-base text-muted-foreground font-accent tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-accent text-primary text-base tracking-[0.3em] uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-4">Built Different</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            We're not just another agency. Here's why clients trust us with their vision.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="glass rounded-2xl p-6 group cursor-default relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${reason.shadow}, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 shadow-lg`}
                  style={{ boxShadow: `0 4px 20px ${reason.shadow}30` }}
                >
                  <reason.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-accent font-semibold text-foreground text-base tracking-wider mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;