import { Play, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import programsHero from "@/assets/programs-hero.png";

const programs = [
  {
    id: "1",
    title: "Beginner 4-Week Plan",
    duration: "4 weeks",
    workouts: 12,
    level: "Beginner",
    description: "Perfect for getting started with compact equipment",
  },
  {
    id: "2",
    title: "Quick 20-Minute Workouts",
    duration: "20 min",
    workouts: 8,
    level: "All Levels",
    description: "High-intensity sessions that fit any schedule",
  },
  {
    id: "3",
    title: "Apartment-Friendly HIIT",
    duration: "30 min",
    workouts: 10,
    level: "Intermediate",
    description: "No jumping, low noise — ideal for apartment living",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Hero Band */}
      <div className="bg-gradient-programs relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Left: Heading */}
            <div className="space-y-3">
              <h1 className="text-[34px] md:text-[38px] font-bold text-white leading-tight">
                Fitness Programs
              </h1>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Small-space workouts designed for your equipment
              </p>
            </div>
            
            {/* Right: Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src={programsHero}
                alt="Fitness Programs"
                className="w-full max-w-md h-auto object-contain rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {programs.map((program) => (
            <Card 
              key={program.id} 
              className="overflow-hidden border-border hover:shadow-elevated hover:-translate-y-0.5 transition-smooth rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              tabIndex={0}
            >
              {/* Gradient Header */}
              <div className="bg-gradient-programs p-5 text-white">
                <Badge variant="secondary" className="mb-2.5 bg-white/20 text-white border-0 hover:bg-white/30">
                  {program.level}
                </Badge>
                <h3 className="text-xl font-bold">{program.title}</h3>
              </div>
              
              {/* Card Body */}
              <div className="p-5 space-y-5">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {program.description}
                </p>
                
                {/* Meta Row */}
                <div className="flex items-center gap-4 text-sm text-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>{program.workouts} workouts</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button className="w-full gap-2" aria-label={`Start ${program.title}`}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Start Program
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Promo CTA Band */}
        <div className="bg-gradient-programs text-white p-8 md:p-12 rounded-2xl shadow-elevated max-w-3xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-[26px] md:text-[30px] font-bold leading-tight">
              Free 20-Minute Starter Workout
            </h2>
            <p className="text-white/90 text-base leading-relaxed">
              Try our most popular quick workout — no equipment needed
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="mt-2"
            >
              Watch Free Workout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
