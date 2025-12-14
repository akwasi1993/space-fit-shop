-- Allow users to update their own orders (for cancellation)
CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());