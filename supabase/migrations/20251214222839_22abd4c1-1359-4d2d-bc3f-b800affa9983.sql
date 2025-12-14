-- Create function to increase product stock (for order cancellation)
CREATE OR REPLACE FUNCTION public.increase_product_stock(product_id uuid, quantity integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.products
  SET stock = stock + quantity
  WHERE id = product_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product not found';
  END IF;
END;
$function$;