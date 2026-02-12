import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    live_link: string | null;
    screenshots: string[] | null;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const screenshots = project.screenshots ?? [];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
      whileHover={{ y: -8 }}
      className="glass rounded-2xl overflow-hidden group relative border border-transparent hover:border-primary/30 transition-all duration-500"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ boxShadow: "inset 0 0 40px hsl(183 100% 50% / 0.06), 0 0 30px hsl(183 100% 50% / 0.1)" }}
      />

      {screenshots.length > 0 ? (
        <div className="relative h-40 md:h-48 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={screenshots[current]}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full glass flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-foreground/30"}`}
                  />
                ))}
              </div>
            </>
          )}

          {screenshots.length > 1 && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full glass text-[10px] text-foreground">
              <ImageIcon className="w-3 h-3" /> {current + 1}/{screenshots.length}
            </div>
          )}
        </div>
      ) : (
        <div className="h-40 md:h-48 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-muted-foreground/20" />
        </div>
      )}

      <div className="p-5 relative z-10">
        <h3 className="font-display text-lg mb-2 text-foreground group-hover:neon-text transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
        {project.live_link && (
          <a
            href={project.live_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent tracking-wider bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" /> Visit Live
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
