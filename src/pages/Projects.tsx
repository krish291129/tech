import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProjectsFromDB, getApprovedReviews } from "@/lib/supabase-store";
import ProjectCard from "@/components/ProjectCard";
import ReviewForm from "@/components/ReviewForm";
import StarRating from "@/components/StarRating";
import { FolderOpen, Sparkles, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import FAQs from "./FAQs";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [p, r] = await Promise.all([getProjectsFromDB(), getApprovedReviews()]);
      setProjects(p);
      setReviews(r);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getProjectReviews = (projectId: string) => reviews.filter(r => r.project_id === projectId);
  const getAvgRating = (projectId: string) => {
    const pr = getProjectReviews(projectId);
    if (pr.length === 0) return 0;
    return Math.round(pr.reduce((sum, r) => sum + r.rating, 0) / pr.length);
  };

  return (
    <main className="min-h-screen">
      <PageHero
        icon={FolderOpen}
        subtitle="Portfolio"
        title="Our Projects"
        description="Every project is a step forward in our journey. Here's what we've built so far."
        gradient="radial-gradient(ellipse at 70% 30%, hsl(120 60% 15% / 0.5), transparent 50%), radial-gradient(ellipse at 30% 70%, hsl(260 80% 15% / 0.4), transparent 50%)"
        orbColors={["hsl(120, 60%, 45%)", "hsl(260, 80%, 60%)", "hsl(183, 100%, 50%)"]}
      />

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary/40" />
              </div>
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/5" />
            </div>
            <p className="text-foreground font-accent text-lg mb-2">Coming Soon</p>
            <p className="text-muted-foreground text-sm text-center max-w-sm">We're crafting something amazing. Projects will appear here as we ship them.</p>
          </motion.div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, i) => {
              const projectReviews = getProjectReviews(project.id);
              const avgRating = getAvgRating(project.id);
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <ProjectCard project={project} index={i} />
                  <div className="mt-6 max-w-3xl mx-auto space-y-4">
                    {projectReviews.length > 0 && (
                      <div className="flex items-center gap-3 mb-3">
                        <Star className="w-5 h-5 text-[hsl(50,100%,50%)]" />
                        <span className="font-accent text-foreground text-sm">{avgRating}/5 · {projectReviews.length} review{projectReviews.length > 1 ? "s" : ""}</span>
                      </div>
                    )}
                    {projectReviews.slice(0, 3).map((r) => (
                      <div key={r.id} className="glass rounded-xl p-4 border border-glass-border/20">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-accent text-foreground text-sm font-semibold">{r.reviewer_name}</span>
                          <StarRating rating={r.rating} />
                        </div>
                        {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
                      </div>
                    ))}
                    <button onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)} className="text-sm font-accent text-primary hover:underline">
                      {selectedProject === project.id ? "Close Review Form" : "Write a Review"}
                    </button>
                    {selectedProject === project.id && <ReviewForm projectId={project.id} projectTitle={project.title} onReviewAdded={load} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <FAQs/>
    </main>
  );
};

export default Projects;
