import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/use-products";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [subcategory, setSubcategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const { data: products = [], isLoading } = useProducts();

  // Initialize filters from URL params
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlSubcategory = searchParams.get("subcategory");
    const urlFilter = searchParams.get("filter");
    
    if (urlCategory) {
      setCategory(urlCategory);
    }
    if (urlSubcategory) {
      setSubcategory(urlSubcategory);
    }
    if (urlFilter) {
      setFilterType(urlFilter);
    }
  }, [searchParams]);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Get unique subcategories from products
  const subcategories = Array.from(new Set(products.filter(p => p.subcategory).map(p => p.subcategory)));

  // Filter products based on selected category and filter type
  let filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  // Apply subcategory filter
  if (subcategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.subcategory?.toLowerCase() === subcategory.toLowerCase());
  }

  // Apply special filters (portable, quickSetup)
  if (filterType === "portable") {
    filteredProducts = filteredProducts.filter(p => p.portable);
  } else if (filterType === "quick-setup") {
    filteredProducts = filteredProducts.filter(p => p.quickSetup);
  }

  // Category priority order: Cardio -> Strength -> Recovery -> Accessories
  const categoryOrder: Record<string, number> = {
    "Cardio": 1,
    "Strength": 2,
    "Recovery": 3,
    "Accessories": 4,
  };

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    // Default "featured" - order by category priority, then by name
    const orderA = categoryOrder[a.category] ?? 99;
    const orderB = categoryOrder[b.category] ?? 99;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });

  // Reset filters function
  const handleResetFilters = () => {
    setCategory("all");
    setSubcategory("all");
    setSortBy("featured");
    setFilterType(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {filterType === "portable" && "Portable Equipment"}
              {filterType === "quick-setup" && "Quick Setup Equipment"}
              {subcategory !== "all" && `${subcategory}`}
              {!filterType && subcategory === "all" && "Shop Equipment"}
            </h1>
            <p className="text-muted-foreground">
              {filterType === "portable" && "Easy to move, carry, and store fitness gear"}
              {filterType === "quick-setup" && "Fast assembly, start training right away"}
              {subcategory !== "all" && "Dumbbells, barbells, and weight plates"}
              {!filterType && subcategory === "all" && "Compact gear for small spaces"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="all">All Items</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleResetFilters}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
