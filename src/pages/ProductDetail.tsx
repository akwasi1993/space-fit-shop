import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Check, Truck, Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";

// Extended product details (features, specs, ratings) - keyed by product name for matching
const productDetails: Record<string, { 
  rating: number; 
  reviews: number; 
  description: string; 
  features: string[]; 
  specs: Record<string, string>;
}> = {
  "Compact Folding Treadmill": {
    rating: 4.8,
    reviews: 342,
    description: "Space-saving treadmill that folds flat for easy storage. Perfect for apartments with whisper-quiet motor and cushioned running surface.",
    features: ["Folds to 6 inches", "Bluetooth connectivity", "12 preset programs", "300 lb capacity"],
    specs: { dimensions: "55\" x 28\" x 50\"", weight: "110 lbs", maxSpeed: "10 mph" }
  },
  "Adjustable Dumbbell Set": {
    rating: 4.9,
    reviews: 521,
    description: "Replace 15 sets of weights with one compact design. Adjust from 5-52.5 lbs per dumbbell with a simple turn of the dial.",
    features: ["5-52.5 lb range", "Space-saving design", "Durable coating", "Storage tray included"],
    specs: { dimensions: "15.75\" x 8\" x 9\"", weight: "52.5 lbs each", material: "Steel/Rubber" }
  },
  "Pro Massage Gun": {
    rating: 4.7,
    reviews: 289,
    description: "Deep tissue percussion therapy in a portable device. 6 speed settings and 4 massage heads for complete muscle recovery.",
    features: ["6 speed levels", "4 massage heads", "3-hour battery", "Carrying case"],
    specs: { dimensions: "9\" x 7\" x 3\"", weight: "2.5 lbs", battery: "2500mAh" }
  },
  "Premium Yoga Mat": {
    rating: 4.6,
    reviews: 412,
    description: "Extra-thick cushioned mat with superior grip. Non-slip surface keeps you stable during any pose or exercise.",
    features: ["6mm thickness", "Non-slip texture", "Eco-friendly material", "Carrying strap"],
    specs: { dimensions: "72\" x 24\" x 0.25\"", weight: "3 lbs", material: "TPE" }
  },
  "Resistance Band Set": {
    rating: 4.8,
    reviews: 634,
    description: "5 resistance levels from 10-50 lbs. Includes handles, door anchor, and ankle straps for full-body workouts anywhere.",
    features: ["5 resistance levels", "Door anchor included", "Handles & ankle straps", "Travel bag"],
    specs: { dimensions: "48\" bands", weight: "2 lbs", material: "Latex" }
  },
  "Textured Foam Roller": {
    rating: 4.5,
    reviews: 287,
    description: "High-density foam roller with textured surface for deep tissue massage. Perfect for post-workout recovery.",
    features: ["High-density foam", "Textured surface", "Won't lose shape", "Lightweight"],
    specs: { dimensions: "18\" x 6\"", weight: "1.5 lbs", material: "EVA Foam" }
  },
  "Adjustable Kettlebell": {
    rating: 4.7,
    reviews: 198,
    description: "One kettlebell that adjusts from 10-40 lbs. Space-efficient design with comfortable grip for all exercises.",
    features: ["10-40 lb range", "Quick adjustment", "Ergonomic handle", "Compact storage"],
    specs: { dimensions: "11\" x 8\" x 11\"", weight: "40 lbs max", material: "Cast Iron" }
  },
  "Doorway Pull-Up Bar": {
    rating: 4.6,
    reviews: 445,
    description: "No-drill installation pull-up bar fits standard doorways. Multiple grip positions for varied exercises.",
    features: ["No drilling needed", "Multiple grips", "300 lb capacity", "Padded handles"],
    specs: { dimensions: "38\" width", weight: "5 lbs", capacity: "300 lbs" }
  },
  "Compact Exercise Bike": {
    rating: 4.8,
    reviews: 312,
    description: "Smooth magnetic resistance bike with digital display. Whisper-quiet operation perfect for apartments.",
    features: ["Magnetic resistance", "Digital display", "Adjustable seat", "Transport wheels"],
    specs: { dimensions: "40\" x 22\" x 46\"", weight: "65 lbs", capacity: "275 lbs" }
  },
  "Fitness Tracker Watch": {
    rating: 4.7,
    reviews: 723,
    description: "Track workouts, heart rate, sleep, and calories. Waterproof design with 7-day battery life.",
    features: ["Heart rate monitor", "Sleep tracking", "Waterproof", "7-day battery"],
    specs: { dimensions: "1.5\" display", weight: "1.2 oz", battery: "7 days" }
  },
  "Speed Jump Rope": {
    rating: 4.6,
    reviews: 489,
    description: "Adjustable length jump rope with ball bearings for smooth rotation. Perfect for cardio anywhere.",
    features: ["Ball bearing system", "Adjustable length", "Memory foam handles", "Carrying pouch"],
    specs: { dimensions: "10 ft adjustable", weight: "0.5 lbs", material: "PVC/Steel" }
  },
  "Elite Massage Gun Pro": {
    rating: 4.9,
    reviews: 367,
    description: "Professional-grade massage gun with advanced percussion therapy. 8 speed settings and 6 interchangeable heads for targeted muscle recovery.",
    features: ["8 speed levels", "6 massage heads", "4-hour battery", "LCD display", "Premium case"],
    specs: { dimensions: "9.5\" x 7.5\" x 3.5\"", weight: "2.8 lbs", battery: "3200mAh" }
  },
  "Yoga Block Set": {
    rating: 4.7,
    reviews: 512,
    description: "Set of 2 high-density foam blocks for yoga and stretching. Provides stability and support for all skill levels.",
    features: ["Set of 2 blocks", "Non-slip surface", "Lightweight", "Easy to clean"],
    specs: { dimensions: "9\" x 6\" x 4\" each", weight: "0.5 lbs each", material: "EVA Foam" }
  },
  "Adjustable Ankle Weights": {
    rating: 4.5,
    reviews: 298,
    description: "Comfortable ankle weights with adjustable straps. Add resistance to cardio and leg exercises for enhanced workouts.",
    features: ["1-5 lb adjustable", "Secure velcro straps", "Moisture-resistant", "Removable weight pods"],
    specs: { dimensions: "Adjustable fit", weight: "5 lbs per pair", material: "Neoprene" }
  },
  "Ab Wheel Roller": {
    rating: 4.6,
    reviews: 643,
    description: "Dual-wheel ab roller with non-slip handles for core strengthening. Stable design perfect for beginners and advanced users.",
    features: ["Dual wheels", "Non-slip grips", "Knee pad included", "Stable design"],
    specs: { dimensions: "7\" width", weight: "1.5 lbs", capacity: "350 lbs" }
  },
  "Wooden Balance Board": {
    rating: 4.8,
    reviews: 234,
    description: "Premium wooden balance board for core stability and coordination. Improves balance, posture, and overall body control.",
    features: ["Natural wood construction", "Non-slip surface", "360° rotation", "Multi-use design"],
    specs: { dimensions: "16\" diameter", weight: "4 lbs", capacity: "300 lbs" }
  },
  "Push-Up Bars": {
    rating: 4.7,
    reviews: 478,
    description: "Ergonomic push-up bars that reduce wrist strain and increase range of motion. Non-slip base for stability on any surface.",
    features: ["Ergonomic grips", "Non-slip base", "Foam padding", "Portable"],
    specs: { dimensions: "9\" x 6\" x 5\"", weight: "1 lb per bar", capacity: "400 lbs" }
  },
  "Mini Resistance Loops": {
    rating: 4.8,
    reviews: 789,
    description: "Set of 5 mini resistance bands for lower body and glute activation. Perfect for warm-ups and targeted exercises.",
    features: ["5 resistance levels", "Non-slip fabric", "Compact design", "Carrying bag"],
    specs: { dimensions: "12\" circumference", weight: "0.3 lbs", material: "Cotton/Latex blend" }
  },
  "Training Gloves": {
    rating: 4.6,
    reviews: 423,
    description: "Breathable workout gloves with padded palms for grip and protection. Wrist support strap for added stability during lifts.",
    features: ["Padded palm", "Wrist support", "Breathable mesh", "Easy pull tabs"],
    specs: { dimensions: "Multiple sizes", weight: "0.2 lbs", material: "Synthetic leather/Mesh" }
  },
  "Sports Water Bottle": {
    rating: 4.7,
    reviews: 891,
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours. Leak-proof design with easy-carry handle.",
    features: ["24-hour cold", "Leak-proof lid", "BPA-free", "Carry handle"],
    specs: { dimensions: "10\" x 3\"", weight: "0.8 lbs", capacity: "32 oz" }
  },
  "Hand Grip Strengthener": {
    rating: 4.5,
    reviews: 567,
    description: "Adjustable hand gripper for building forearm and grip strength. Resistance ranges from 22-88 lbs for progressive training.",
    features: ["Adjustable resistance", "Ergonomic design", "Non-slip handles", "Compact"],
    specs: { dimensions: "5\" x 4\"", weight: "0.4 lbs", resistance: "22-88 lbs" }
  },
  "Suspension Trainer": {
    rating: 4.8,
    reviews: 312,
    description: "Complete bodyweight training system with adjustable straps. Anchor anywhere for hundreds of exercises using your body weight.",
    features: ["Adjustable straps", "Door anchor", "Heavy-duty webbing", "Exercise guide"],
    specs: { dimensions: "96\" length", weight: "2 lbs", capacity: "350 lbs" }
  },
  "Medicine Ball": {
    rating: 4.6,
    reviews: 378,
    description: "Textured medicine ball for dynamic exercises and core training. Durable rubber construction with easy-grip surface.",
    features: ["Textured surface", "Durable rubber", "Multiple weights", "Bounce resistant"],
    specs: { dimensions: "9\" diameter", weight: "10 lbs", material: "Rubber" }
  },
  "Gym Duffel Bag": {
    rating: 4.7,
    reviews: 445,
    description: "Spacious gym bag with multiple compartments for organized storage. Water-resistant material with ventilated shoe compartment.",
    features: ["Shoe compartment", "Water-resistant", "Padded shoulder strap", "Multiple pockets"],
    specs: { dimensions: "22\" x 12\" x 10\"", weight: "1.5 lbs", capacity: "40L" }
  },
  "10lb Dumbbell Pair": {
    rating: 4.8,
    reviews: 234,
    description: "Classic rubber hex dumbbells perfect for home workouts. Durable construction with ergonomic grip handles.",
    features: ["Rubber hex design", "Anti-roll", "Chrome handles", "Sold as pair"],
    specs: { dimensions: "9\" x 4\"", weight: "10 lbs each", material: "Cast Iron/Rubber" }
  },
  "20lb Dumbbell Pair": {
    rating: 4.8,
    reviews: 312,
    description: "Versatile 20lb dumbbells ideal for strength training and muscle building. Rubber coating protects floors.",
    features: ["Rubber hex design", "Anti-roll", "Chrome handles", "Sold as pair"],
    specs: { dimensions: "11\" x 4.5\"", weight: "20 lbs each", material: "Cast Iron/Rubber" }
  },
  "30lb Dumbbell Pair": {
    rating: 4.7,
    reviews: 278,
    description: "Heavy-duty 30lb dumbbells for intermediate to advanced lifters. Perfect for progressive overload training.",
    features: ["Rubber hex design", "Anti-roll", "Chrome handles", "Sold as pair"],
    specs: { dimensions: "13\" x 5\"", weight: "30 lbs each", material: "Cast Iron/Rubber" }
  },
  "50lb Dumbbell Pair": {
    rating: 4.9,
    reviews: 198,
    description: "Professional-grade 50lb dumbbells for serious strength training. Built to last with premium materials.",
    features: ["Rubber hex design", "Anti-roll", "Knurled chrome handles", "Sold as pair"],
    specs: { dimensions: "15\" x 6\"", weight: "50 lbs each", material: "Cast Iron/Rubber" }
  },
  "Olympic Barbell 45lb": {
    rating: 4.9,
    reviews: 423,
    description: "Professional 7-foot Olympic barbell with rotating sleeves. Chrome finish with medium knurl for secure grip.",
    features: ["7 feet long", "Rotating sleeves", "700 lb capacity", "Medium knurl"],
    specs: { dimensions: "86\" x 2\"", weight: "45 lbs", material: "Chrome Steel" }
  },
  "EZ Curl Barbell": {
    rating: 4.8,
    reviews: 356,
    description: "Ergonomic curved barbell designed to reduce wrist strain during curls and tricep exercises.",
    features: ["Ergonomic curves", "Standard sleeve", "Knurled grip", "Includes collars"],
    specs: { dimensions: "47\" x 1\"", weight: "15 lbs", material: "Chrome Steel" }
  },
  "Short Barbell 25lb": {
    rating: 4.6,
    reviews: 245,
    description: "Compact straight barbell perfect for home gyms with limited space. Great for curls, presses, and rows.",
    features: ["Compact design", "Standard sleeve", "Knurled grip", "Space-saving"],
    specs: { dimensions: "48\" x 1\"", weight: "25 lbs", material: "Chrome Steel" }
  },
};

// Default details for products without specific data
const defaultDetails = {
  rating: 4.5,
  reviews: 100,
  description: "High-quality fitness equipment designed for your home gym. Built with premium materials for durability and performance.",
  features: ["Premium quality", "Durable construction", "Home gym ready", "Easy to use"],
  specs: { material: "Premium materials", warranty: "1 year" }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: products, isLoading } = useProducts();
  
  const product = products?.find(p => p.id === id);
  const details = product ? (productDetails[product.name] || defaultDetails) : defaultDetails;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }, quantity);
      setTimeout(() => navigate("/cart"), 1000);
    }
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
                      i < Math.floor(details.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {details.rating} ({details.reviews} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>

            <p className="text-muted-foreground mb-6">{details.description}</p>

            {/* Stock Info */}
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-destructive mb-4">Only {product.stock} left in stock!</p>
            )}
            {product.stock === 0 && (
              <p className="text-sm text-destructive mb-4">Out of stock</p>
            )}

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
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <Button 
                size="lg" 
                className="flex-1 gap-2" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
                {details.features.map((feature, index) => (
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
            {Object.entries(details.specs).map(([key, value]) => (
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
