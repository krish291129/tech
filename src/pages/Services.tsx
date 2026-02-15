import { motion } from "framer-motion";
import {
  Code2, Palette, Megaphone, Share2, Smartphone, Search,
  Globe, Layers, Zap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import FAQs from "./FAQs";

const services = [
  {
    icon: Globe, title: "Website Development",
    desc: "Custom, responsive websites built with React, Next.js, and modern frameworks. From landing pages to full-stack web apps.",
    techs: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    color: "from-[hsl(183,100%,50%)] to-[hsl(200,100%,60%)]", shadow: "hsl(183,100%,50%)",
  },
  {
    icon: Palette, title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces designed with user experience at the core. Wireframes, prototypes, and polished designs.",
    techs: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    color: "from-[hsl(260,80%,55%)] to-[hsl(290,80%,65%)]", shadow: "hsl(260,80%,60%)",
  },
  {
    icon: Smartphone, title: "Mobile App Development",
    desc: "Cross-platform mobile applications with Flutter and React Native. Native feel, single codebase.",
    techs: ["Flutter", "React Native", "Dart", "Firebase"],
    color: "from-[hsl(200,100%,50%)] to-[hsl(220,100%,65%)]", shadow: "hsl(200,100%,55%)",
  },
  {
    icon: Megaphone, title: "Digital Marketing",
    desc: "Data-driven digital marketing strategies to boost your online presence. SEO, PPC, content marketing, and analytics.",
    techs: ["Google Ads", "SEO", "Analytics", "Content Strategy"],
    color: "from-[hsl(50,100%,50%)] to-[hsl(30,100%,55%)]", shadow: "hsl(50,100%,50%)",
  },
  {
    icon: Share2, title: "Social Media Management",
    desc: "Strategic social media campaigns that engage your audience and grow your brand across all platforms.",
    techs: ["Instagram", "LinkedIn", "Facebook", "Content Creation"],
    color: "from-[hsl(340,80%,55%)] to-[hsl(360,80%,60%)]", shadow: "hsl(340,80%,55%)",
  },
  {
    icon: Search, title: "SEO Optimization",
    desc: "Improve your search rankings with technical SEO, on-page optimization, and link building strategies.",
    techs: ["Technical SEO", "On-Page SEO", "Link Building", "Audit"],
    color: "from-[hsl(120,60%,40%)] to-[hsl(150,70%,50%)]", shadow: "hsl(120,60%,45%)",
  },
];

const techStack = [
  { name: "React", icon: Code2 }, { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Palette }, { name: "Node.js", icon: Layers },
  { name: "Python", icon: Code2 }, { name: "Flutter", icon: Smartphone },
  { name: "JavaScript", icon: Code2 }, { name: "C / C++", icon: Code2 },
];

const Services = () => {
  return (
    <main className="min-h-screen">
      <PageHero
        icon={Zap}
        subtitle="What We Do"
        title="Our Services"
        description="From design to deployment, we offer end-to-end digital solutions to help your business thrive online."
        gradient="radial-gradient(ellipse at 30% 40%, hsl(183 100% 15% / 0.5), transparent 50%), radial-gradient(ellipse at 70% 60%, hsl(50 100% 15% / 0.4), transparent 50%)"
        orbColors={["hsl(183, 100%, 50%)", "hsl(50, 100%, 50%)", "hsl(260, 80%, 60%)"]}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 group relative overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(circle at center, ${service.shadow}, transparent 70%)` }} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`} style={{ boxShadow: `0 4px 20px ${service.shadow}40` }}>
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2 group-hover:neon-text transition-all duration-300">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.techs.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-muted-foreground border border-border">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">Our Expertise</p>
          <h2 className="text-2xl md:text-4xl font-display font-bold gradient-text mb-4">Languages & Frameworks</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {techStack.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="glass rounded-xl p-4 text-center group cursor-default">
              <tech.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-accent text-sm text-foreground">{tech.name}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="glass rounded-2xl p-8 md:p-12 neon-border border max-w-2xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl gradient-text mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6">Let's discuss your project and bring your ideas to life.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-accent text-sm tracking-wider uppercase bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] transition-all duration-300 font-semibold">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
      <FAQs/>
    </main>
  );
};

export default Services;
