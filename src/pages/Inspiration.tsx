import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GalleryCard } from "@/components/GalleryCard";
import { useAuth } from "@/hooks/use-auth";
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
    category: "Apartment",
    author: "Sarah M.",
  },
  {
    id: "2",
    image: galleryGarage,
    title: "Complete Garage Conversion",
    tags: ["Garage", "Full Setup"],
    category: "Garage",
    author: "Mike D.",
  },
  {
    id: "3",
    image: galleryBasement,
    title: "Finished Basement Workout Room",
    tags: ["Basement", "Multi-Purpose"],
    category: "Basement",
    author: "Jessica T.",
  },
  {
    id: "4",
    image: galleryBedroom,
    title: "Spare Bedroom Transformation",
    tags: ["Bedroom", "Beginner Friendly"],
    category: "Spare Bedroom",
    author: "Alex K.",
  },
  {
    id: "5",
    image: galleryLuxury,
    title: "High-End Home Fitness Studio",
    tags: ["Luxury", "Premium Setup"],
    category: "Full-Room Build",
    author: "David R.",
  },
  {
    id: "6",
    image: galleryCardio,
    title: "Living Room Cardio Corner",
    tags: ["Living Space", "Cardio Focus"],
    category: "Cardio Corner",
    author: "Emma L.",
  },
  {
    id: "7",
    image: galleryGarageModern,
    title: "Modern Garage Gym Build",
    tags: ["Garage", "Strength Training"],
    category: "Garage",
    author: "Chris P.",
  },
  {
    id: "8",
    image: galleryOffice,
    title: "Home Office & Gym Combo",
    tags: ["Office", "Multi-Purpose"],
    category: "Small-Space Gym",
    author: "Taylor S.",
  },
  {
    id: "9",
    image: gallerySunroom,
    title: "Bright Sunroom Fitness Space",
    tags: ["Sunroom", "Yoga & Cardio"],
    category: "Sunroom",
    author: "Rachel W.",
  },
  {
    id: "10",
    image: galleryAttic,
    title: "Cozy Attic Training Studio",
    tags: ["Attic", "Functional Training"],
    category: "Small-Space Gym",
    author: "Jordan B.",
  },
  {
    id: "11",
    image: galleryNook,
    title: "Smart Closet Micro Gym",
    tags: ["Closet", "Ultra Compact"],
    category: "Small-Space Gym",
    author: "Morgan F.",
  },
  {
    id: "12",
    image: galleryLoft,
    title: "Industrial Loft Gym",
    tags: ["Loft", "Boxing & Strength"],
    category: "Strength Room",
    author: "Casey M.",
  },
];

const categories = [
  "Garage",
  "Sunroom",
  "Basement",
  "Apartment",
  "Spare Bedroom",
  "Full-Room Build",
  "Small-Space Gym",
  "Cardio Corner",
  "Strength Room",
];

const Inspiration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredInspirations = selectedFilters.length === 0
    ? inspirations
    : inspirations.filter((item) => selectedFilters.includes(item.category));

  const handleFilterToggle = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const handleUploadClick = () => {
    if (user) {
      navigate("/upload");
    } else {
      sessionStorage.setItem("redirectAfterLogin", "/upload");
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Community Gallery</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Real home gyms from our community
          </p>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              {selectedFilters.length > 0 && ` (${selectedFilters.length})`}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside
            className={`
              md:w-64 flex-shrink-0
              ${showFilters ? "block" : "hidden md:block"}
            `}
          >
            <Card className="p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                {selectedFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedFilters.includes(category)}
                      onCheckedChange={() => handleFilterToggle(category)}
                    />
                    <Label
                      htmlFor={category}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* Gallery Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredInspirations.map((item) => (
                <GalleryCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  tags={item.tags}
                  author={item.author}
                />
              ))}
            </div>

            {filteredInspirations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No galleries match your selected filters.
                </p>
                <Button
                  variant="link"
                  onClick={clearAllFilters}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>

        <Card className="mt-12 bg-gradient-primary text-primary-foreground p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Share Your Space
            </h2>
            <p className="mb-6 opacity-90">
              {user 
                ? "Show us your home gym setup and inspire others"
                : "Log in to share your home gym with the community!"
              }
            </p>
            <Button
              onClick={handleUploadClick}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3 text-base font-semibold hover:scale-105 transition-smooth"
            >
              Upload Photos
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Inspiration;
