import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProjectsFromDB } from "@/lib/supabase-store";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsPreview = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjectsFromDB().then(setProjects).catch(() => {});
  }, []);

  return (
    <section className="py-8 md:py-14 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-4">Our Projects</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Real work, real results. Each project represents our growing expertise.
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center py-10"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary/40" />
              </div>
            </div>
            <p className="text-foreground font-accent text-lg mb-1">Projects Coming Soon</p>
            <p className="text-muted-foreground text-sm">Stay tuned — exciting things are in the pipeline.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            {projects.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-accent text-sm tracking-wider uppercase border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const ContactPreview = () => (
  <section className="py-8 md:py-14 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5 shadow-lg"
          style={{ boxShadow: "0 8px 30px hsl(183 100% 50% / 0.3)" }}
        >
          <Zap className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        <p className="font-accent text-primary text-sm tracking-[0.3em] uppercase mb-3 border border-primary/30 rounded-full inline-block px-4 py-1">Get in Touch</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">Start Your Project</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          Ready to bring your vision to life? Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </motion.div>

      <ContactForm />
    </div>
  </section>
);

export { ProjectsPreview, ContactPreview };
