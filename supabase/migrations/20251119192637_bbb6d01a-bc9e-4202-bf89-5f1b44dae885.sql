-- Fix 1: Restrict gallery_interactions to prevent user tracking
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view gallery interactions" ON gallery_interactions;

-- Create restrictive policy: users can only view their own interactions
CREATE POLICY "Users can view their own interactions"
ON gallery_interactions FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create aggregate view for public statistics without user_id exposure
CREATE VIEW gallery_image_stats AS
SELECT 
  image_id,
  COUNT(*) FILTER (WHERE is_like = true) as like_count,
  COUNT(*) FILTER (WHERE is_like = false) as dislike_count
FROM gallery_interactions
GROUP BY image_id;

-- Grant public read access to aggregated stats only
GRANT SELECT ON gallery_image_stats TO anon, authenticated;

-- Fix 2: Make programs.created_by_user_id NOT NULL to ensure ownership tracking
-- First ensure all existing records have an owner (if any don't)
UPDATE programs 
SET created_by_user_id = (SELECT id FROM auth.users LIMIT 1)
WHERE created_by_user_id IS NULL;

-- Add NOT NULL constraint
ALTER TABLE programs 
ALTER COLUMN created_by_user_id SET NOT NULL;

-- Fix 3: Fix storage policy to allow public viewing of gallery images
-- Make user-uploads bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'user-uploads';

-- Add policy to allow anyone to view files in user-uploads
CREATE POLICY "Anyone can view files in user-uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'user-uploads');