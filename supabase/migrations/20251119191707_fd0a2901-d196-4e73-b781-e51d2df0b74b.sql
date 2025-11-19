-- Set default status to 'approved' for automatic publishing
ALTER TABLE public.programs 
ALTER COLUMN status SET DEFAULT 'approved';

-- Update any existing pending programs to approved (optional, uncomment if needed)
-- UPDATE public.programs SET status = 'approved' WHERE status = 'pending';