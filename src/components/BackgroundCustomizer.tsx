import { Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { useBackground } from "@/hooks/use-background";

const backgrounds = [
  { value: "default", label: "Clean White", color: "hsl(0 0% 100%)" },
  { value: "gradient", label: "Energy Gradient", color: "linear-gradient(135deg, hsl(200 100% 50%), hsl(200 100% 65%))" },
  { value: "dark", label: "Dark Mode", color: "hsl(220 20% 10%)" },
  { value: "muted", label: "Soft Gray", color: "hsl(220 15% 96%)" },
  { value: "accent", label: "Bold Blue", color: "hsl(200 100% 50%)" },
] as const;

export default function BackgroundCustomizer() {
  const { background, setBackground } = useBackground();
  const currentIndex = backgrounds.findIndex((bg) => bg.value === background);

  const handleSliderChange = (values: number[]) => {
    const index = values[0];
    setBackground(backgrounds[index].value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-24 md:bottom-6 right-6 z-50 shadow-elevated bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-auto py-3 px-4 md:px-6 rounded-full font-semibold animate-pulse hover:animate-none"
          aria-label="Customize background"
        >
          <Palette className="h-5 w-5" />
          <span className="hidden md:inline">Change Background</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6" align="end">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Customize Background</h3>
            <p className="text-sm text-muted-foreground">
              Choose your preferred background style
            </p>
          </div>

          <div className="space-y-4">
            <Slider
              value={[currentIndex]}
              min={0}
              max={backgrounds.length - 1}
              step={1}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            
            <div className="text-center">
              <p className="text-sm font-medium">{backgrounds[currentIndex].label}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg.value}
                onClick={() => setBackground(bg.value)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  background === bg.value
                    ? "border-primary scale-110"
                    : "border-border hover:border-primary/50"
                }`}
                style={{ background: bg.color }}
                aria-label={bg.label}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
