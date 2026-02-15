import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import FAQs from "./FAQs";

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen">
      <PageHero
        icon={BookOpen}
        subtitle="Our Blog"
        title="Insights & Stories"
        description="Tech tips, project updates, and behind-the-scenes stories from our journey."
        gradient="radial-gradient(ellipse at 40% 30%, hsl(200 100% 15% / 0.5), transparent 60%), radial-gradient(ellipse at 80% 70%, hsl(320 80% 15% / 0.4), transparent 50%)"
        orbColors={["hsl(200, 100%, 50%)", "hsl(320, 80%, 55%)", "hsl(50, 100%, 50%)"]}
      />

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary/40" />
              </div>
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/5" />
            </div>
            <p className="text-foreground font-accent text-lg mb-2">Coming Soon</p>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              We're working on exciting blog posts. Stay tuned for tech insights and project stories!
            </p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl overflow-hidden group border border-transparent hover:border-primary/30 transition-all duration-500"
              >
                {post.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:neon-text transition-all">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt || post.content.slice(0, 150)}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-accent hover:gap-2 transition-all cursor-pointer">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
      <FAQs/>
    </main>
  );
};

export default Blogs;
