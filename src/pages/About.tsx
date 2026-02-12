import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Rocket, Heart, Code2, Award, TrendingUp } from "lucide-react";
import PageHero from "@/components/PageHero";

const values = [
  { icon: Lightbulb, title: "Innovation First", desc: "We embrace new technologies and creative solutions to solve complex problems.", color: "from-[hsl(50,100%,50%)] to-[hsl(30,100%,55%)]", shadow: "hsl(50,100%,50%)" },
  { icon: Heart, title: "Passion Driven", desc: "Every project is built with genuine passion and dedication to excellence.", color: "from-[hsl(340,80%,55%)] to-[hsl(360,80%,60%)]", shadow: "hsl(340,80%,55%)" },
  { icon: Code2, title: "Quality Code", desc: "Clean, maintainable, and scalable code is our standard — never a shortcut.", color: "from-[hsl(183,100%,50%)] to-[hsl(200,100%,60%)]", shadow: "hsl(183,100%,50%)" },
  { icon: Users, title: "Client Focused", desc: "Your success is our success. We listen, adapt, and deliver beyond expectations.", color: "from-[hsl(260,80%,55%)] to-[hsl(290,80%,65%)]", shadow: "hsl(260,80%,60%)" },
];

const stats = [
  { label: "Projects Delivered", value: "10+", icon: Award },
  { label: "Happy Clients", value: "15+", icon: Heart },
  { label: "Technologies", value: "20+", icon: Code2 },
  { label: "Growing Fast", value: "100%", icon: TrendingUp },
];

const About = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        icon={Users}
        subtitle="About Us"
        title="Who We Are"
        description="A young startup fueled by curiosity and passion, building bold digital experiences one project at a time."
        gradient="radial-gradient(ellipse at 50% 30%, hsl(260 80% 15% / 0.5), transparent 60%), radial-gradient(ellipse at 80% 70%, hsl(183 100% 15% / 0.3), transparent 50%)"
        orbColors={["hsl(260, 80%, 60%)", "hsl(183, 100%, 50%)", "hsl(340, 80%, 55%)"]}
      />

      {/* Story Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">From Dream to Reality</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Tech-Venture was born from a simple belief: that young minds with the right tools can build extraordinary things. 
                  We started as a small team of developers and designers passionate about creating impactful digital solutions.
                </p>
                <p>
                  Today, we offer end-to-end digital services — from stunning websites and mobile apps to strategic 
                  digital marketing. We may be new, but our commitment to quality and innovation sets us apart.
                </p>
                <p>
                  Every line of code we write, every design we craft, and every strategy we implement is driven by 
                  our desire to help businesses succeed in the digital world.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 neon-border border"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl neon-text">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To empower businesses of all sizes with innovative, affordable, and high-quality digital solutions 
                that drive growth and create lasting impact.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-accent" />
                <h3 className="font-display text-xl text-accent">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become a leading digital agency recognized for our creativity, technical excellence, 
                and commitment to client success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="glass rounded-2xl p-6 text-center group"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-display text-3xl md:text-4xl gradient-text font-bold mb-1">{stat.value}</p>
                <p className="font-accent text-xs text-muted-foreground tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">What Drives Us</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">Our Core Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  style={{ boxShadow: `0 4px 20px ${val.shadow}40` }}
                >
                  <val.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-accent font-semibold text-foreground mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
