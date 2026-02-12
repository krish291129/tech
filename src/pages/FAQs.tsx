import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";

const FAQs = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("faqs").select("*").eq("published", true).order("sort_order", { ascending: true });
      setFaqs(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen">
      <PageHero
        icon={HelpCircle}
        subtitle="FAQ"
        title="Frequently Asked Questions"
        description="Got questions? We've got answers. Find everything you need to know about working with us."
        gradient="radial-gradient(ellipse at 60% 20%, hsl(50 100% 15% / 0.5), transparent 50%), radial-gradient(ellipse at 20% 80%, hsl(120 60% 15% / 0.4), transparent 50%)"
        orbColors={["hsl(50, 100%, 50%)", "hsl(120, 60%, 45%)", "hsl(183, 100%, 50%)"]}
      />

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : faqs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary/40" />
              </div>
            </div>
            <p className="text-foreground font-accent text-lg mb-2">Coming Soon</p>
            <p className="text-muted-foreground text-sm text-center max-w-sm">
              FAQs will be added shortly. In the meantime, feel free to contact us!
            </p>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden border border-transparent hover:border-primary/20 transition-all"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-accent text-foreground font-medium pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FAQs;
