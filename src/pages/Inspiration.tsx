import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import galleryApartment from "@/assets/gallery-apartment-gym.jpg";
import galleryGarage from "@/assets/gallery-garage-gym.jpg";
import galleryBasement from "@/assets/gallery-basement-gym.jpg";
import galleryBedroom from "@/assets/gallery-bedroom-gym.jpg";
import galleryLuxury from "@/assets/gallery-luxury-gym.jpg";
import galleryCardio from "@/assets/gallery-cardio-corner.jpg";
import galleryGarageModern from "@/assets/gallery-garage-modern.jpg";
import galleryOffice from "@/assets/gallery-office-gym.jpg";
import gallerySunroom from "@/assets/gallery-sunroom-gym.jpg";
import galleryAttic from "@/assets/gallery-attic-gym.jpg";
import galleryNook from "@/assets/gallery-nook-gym.jpg";
import galleryLoft from "@/assets/gallery-loft-gym.jpg";

const inspirations = [
  {
    id: "1",
    image: galleryApartment,
    title: "Compact Apartment Home Gym",
    tags: ["Apartment", "Minimal Space"],
    author: "Sarah M.",
  },
  {
    id: "2",
    image: galleryGarage,
    title: "Complete Garage Conversion",
    tags: ["Garage", "Full Setup"],
    author: "Mike D.",
  },
  {
    id: "3",
    image: galleryBasement,
    title: "Finished Basement Workout Room",
    tags: ["Basement", "Multi-Purpose"],
    author: "Jessica T.",
  },
  {
    id: "4",
    image: galleryBedroom,
    title: "Spare Bedroom Transformation",
    tags: ["Bedroom", "Beginner Friendly"],
    author: "Alex K.",
  },
  {
    id: "5",
    image: galleryLuxury,
    title: "High-End Home Fitness Studio",
    tags: ["Luxury", "Premium Setup"],
    author: "David R.",
  },
  {
    id: "6",
    image: galleryCardio,
    title: "Living Room Cardio Corner",
    tags: ["Living Space", "Cardio Focus"],
    author: "Emma L.",
  },
  {
    id: "7",
    image: galleryGarageModern,
    title: "Modern Garage Gym Build",
    tags: ["Garage", "Strength Training"],
    author: "Chris P.",
  },
  {
    id: "8",
    image: galleryOffice,
    title: "Home Office & Gym Combo",
    tags: ["Office", "Multi-Purpose"],
    author: "Taylor S.",
  },
  {
    id: "9",
    image: gallerySunroom,
    title: "Bright Sunroom Fitness Space",
    tags: ["Sunroom", "Yoga & Cardio"],
    author: "Rachel W.",
  },
  {
    id: "10",
    image: galleryAttic,
    title: "Cozy Attic Training Studio",
    tags: ["Attic", "Functional Training"],
    author: "Jordan B.",
  },
  {
    id: "11",
    image: galleryNook,
    title: "Smart Closet Micro Gym",
    tags: ["Closet", "Ultra Compact"],
    author: "Morgan F.",
  },
  {
    id: "12",
    image: galleryLoft,
    title: "Industrial Loft Gym",
    tags: ["Loft", "Boxing & Strength"],
    author: "Casey M.",
  },
];

const Inspiration = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Community Gallery</h1>
          <p className="text-muted-foreground text-lg">
            Real home gyms from our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspirations.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-border hover:shadow-elevated transition-smooth cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">by {item.author}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-primary text-primary-foreground p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Share Your Space
            </h2>
            <p className="mb-6 opacity-90">
              Show us your home gym setup and inspire others
            </p>
            <button className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-smooth">
              Upload Photos
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Inspiration;
