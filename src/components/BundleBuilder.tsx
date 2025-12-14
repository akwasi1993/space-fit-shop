import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import productYogaMat from "@/assets/product-yoga-mat.jpg";
import productResistanceBands from "@/assets/product-resistance-bands.jpg";
import productFoamRoller from "@/assets/product-foam-roller.jpg";
import productJumpRope from "@/assets/product-jump-rope.jpg";
import productDumbbells from "@/assets/product-dumbbells.jpg";
import productKettlebell from "@/assets/product-kettlebell.jpg";
import productPullupBar from "@/assets/product-pullup-bar.jpg";

const BundleBuilder = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: "",
    space: "",
    budget: ""
  });
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();

  const questions = [
    {
      id: "goal",
      question: "What's your primary fitness goal?",
      options: [
        { value: "strength", label: "Build Strength & Muscle" },
        { value: "cardio", label: "Improve Cardio & Endurance" },
        { value: "flexibility", label: "Flexibility & Recovery" },
        { value: "weight-loss", label: "Weight Loss & Toning" }
      ]
    },
    {
      id: "space",
      question: "How much space do you have?",
      options: [
        { value: "minimal", label: "Minimal (Dorm/Small Apartment)" },
        { value: "moderate", label: "Moderate (Bedroom Corner)" },
        { value: "dedicated", label: "Dedicated Space" }
      ]
    },
    {
      id: "budget",
      question: "What's your budget?",
      options: [
        { value: "100", label: "Under $100 (Starter)" },
        { value: "200", label: "$100-$200 (Basic)" },
        { value: "400", label: "$200-$400 (Complete)" },
        { value: "600", label: "$400+ (Premium)" }
      ]
    }
  ];

  const getRecommendedProducts = () => {
    const budget = parseInt(answers.budget);
    const products: Array<{ id: string; name: string; price: number; image: string }> = [];

    // Starter tier (under $100)
    if (budget <= 100) {
      if (answers.goal === "strength") {
        products.push(
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope }
        );
      } else if (answers.goal === "cardio") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands }
        );
      } else if (answers.goal === "flexibility") {
        products.push(
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat }
        );
      } else if (answers.goal === "weight-loss") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands }
        );
      }
    }
    // Basic tier ($100-$200)
    else if (budget <= 200) {
      if (answers.goal === "strength") {
        products.push(
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "8", name: "Doorway Pull-Up Bar", price: 59, image: productPullupBar },
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat }
        );
      } else if (answers.goal === "cardio") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat }
        );
      } else if (answers.goal === "flexibility") {
        products.push(
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat },
          { id: "6", name: "Textured Foam Roller", price: 39, image: productFoamRoller },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands }
        );
      } else if (answers.goal === "weight-loss") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat }
        );
      }
    }
    // Complete tier ($200-$400)
    else if (budget <= 400) {
      if (answers.goal === "strength") {
        products.push(
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "8", name: "Doorway Pull-Up Bar", price: 59, image: productPullupBar }
        );
      } else if (answers.goal === "cardio") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell }
        );
      } else if (answers.goal === "flexibility") {
        products.push(
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat },
          { id: "6", name: "Textured Foam Roller", price: 39, image: productFoamRoller },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell }
        );
      } else if (answers.goal === "weight-loss") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell }
        );
      }
    }
    // Premium tier ($400+)
    else {
      if (answers.goal === "strength") {
        products.push(
          { id: "2", name: "Adjustable Dumbbell Set", price: 299, image: productDumbbells },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell },
          { id: "8", name: "Doorway Pull-Up Bar", price: 59, image: productPullupBar }
        );
      } else if (answers.goal === "cardio") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell },
          { id: "2", name: "Adjustable Dumbbell Set", price: 299, image: productDumbbells }
        );
      } else if (answers.goal === "flexibility") {
        products.push(
          { id: "4", name: "Premium Yoga Mat", price: 79, image: productYogaMat },
          { id: "6", name: "Textured Foam Roller", price: 39, image: productFoamRoller },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell },
          { id: "2", name: "Adjustable Dumbbell Set", price: 299, image: productDumbbells }
        );
      } else if (answers.goal === "weight-loss") {
        products.push(
          { id: "11", name: "Speed Jump Rope", price: 29, image: productJumpRope },
          { id: "5", name: "Resistance Band Set", price: 49, image: productResistanceBands },
          { id: "7", name: "Adjustable Kettlebell", price: 179, image: productKettlebell },
          { id: "2", name: "Adjustable Dumbbell Set", price: 299, image: productDumbbells }
        );
      }
    }

    return products;
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    if (!answers[currentQuestion.id as keyof typeof answers]) {
      toast.error("Please select an option to continue");
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Show results
      setStep(questions.length);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAddToCart = () => {
    const products = getRecommendedProducts();
    products.forEach(product => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "Bundle"
      });
    });
    toast.success("Custom bundle added to cart!");
    setOpen(false);
    resetBuilder();
  };

  const resetBuilder = () => {
    setStep(0);
    setAnswers({ goal: "", space: "", budget: "" });
  };

  const currentQuestion = questions[step];
  const recommendedProducts = getRecommendedProducts();
  const totalPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary">
          Start Bundle Builder
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Build Your Perfect Bundle</DialogTitle>
          <DialogDescription>
            Answer 3 quick questions to get personalized equipment recommendations
          </DialogDescription>
        </DialogHeader>

        {step < questions.length ? (
          <div className="space-y-6 py-4">
            {/* Progress indicator */}
            <div className="flex gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full transition-smooth ${
                    idx <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentQuestion.question}
              </h3>
              <RadioGroup
                value={answers[currentQuestion.id as keyof typeof answers]}
                onValueChange={(value) =>
                  setAnswers({ ...answers, [currentQuestion.id]: value })
                }
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4">
              {step > 0 && (
                <Button onClick={handleBack} variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="gap-2 ml-auto">
                {step === questions.length - 1 ? "See Results" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <Card className="bg-secondary/30 border-primary/20">
              <CardHeader>
                <CardTitle>Your Custom Bundle</CardTitle>
                <CardDescription>
                  Based on your preferences, we recommend:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 bg-background rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-lg font-bold">Total Bundle Price:</p>
                  <p className="text-2xl font-bold text-primary">${totalPrice}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={resetBuilder} variant="outline" className="flex-1">
                Start Over
              </Button>
              <Button onClick={handleAddToCart} className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BundleBuilder;
