import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import inspirationApartment from "@/assets/inspiration-apartment.jpg";

const inspirations = [
  {
    id: "1",
    image: inspirationApartment,
    title: "Studio Apartment Setup",
    tags: ["Apartment", "Budget-Friendly"],
    author: "Sarah M.",
  },
  {
    id: "2",
    image: inspirationApartment,
    title: "Dorm Room Gym",
    tags: ["Dorm", "Minimal Space"],
    author: "Alex K.",
  },
  {
    id: "3",
    image: inspirationApartment,
    title: "RV Fitness Corner",
    tags: ["RV", "Travel"],
    author: "Mike D.",
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
