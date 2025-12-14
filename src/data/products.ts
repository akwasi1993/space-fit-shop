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
import productDumbbells10lb from "@/assets/product-dumbbells-10lb.jpg";
import productDumbbells20lb from "@/assets/product-dumbbells-20lb.jpg";
import productDumbbells30lb from "@/assets/product-dumbbells-30lb.jpg";
import productDumbbells50lb from "@/assets/product-dumbbells-50lb.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  portable?: boolean;
  quiet?: boolean;
  quickSetup?: boolean;
}

export const products: Product[] = [
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
    image: productDumbbells10lb,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "26",
    name: "20lb Dumbbell Pair",
    price: 69,
    image: productDumbbells20lb,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "27",
    name: "30lb Dumbbell Pair",
    price: 99,
    image: productDumbbells30lb,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "28",
    name: "50lb Dumbbell Pair",
    price: 149,
    image: productDumbbells50lb,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "29",
    name: "Olympic Barbell 45lb",
    price: 179,
    image: productOlympicBarbell,
    category: "Strength",
    subcategory: "Free Weights",
    portable: false,
    quickSetup: true,
  },
  {
    id: "30",
    name: "EZ Curl Barbell",
    price: 89,
    image: productEzCurlBar,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "31",
    name: "Short Barbell 25lb",
    price: 59,
    image: productShortBarbell,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "32",
    name: "10lb Weight Plate Pair",
    price: 45,
    image: productWeightPlates,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "33",
    name: "25lb Weight Plate Pair",
    price: 89,
    image: productWeightPlates,
    category: "Strength",
    subcategory: "Free Weights",
    portable: true,
    quickSetup: true,
  },
  {
    id: "34",
    name: "45lb Weight Plate Pair",
    price: 149,
    image: productWeightPlates,
    category: "Strength",
    subcategory: "Free Weights",
    portable: false,
    quickSetup: true,
  },
];
