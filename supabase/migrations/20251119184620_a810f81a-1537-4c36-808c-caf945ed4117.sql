-- Create gallery_interactions table to track likes/dislikes
CREATE TABLE public.gallery_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_id TEXT NOT NULL,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, image_id)
);

-- Create gallery_comments table
CREATE TABLE public.gallery_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_id TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery_interactions
CREATE POLICY "Anyone can view gallery interactions"
ON public.gallery_interactions
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create their own interactions"
ON public.gallery_interactions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
ON public.gallery_interactions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
ON public.gallery_interactions
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for gallery_comments
CREATE POLICY "Anyone can view gallery comments"
ON public.gallery_comments
FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can create comments"
ON public.gallery_comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.gallery_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.gallery_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_gallery_interactions_image_id ON public.gallery_interactions(image_id);
CREATE INDEX idx_gallery_interactions_user_id ON public.gallery_interactions(user_id);
CREATE INDEX idx_gallery_comments_image_id ON public.gallery_comments(image_id);
CREATE INDEX idx_gallery_comments_created_at ON public.gallery_comments(created_at DESC);

-- Add trigger for updated_at on gallery_interactions
CREATE TRIGGER update_gallery_interactions_updated_at
BEFORE UPDATE ON public.gallery_interactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on gallery_comments
CREATE TRIGGER update_gallery_comments_updated_at
BEFORE UPDATE ON public.gallery_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();