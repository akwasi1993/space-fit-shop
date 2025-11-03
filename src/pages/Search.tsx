import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import productTreadmill from "@/assets/product-treadmill.jpg";
import productDumbbells from "@/assets/product-dumbbells.jpg";
import productMassageGun from "@/assets/product-massage-gun.jpg";

const products = [
  {
    id: "1",
    name: "Compact Folding Treadmill",
    price: 599,
    image: productTreadmill,
    category: "Cardio",
    portable: true,
    quiet: true,
  },
  {
    id: "2",
    name: "Adjustable Dumbbell Set",
    price: 299,
    image: productDumbbells,
    category: "Strength",
    portable: true,
  },
  {
    id: "3",
    name: "Pro Massage Gun",
    price: 149,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Products</h1>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search compact equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {searchQuery ? (
          <div>
            <p className="text-muted-foreground mb-6">
              Showing results for "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start searching</h3>
            <p className="text-muted-foreground">
              Find the perfect compact equipment for your space
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
