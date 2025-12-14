import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getProductImage } from "@/lib/productImages";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string | null;
  portable?: boolean;
  quiet?: boolean;
  quickSetup?: boolean;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
  image_key: string;
  category: string;
  subcategory: string | null;
  portable: boolean | null;
  quiet: boolean | null;
  quick_setup: boolean | null;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return (data as DbProduct[]).map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: getProductImage(p.image_key),
        category: p.category,
        subcategory: p.subcategory,
        portable: p.portable ?? false,
        quiet: p.quiet ?? false,
        quickSetup: p.quick_setup ?? false,
      }));
    },
  });
}
