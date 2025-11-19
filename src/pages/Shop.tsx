import { useState } from "react";
import { Filter } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import productTreadmill from "@/assets/product-treadmill.jpg";
import productDumbbells from "@/assets/product-dumbbells.jpg";
import productMassageGun from "@/assets/product-massage-gun.jpg";
import productYogaMat from "@/assets/product-yoga-mat.jpg";
import productResistanceBands from "@/assets/product-resistance-bands.jpg";
import productFoamRoller from "@/assets/product-foam-roller.jpg";
import productKettlebell from "@/assets/product-kettlebell.jpg";
import productPullupBar from "@/assets/product-pullup-bar.jpg";
import productExerciseBike from "@/assets/product-exercise-bike.jpg";
import productFitnessTracker from "@/assets/product-fitness-tracker.jpg";
import productJumpRope from "@/assets/product-jump-rope.jpg";
import productYogaBlocks from "@/assets/product-yoga-blocks.jpg";
import productAnkleWeights from "@/assets/product-ankle-weights.jpg";
import productAbRoller from "@/assets/product-ab-roller.jpg";
import productBalanceBoard from "@/assets/product-balance-board.jpg";
import productPushupBars from "@/assets/product-pushup-bars.jpg";
import productResistanceLoops from "@/assets/product-resistance-loops.jpg";
import productWorkoutGloves from "@/assets/product-workout-gloves.jpg";
import productWaterBottle from "@/assets/product-water-bottle.jpg";
import productGripStrengthener from "@/assets/product-grip-strengthener.jpg";
import productSuspensionTrainer from "@/assets/product-suspension-trainer.jpg";
import productMedicineBall from "@/assets/product-medicine-ball.jpg";
import productGymBag from "@/assets/product-gym-bag.jpg";

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
    name: "Premium Yoga Mat",
    price: 79,
    image: productYogaMat,
    category: "Recovery",
    portable: true,
  },
  {
    id: "5",
    name: "Resistance Band Set",
    price: 49,
    image: productResistanceBands,
    category: "Strength",
    portable: true,
  },
  {
    id: "6",
    name: "Textured Foam Roller",
    price: 39,
    image: productFoamRoller,
    category: "Recovery",
    portable: true,
  },
  {
    id: "7",
    name: "Adjustable Kettlebell",
    price: 179,
    image: productKettlebell,
    category: "Strength",
    portable: true,
  },
  {
    id: "8",
    name: "Doorway Pull-Up Bar",
    price: 59,
    image: productPullupBar,
    category: "Strength",
    portable: true,
  },
  {
    id: "9",
    name: "Compact Exercise Bike",
    price: 449,
    image: productExerciseBike,
    category: "Cardio",
    portable: true,
    quiet: true,
  },
  {
    id: "10",
    name: "Fitness Tracker Watch",
    price: 129,
    image: productFitnessTracker,
    category: "Accessories",
    portable: true,
  },
  {
    id: "11",
    name: "Speed Jump Rope",
    price: 29,
    image: productJumpRope,
    category: "Cardio",
    portable: true,
  },
  {
    id: "12",
    name: "Elite Massage Gun Pro",
    price: 199,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
  },
  {
    id: "13",
    name: "Yoga Block Set",
    price: 24,
    image: productYogaBlocks,
    category: "Recovery",
    portable: true,
  },
  {
    id: "14",
    name: "Adjustable Ankle Weights",
    price: 34,
    image: productAnkleWeights,
    category: "Strength",
    portable: true,
  },
  {
    id: "15",
    name: "Ab Wheel Roller",
    price: 19,
    image: productAbRoller,
    category: "Strength",
    portable: true,
  },
  {
    id: "16",
    name: "Wooden Balance Board",
    price: 89,
    image: productBalanceBoard,
    category: "Strength",
    portable: true,
  },
  {
    id: "17",
    name: "Push-Up Bars",
    price: 29,
    image: productPushupBars,
    category: "Strength",
    portable: true,
  },
  {
    id: "18",
    name: "Mini Resistance Loops",
    price: 18,
    image: productResistanceLoops,
    category: "Strength",
    portable: true,
  },
  {
    id: "19",
    name: "Training Gloves",
    price: 24,
    image: productWorkoutGloves,
    category: "Accessories",
    portable: true,
  },
  {
    id: "20",
    name: "Sports Water Bottle",
    price: 16,
    image: productWaterBottle,
    category: "Accessories",
    portable: true,
  },
  {
    id: "21",
    name: "Hand Grip Strengthener",
    price: 12,
    image: productGripStrengthener,
    category: "Strength",
    portable: true,
  },
  {
    id: "22",
    name: "Suspension Trainer",
    price: 79,
    image: productSuspensionTrainer,
    category: "Strength",
    portable: true,
  },
  {
    id: "23",
    name: "Medicine Ball",
    price: 45,
    image: productMedicineBall,
    category: "Strength",
    portable: true,
  },
  {
    id: "24",
    name: "Gym Duffel Bag",
    price: 49,
    image: productGymBag,
    category: "Accessories",
    portable: true,
  },
];

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products based on selected category
  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    // Default "featured" - keep original order
    return 0;
  });

  // Reset filters function
  const handleResetFilters = () => {
    setCategory("all");
    setSortBy("featured");
  };

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
      </div>
    </div>
  );
};

export default Shop;
