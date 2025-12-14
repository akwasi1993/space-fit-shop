import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import productOlympicBarbell from "@/assets/product-olympic-barbell.jpg";
import productEzCurlBar from "@/assets/product-ez-curl-bar.jpg";
import productShortBarbell from "@/assets/product-short-barbell.jpg";
import productWeightPlates from "@/assets/product-weight-plates.jpg";

const products = [
  {
    id: "1",
    name: "Compact Folding Treadmill",
    price: 399,
    image: productTreadmill,
    category: "Cardio",
    portable: true,
    quiet: true,
    quickSetup: false,
  },
  {
    id: "2",
    name: "Adjustable Dumbbell Set",
    price: 299,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "3",
    name: "Pro Massage Gun",
    price: 99,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
    quickSetup: true,
  },
  {
    id: "4",
    name: "Premium Yoga Mat",
    price: 79,
    image: productYogaMat,
    category: "Recovery",
    portable: true,
    quickSetup: true,
  },
  {
    id: "5",
    name: "Resistance Band Set",
    price: 49,
    image: productResistanceBands,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "6",
    name: "Textured Foam Roller",
    price: 39,
    image: productFoamRoller,
    category: "Recovery",
    portable: true,
    quickSetup: true,
  },
  {
    id: "7",
    name: "Adjustable Kettlebell",
    price: 129,
    image: productKettlebell,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "8",
    name: "Doorway Pull-Up Bar",
    price: 59,
    image: productPullupBar,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "9",
    name: "Compact Exercise Bike",
    price: 249,
    image: productExerciseBike,
    category: "Cardio",
    portable: true,
    quiet: true,
    quickSetup: false,
  },
  {
    id: "10",
    name: "Fitness Tracker Watch",
    price: 79,
    image: productFitnessTracker,
    category: "Accessories",
    portable: true,
    quickSetup: true,
  },
  {
    id: "11",
    name: "Speed Jump Rope",
    price: 29,
    image: productJumpRope,
    category: "Cardio",
    portable: true,
    quickSetup: true,
  },
  {
    id: "12",
    name: "Elite Massage Gun Pro",
    price: 199,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
    quickSetup: true,
  },
  {
    id: "13",
    name: "Yoga Block Set",
    price: 24,
    image: productYogaBlocks,
    category: "Recovery",
    portable: true,
    quickSetup: true,
  },
  {
    id: "14",
    name: "Adjustable Ankle Weights",
    price: 34,
    image: productAnkleWeights,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "15",
    name: "Ab Wheel Roller",
    price: 19,
    image: productAbRoller,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "16",
    name: "Wooden Balance Board",
    price: 89,
    image: productBalanceBoard,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "17",
    name: "Push-Up Bars",
    price: 29,
    image: productPushupBars,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "18",
    name: "Mini Resistance Loops",
    price: 18,
    image: productResistanceLoops,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "19",
    name: "Training Gloves",
    price: 24,
    image: productWorkoutGloves,
    category: "Accessories",
    portable: true,
    quickSetup: true,
  },
  {
    id: "20",
    name: "Sports Water Bottle",
    price: 16,
    image: productWaterBottle,
    category: "Accessories",
    portable: true,
    quickSetup: true,
  },
  {
    id: "21",
    name: "Hand Grip Strengthener",
    price: 12,
    image: productGripStrengthener,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "22",
    name: "Suspension Trainer",
    price: 79,
    image: productSuspensionTrainer,
    category: "Strength",
    portable: true,
    quickSetup: false,
  },
  {
    id: "23",
    name: "Medicine Ball",
    price: 45,
    image: productMedicineBall,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "24",
    name: "Gym Duffel Bag",
    price: 49,
    image: productGymBag,
    category: "Accessories",
    portable: true,
    quickSetup: true,
  },
  {
    id: "25",
    name: "10lb Dumbbell Pair",
    price: 39,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "26",
    name: "20lb Dumbbell Pair",
    price: 69,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "27",
    name: "30lb Dumbbell Pair",
    price: 99,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "28",
    name: "50lb Dumbbell Pair",
    price: 149,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "29",
    name: "Olympic Barbell 45lb",
    price: 179,
    image: productOlympicBarbell,
    category: "Strength",
    portable: false,
    quickSetup: true,
  },
  {
    id: "30",
    name: "EZ Curl Barbell",
    price: 89,
    image: productEzCurlBar,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "31",
    name: "Short Barbell 25lb",
    price: 59,
    image: productShortBarbell,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "32",
    name: "10lb Weight Plate Pair",
    price: 45,
    image: productWeightPlates,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "33",
    name: "25lb Weight Plate Pair",
    price: 89,
    image: productWeightPlates,
    category: "Strength",
    portable: true,
    quickSetup: true,
  },
  {
    id: "34",
    name: "45lb Weight Plate Pair",
    price: 149,
    image: productWeightPlates,
    category: "Strength",
    portable: false,
    quickSetup: true,
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterType, setFilterType] = useState<string | null>(null);

  // Initialize filters from URL params
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlFilter = searchParams.get("filter");
    
    if (urlCategory) {
      setCategory(urlCategory);
    }
    if (urlFilter) {
      setFilterType(urlFilter);
    }
  }, [searchParams]);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products based on selected category and filter type
  let filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  // Apply special filters (portable, quickSetup)
  if (filterType === "portable") {
    filteredProducts = filteredProducts.filter(p => p.portable);
  } else if (filterType === "quick-setup") {
    filteredProducts = filteredProducts.filter(p => p.quickSetup);
  }

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
              {!filterType && "Shop Equipment"}
            </h1>
            <p className="text-muted-foreground">
              {filterType === "portable" && "Easy to move, carry, and store fitness gear"}
              {filterType === "quick-setup" && "Fast assembly, start training right away"}
              {!filterType && "Compact gear for small spaces"}
            </p>
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
