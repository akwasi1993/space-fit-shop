import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Check, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
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

// Extended products database
const products = [
  {
    id: "1",
    name: "Compact Folding Treadmill",
    price: 599,
    image: productTreadmill,
    category: "Cardio",
    portable: true,
    quiet: true,
    rating: 4.8,
    reviews: 342,
    description: "Space-saving treadmill that folds flat for easy storage. Perfect for apartments with whisper-quiet motor and cushioned running surface.",
    features: ["Folds to 6 inches", "Bluetooth connectivity", "12 preset programs", "300 lb capacity"],
    specs: { dimensions: "55\" x 28\" x 50\"", weight: "110 lbs", maxSpeed: "10 mph" }
  },
  {
    id: "2",
    name: "Adjustable Dumbbell Set",
    price: 299,
    image: productDumbbells,
    category: "Strength",
    portable: true,
    rating: 4.9,
    reviews: 521,
    description: "Replace 15 sets of weights with one compact design. Adjust from 5-52.5 lbs per dumbbell with a simple turn of the dial.",
    features: ["5-52.5 lb range", "Space-saving design", "Durable coating", "Storage tray included"],
    specs: { dimensions: "15.75\" x 8\" x 9\"", weight: "52.5 lbs each", material: "Steel/Rubber" }
  },
  {
    id: "3",
    name: "Pro Massage Gun",
    price: 149,
    image: productMassageGun,
    category: "Recovery",
    portable: true,
    quiet: true,
    rating: 4.7,
    reviews: 289,
    description: "Deep tissue percussion therapy in a portable device. 6 speed settings and 4 massage heads for complete muscle recovery.",
    features: ["6 speed levels", "4 massage heads", "3-hour battery", "Carrying case"],
    specs: { dimensions: "9\" x 7\" x 3\"", weight: "2.5 lbs", battery: "2500mAh" }
  },
  {
    id: "4",
    name: "Premium Yoga Mat",
    price: 79,
    image: productYogaMat,
    category: "Recovery",
    portable: true,
    rating: 4.6,
    reviews: 412,
    description: "Extra-thick cushioned mat with superior grip. Non-slip surface keeps you stable during any pose or exercise.",
    features: ["6mm thickness", "Non-slip texture", "Eco-friendly material", "Carrying strap"],
    specs: { dimensions: "72\" x 24\" x 0.25\"", weight: "3 lbs", material: "TPE" }
  },
  {
    id: "5",
    name: "Resistance Band Set",
    price: 49,
    image: productResistanceBands,
    category: "Strength",
    portable: true,
    rating: 4.8,
    reviews: 634,
    description: "5 resistance levels from 10-50 lbs. Includes handles, door anchor, and ankle straps for full-body workouts anywhere.",
    features: ["5 resistance levels", "Door anchor included", "Handles & ankle straps", "Travel bag"],
    specs: { dimensions: "48\" bands", weight: "2 lbs", material: "Latex" }
  },
  {
    id: "6",
    name: "Textured Foam Roller",
    price: 39,
    image: productFoamRoller,
    category: "Recovery",
    portable: true,
    rating: 4.5,
    reviews: 287,
    description: "High-density foam roller with textured surface for deep tissue massage. Perfect for post-workout recovery.",
    features: ["High-density foam", "Textured surface", "Won't lose shape", "Lightweight"],
    specs: { dimensions: "18\" x 6\"", weight: "1.5 lbs", material: "EVA Foam" }
  },
  {
    id: "7",
    name: "Adjustable Kettlebell",
    price: 179,
    image: productKettlebell,
    category: "Strength",
    portable: true,
    rating: 4.7,
    reviews: 198,
    description: "One kettlebell that adjusts from 10-40 lbs. Space-efficient design with comfortable grip for all exercises.",
    features: ["10-40 lb range", "Quick adjustment", "Ergonomic handle", "Compact storage"],
    specs: { dimensions: "11\" x 8\" x 11\"", weight: "40 lbs max", material: "Cast Iron" }
  },
  {
    id: "8",
    name: "Doorway Pull-Up Bar",
    price: 59,
    image: productPullupBar,
    category: "Strength",
    portable: true,
    rating: 4.6,
    reviews: 445,
    description: "No-drill installation pull-up bar fits standard doorways. Multiple grip positions for varied exercises.",
    features: ["No drilling needed", "Multiple grips", "300 lb capacity", "Padded handles"],
    specs: { dimensions: "38\" width", weight: "5 lbs", capacity: "300 lbs" }
  },
  {
    id: "9",
    name: "Compact Exercise Bike",
    price: 449,
    image: productExerciseBike,
    category: "Cardio",
    portable: true,
    quiet: true,
    rating: 4.8,
    reviews: 312,
    description: "Smooth magnetic resistance bike with digital display. Whisper-quiet operation perfect for apartments.",
    features: ["Magnetic resistance", "Digital display", "Adjustable seat", "Transport wheels"],
    specs: { dimensions: "40\" x 22\" x 46\"", weight: "65 lbs", capacity: "275 lbs" }
  },
  {
    id: "10",
    name: "Fitness Tracker Watch",
    price: 129,
    image: productFitnessTracker,
    category: "Accessories",
    portable: true,
    rating: 4.7,
    reviews: 723,
    description: "Track workouts, heart rate, sleep, and calories. Waterproof design with 7-day battery life.",
    features: ["Heart rate monitor", "Sleep tracking", "Waterproof", "7-day battery"],
    specs: { dimensions: "1.5\" display", weight: "1.2 oz", battery: "7 days" }
  },
  {
    id: "11",
    name: "Speed Jump Rope",
    price: 29,
    image: productJumpRope,
    category: "Cardio",
    portable: true,
    rating: 4.6,
    reviews: 489,
    description: "Adjustable length jump rope with ball bearings for smooth rotation. Perfect for cardio anywhere.",
    features: ["Ball bearing system", "Adjustable length", "Memory foam handles", "Carrying pouch"],
    specs: { dimensions: "10 ft adjustable", weight: "0.5 lbs", material: "PVC/Steel" }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 md:pb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart!`);
    setTimeout(() => navigate("/cart"), 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate("/shop")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={`aspect-square bg-secondary rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.portable && <Badge variant="secondary">Portable</Badge>}
              {product.quiet && <Badge variant="secondary">Quiet</Badge>}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-6 font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card className="p-4 text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">Free Shipping</p>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">1-Year Warranty</p>
              </Card>
              <Card className="p-4 text-center">
                <Check className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">30-Day Returns</p>
              </Card>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
