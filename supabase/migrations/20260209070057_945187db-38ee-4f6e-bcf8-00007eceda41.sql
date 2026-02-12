
-- Create reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  reviewer_name text NOT NULL,
  reviewer_email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL DEFAULT '',
  approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR SELECT
  USING (approved = true);

-- Anyone can insert reviews
CREATE POLICY "Anyone can insert reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (true);

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON public.reviews FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update reviews (approve/reject)
CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));
