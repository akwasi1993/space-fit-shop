-- Storage RLS Policies for User-Specific Uploads
-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can upload to their own folder in user-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own files in user-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own files in user-uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own files in user-uploads" ON storage.objects;

DROP POLICY IF EXISTS "Users can upload to their own folder in program-covers" ON storage.objects;
DROP POLICY IF EXISTS "Program covers are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own program covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own program covers" ON storage.objects;

DROP POLICY IF EXISTS "Users can upload to their own folder in program-videos" ON storage.objects;
DROP POLICY IF EXISTS "Program videos are viewable by everyone" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own program videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own program videos" ON storage.objects;

-- RLS Policies for user-uploads bucket
-- Users can only upload files to their own user_id folder
CREATE POLICY "Users can upload to their own folder in user-uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can only view their own files
CREATE POLICY "Users can view their own files in user-uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own files
CREATE POLICY "Users can update their own files in user-uploads"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own files
CREATE POLICY "Users can delete their own files in user-uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-uploads' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- RLS Policies for program-covers bucket (public viewing, user-specific upload)
CREATE POLICY "Users can upload to their own folder in program-covers"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'program-covers' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Anyone can view program covers (public bucket)
CREATE POLICY "Program covers are viewable by everyone"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'program-covers');

-- Users can update their own program covers
CREATE POLICY "Users can update their own program covers"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'program-covers' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own program covers
CREATE POLICY "Users can delete their own program covers"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'program-covers' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- RLS Policies for program-videos bucket (public viewing, user-specific upload)
CREATE POLICY "Users can upload to their own folder in program-videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'program-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Anyone can view program videos (public bucket)
CREATE POLICY "Program videos are viewable by everyone"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'program-videos');

-- Users can update their own program videos
CREATE POLICY "Users can update their own program videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'program-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own program videos
CREATE POLICY "Users can delete their own program videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'program-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);