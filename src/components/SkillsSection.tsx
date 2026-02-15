import { motion } from "framer-motion";
import { Code2, Palette, Smartphone, Server, Brain, Blocks, Terminal, Globe, Layout, Layers } from "lucide-react";

const skills = [
  { name: "HTML", icon: Globe, color: "from-[hsl(15,100%,55%)] to-[hsl(30,100%,55%)]", shadow: "hsl(15,100%,55%)", level: 95 },
  { name: "CSS", icon: Palette, color: "from-[hsl(220,90%,55%)] to-[hsl(240,80%,60%)]", shadow: "hsl(220,90%,55%)", level: 92 },
  { name: "Bootstrap", icon: Layout, color: "from-[hsl(265,70%,55%)] to-[hsl(280,80%,60%)]", shadow: "hsl(265,70%,55%)", level: 90 },
  { name: "Tailwind CSS", icon: Layers, color: "from-[hsl(183,100%,40%)] to-[hsl(170,100%,50%)]", shadow: "hsl(183,100%,50%)", level: 90 },
  { name: "JavaScript", icon: Terminal, color: "from-[hsl(50,100%,50%)] to-[hsl(40,100%,55%)]", shadow: "hsl(50,100%,50%)", level: 85 },
  { name: "React", icon: Code2, color: "from-[hsl(195,100%,50%)] to-[hsl(210,100%,60%)]", shadow: "hsl(195,100%,50%)", level: 85 },
  { name: "Python", icon: Brain, color: "from-[hsl(210,80%,55%)] to-[hsl(170,70%,50%)]", shadow: "hsl(210,80%,55%)", level: 70 },
  { name: "Node.js", icon: Server, color: "from-[hsl(120,60%,40%)] to-[hsl(150,70%,50%)]", shadow: "hsl(120,60%,45%)", level: 65 },
  { name: "Flutter", icon: Smartphone, color: "from-[hsl(200,100%,50%)] to-[hsl(220,100%,65%)]", shadow: "hsl(200,100%,55%)", level: 60 },
  { name: "C", icon: Blocks, color: "from-[hsl(260,80%,55%)] to-[hsl(290,80%,60%)]", shadow: "hsl(260,80%,60%)", level: 55 },
];

const SkillsSection = () => {
  return (
    <section className="py-8 md:py-14 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-primary text-base tracking-[0.3em] uppercase mb-3">
            What We Work With
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Technologies we're passionate about and continuously learning to build amazing products.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="glass rounded-2xl p-4 group cursor-default relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${skill.shadow}, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 4px 20px ${skill.shadow}40` }}
                  >
                    <skill.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-accent font-semibold text-foreground text-base tracking-wider">
                      {skill.name}
                    </h3>
                    <span className="text-base text-muted-foreground">{skill.level}%</span>
                  </div>
                </div>

                <div className="h-1.5 bg-secondary/80 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.4, duration: 1.2, ease: "easeOut" }}
                    style={{ boxShadow: `0 0 12px ${skill.shadow}60` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;