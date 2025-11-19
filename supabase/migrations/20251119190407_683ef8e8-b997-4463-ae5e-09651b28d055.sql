-- Update RLS policy to allow authenticated users to create programs
-- This replaces the restrictive creator/admin-only policy
DROP POLICY IF EXISTS "Creators and admins can insert programs" ON public.programs;

CREATE POLICY "Authenticated users can insert programs"
ON public.programs FOR INSERT
WITH CHECK (
  auth.uid() = created_by_user_id AND
  auth.uid() IS NOT NULL
);

-- Ensure the default status is set for new programs
ALTER TABLE public.programs 
ALTER COLUMN status SET DEFAULT 'pending';