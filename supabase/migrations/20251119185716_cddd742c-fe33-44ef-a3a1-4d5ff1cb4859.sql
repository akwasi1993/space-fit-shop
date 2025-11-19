-- Create status enum for moderation
CREATE TYPE public.moderation_status AS ENUM ('pending', 'approved', 'rejected');

-- Create gallery_images table for user uploads
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  image_url text NOT NULL,
  title text NOT NULL,
  description text,
  location_type text,
  status public.moderation_status NOT NULL DEFAULT 'pending',
  rejection_reason text,
  reported_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add moderation fields to programs table
ALTER TABLE public.programs 
ADD COLUMN IF NOT EXISTS status public.moderation_status NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS rejection_reason text,
ADD COLUMN IF NOT EXISTS reported_count integer NOT NULL DEFAULT 0;

-- Create content_reports table
CREATE TABLE public.content_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id uuid NOT NULL,
  content_type text NOT NULL, -- 'gallery' or 'program'
  content_id uuid NOT NULL,
  reason text NOT NULL,
  details text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_images
CREATE POLICY "Users can view approved gallery images"
ON public.gallery_images FOR SELECT
USING (status = 'approved' OR user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can insert gallery images"
ON public.gallery_images FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gallery images"
ON public.gallery_images FOR UPDATE
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update RLS policy for programs to respect moderation status
DROP POLICY IF EXISTS "Programs are viewable by everyone" ON public.programs;
CREATE POLICY "Users can view approved programs or their own"
ON public.programs FOR SELECT
USING (status = 'approved' OR created_by_user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for content_reports
CREATE POLICY "Users can view their own reports"
ON public.content_reports FOR SELECT
USING (reporter_user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can create reports"
ON public.content_reports FOR INSERT
WITH CHECK (auth.uid() = reporter_user_id);

CREATE POLICY "Admins can manage reports"
ON public.content_reports FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for gallery_images updated_at
CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_gallery_images_status ON public.gallery_images(status);
CREATE INDEX idx_gallery_images_user_id ON public.gallery_images(user_id);
CREATE INDEX idx_programs_status ON public.programs(status);
CREATE INDEX idx_content_reports_content ON public.content_reports(content_type, content_id);
CREATE INDEX idx_content_reports_reporter ON public.content_reports(reporter_user_id);