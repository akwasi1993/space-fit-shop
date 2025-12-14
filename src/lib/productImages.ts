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

const imageMap: Record<string, string> = {
  "product-treadmill": productTreadmill,
  "product-dumbbells": productDumbbells,
  "product-massage-gun": productMassageGun,
  "product-yoga-mat": productYogaMat,
  "product-resistance-bands": productResistanceBands,
  "product-foam-roller": productFoamRoller,
  "product-kettlebell": productKettlebell,
  "product-pullup-bar": productPullupBar,
  "product-exercise-bike": productExerciseBike,
  "product-fitness-tracker": productFitnessTracker,
  "product-jump-rope": productJumpRope,
  "product-yoga-blocks": productYogaBlocks,
  "product-ankle-weights": productAnkleWeights,
  "product-ab-roller": productAbRoller,
  "product-balance-board": productBalanceBoard,
  "product-pushup-bars": productPushupBars,
  "product-resistance-loops": productResistanceLoops,
  "product-workout-gloves": productWorkoutGloves,
  "product-water-bottle": productWaterBottle,
  "product-grip-strengthener": productGripStrengthener,
  "product-suspension-trainer": productSuspensionTrainer,
  "product-medicine-ball": productMedicineBall,
  "product-gym-bag": productGymBag,
  "product-olympic-barbell": productOlympicBarbell,
  "product-ez-curl-bar": productEzCurlBar,
  "product-short-barbell": productShortBarbell,
  "product-weight-plates": productWeightPlates,
  "product-dumbbells-10lb": productDumbbells10lb,
  "product-dumbbells-20lb": productDumbbells20lb,
  "product-dumbbells-30lb": productDumbbells30lb,
  "product-dumbbells-50lb": productDumbbells50lb,
};

export function getProductImage(imageKey: string): string {
  return imageMap[imageKey] || productDumbbells;
}
