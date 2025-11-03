import { Play, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    description: "No jumping, no noise - perfect for apartment living",
  },
];

const Programs = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Fitness Programs</h1>
          <p className="text-muted-foreground text-lg">
            Small-space workouts designed for your equipment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden border-border hover:shadow-elevated transition-smooth">
              <div className="bg-gradient-primary p-8 text-primary-foreground">
                <Badge variant="secondary" className="mb-3">
                  {program.level}
                </Badge>
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <div className="flex gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <span>{program.workouts} workouts</span>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Start Program
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-hero text-primary-foreground p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Free 20-Minute Starter Workout
            </h2>
            <p className="mb-6 opacity-90">
              Try our most popular quick workout - no equipment needed
            </p>
            <Button size="lg" variant="secondary">
              Watch Free Workout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Programs;
