import { ArrowRight, Dumbbell, Home, Package, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import BundleCard from "@/components/BundleCard";
import BundleBuilder from "@/components/BundleBuilder";
import heroFitness from "@/assets/hero-fitness.jpg";
import productTreadmill from "@/assets/product-treadmill.jpg";
import productDumbbells from "@/assets/product-dumbbells.jpg";
import productMassageGun from "@/assets/product-massage-gun.jpg";
import inspirationApartment from "@/assets/inspiration-apartment.jpg";

const featuredProducts = [
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

const fitnessBundles = [
  {
    id: "beginner-starter",
    name: "Beginner Starter Kit",
    description: "Everything you need to start your fitness journey at home. These essentials provide a solid foundation for basic exercises and recovery.",
    targetCustomer: "Complete beginners starting their fitness journey",
    items: [
      { id: "4", name: "Premium Yoga Mat", price: 79 },
      { id: "5", name: "Resistance Band Set", price: 49 },
      { id: "11", name: "Speed Jump Rope", price: 29 },
    ],
    totalPrice: 139,
    savings: 18,
  },
  {
    id: "weight-loss-essentials",
    name: "Weight Loss Essentials",
    description: "Cardio-focused equipment perfect for burning calories and improving endurance. Combine with recovery tools to keep you going strong.",
    targetCustomer: "Those focused on weight loss and cardio training",
    items: [
      { id: "11", name: "Speed Jump Rope", price: 29 },
      { id: "5", name: "Resistance Band Set", price: 49 },
      { id: "4", name: "Premium Yoga Mat", price: 79 },
      { id: "10", name: "Fitness Tracker Watch", price: 129 },
    ],
    totalPrice: 249,
    savings: 37,
  },
  {
    id: "strength-builder",
    name: "Strength Builder Bundle",
    description: "Build serious muscle with adjustable weights and versatile equipment. Perfect for progressive overload training in small spaces.",
    targetCustomer: "Intermediate users focused on building strength",
    items: [
      { id: "2", name: "Adjustable Dumbbell Set", price: 299 },
      { id: "7", name: "Adjustable Kettlebell", price: 179 },
      { id: "5", name: "Resistance Band Set", price: 49 },
    ],
    totalPrice: 475,
    savings: 52,
  },
  {
    id: "recovery-wellness",
    name: "Recovery & Wellness Kit",
    description: "Focus on flexibility, mobility, and muscle recovery. Ideal for active recovery days or complementing intense workout routines.",
    targetCustomer: "Athletes and active individuals prioritizing recovery",
    items: [
      { id: "4", name: "Premium Yoga Mat", price: 79 },
      { id: "6", name: "Textured Foam Roller", price: 39 },
      { id: "3", name: "Pro Massage Gun", price: 149 },
    ],
    totalPrice: 237,
    savings: 30,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroFitness}
            alt="Compact fitness equipment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Small Space. <span className="bg-gradient-hero bg-clip-text text-transparent">Big Energy.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Compact, quiet, foldable fitness gear perfect for apartments, dorms, and travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" variant="hero" className="gap-2 w-full sm:w-auto">
                  Shop Compact Gear
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/programs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Browse Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Home, title: "Small-Space Ready", desc: "Fits apartments & dorms", link: null },
              { icon: Package, title: "Portable", desc: "Easy to move & store", link: null },
              { icon: Zap, title: "Quick Setup", desc: "Start working out fast", link: null },
              { icon: Dumbbell, title: "Complete Bundles", desc: "Everything you need", link: "#bundles" },
            ].map((feature, i) => (
              feature.link ? (
                <a
                  key={i}
                  href={feature.link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(feature.link)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block"
                >
                  <Card className="p-6 text-center border-border hover:shadow-elevated hover:border-primary transition-smooth cursor-pointer h-full">
                    <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </Card>
                </a>
              ) : (
                <Card key={i} className="p-6 text-center border-border hover:shadow-elevated transition-smooth">
                  <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Compact Bestsellers</h2>
            <p className="text-muted-foreground">Our most popular small-space gear</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
            <Link to="/shop">
              <Card className="p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer">
                <ArrowRight className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">View All Products</h3>
                <p className="text-sm text-muted-foreground">Explore our full collection</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Complete Bundles */}
      <section id="bundles" className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Complete Bundles</h2>
            <p className="text-muted-foreground">Pre-selected equipment packages for every fitness goal</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fitnessBundles.map((bundle) => (
              <BundleCard key={bundle.id} {...bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Bundle */}
      <section className="py-12 md:py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Your Custom Bundle</h2>
            <p className="text-lg mb-8 opacity-90">
              Answer 3 quick questions and we'll recommend the perfect equipment selection from our catalog tailored to your needs
            </p>
            <BundleBuilder />
          </div>
        </div>
      </section>

      {/* Community Gallery */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Real Home Gyms</h2>
              <p className="text-muted-foreground">See how others transformed their spaces</p>
            </div>
            <Link to="/inspiration" className="hidden md:block">
              <Button variant="outline">View Gallery</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group overflow-hidden border-border hover:shadow-elevated transition-smooth cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={inspirationApartment}
                    alt="Home gym setup"
                    className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Workout CTA */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Try a Free 20-Minute Workout
              </h2>
              <p className="mb-6 opacity-90">
                See what you can achieve with minimal equipment
              </p>
              <Button size="lg" variant="secondary">
                Watch Now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
