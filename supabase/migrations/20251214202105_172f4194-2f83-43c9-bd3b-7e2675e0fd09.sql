-- Add stock column with default value of 10
ALTER TABLE public.products 
ADD COLUMN stock INTEGER NOT NULL DEFAULT 10;

-- Update all existing products to have stock = 10
UPDATE public.products SET stock = 10;