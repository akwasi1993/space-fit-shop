-- Fix the security definer view issue by recreating the view explicitly as SECURITY INVOKER
DROP VIEW IF EXISTS gallery_image_stats;

CREATE VIEW gallery_image_stats 
WITH (security_invoker=true) AS
SELECT 
  image_id,
  COUNT(*) FILTER (WHERE is_like = true) as like_count,
  COUNT(*) FILTER (WHERE is_like = false) as dislike_count
FROM gallery_interactions
GROUP BY image_id;

-- Grant public read access to aggregated stats only
GRANT SELECT ON gallery_image_stats TO anon, authenticated;