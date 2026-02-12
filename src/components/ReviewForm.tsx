import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";
import { addReview } from "@/lib/supabase-store";
import { toast } from "sonner";

interface ReviewFormProps {
  projectId: string;
  projectTitle: string;
  onReviewAdded?: () => void;
}

const ReviewForm = ({ projectId, projectTitle, onReviewAdded }: ReviewFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || rating === 0) {
      toast.error("Please fill name, email, and select a rating");
      return;
    }
    setSending(true);
    try {
      await addReview({
        project_id: projectId,
        reviewer_name: form.name,
        reviewer_email: form.email,
        rating,
        comment: form.comment,
      });
      setSent(true);
      setForm({ name: "", email: "", comment: "" });
      setRating(0);
      toast.success("Review submitted! It will appear after approval.");
      onReviewAdded?.();
      setTimeout(() => setSent(false), 3000);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 border border-glass-border/30 space-y-4"
    >
      <h4 className="font-display text-lg text-foreground">
        Review: <span className="neon-text">{projectTitle}</span>
      </h4>

      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hoverRating || rating)
                  ? "fill-[hsl(50,100%,50%)] text-[hsl(50,100%,50%)]"
                  : "text-muted-foreground/30"
              }`}
            />
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          {rating > 0 ? `${rating}/5` : "Select rating"}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
          className="px-4 py-3 rounded-lg bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-all text-sm"
        />
        <input
          type="email"
          placeholder="Your Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={255}
          className="px-4 py-3 rounded-lg bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-all text-sm"
        />
      </div>
      <textarea
        placeholder="Your review (optional)"
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        maxLength={500}
        rows={3}
        className="w-full px-4 py-3 rounded-lg bg-background/80 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-all resize-none text-sm"
      />
      <button
        type="submit"
        disabled={sending}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(183_100%_50%/0.3)] disabled:opacity-50 transition-all"
      >
        {sent ? <><CheckCircle className="w-4 h-4" /> Submitted!</> : sending ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Review</>}
      </button>
    </motion.form>
  );
};

export default ReviewForm;
