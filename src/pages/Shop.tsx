import { useState } from "react";
import { Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  {
    id: "4",
    name: "Compact Folding Treadmill Pro",
    price: 799,
    image: productTreadmill,
    category: "Cardio",
    portable: true,
    quiet: true,
  },
  {
    id: "5",
    name: "Premium Dumbbell Set",
    price: 399,
    image: productDumbbells,
    category: "Strength",
    portable: true,
  },
  {
    id: "6",
    name: "Elite Massage Gun",
    price: 199,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
  },
];

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop Equipment</h1>
            <p className="text-muted-foreground">Compact gear for small spaces</p>
          </div>
          <div className="flex gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="recovery">Recovery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
