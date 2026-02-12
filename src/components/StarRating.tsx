import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating
            ? "fill-[hsl(50,100%,50%)] text-[hsl(50,100%,50%)]"
            : "text-muted-foreground/30"
        }`}
      />
    ))}
  </div>
);

export default StarRating;
