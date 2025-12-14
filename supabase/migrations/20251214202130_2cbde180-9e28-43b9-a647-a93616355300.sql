-- Create a function to decrease product stock
CREATE OR REPLACE FUNCTION public.decrease_product_stock(product_id UUID, quantity INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.products
  SET stock = stock - quantity
  WHERE id = product_id AND stock >= quantity;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock or product not found';
  END IF;
END;
$$;