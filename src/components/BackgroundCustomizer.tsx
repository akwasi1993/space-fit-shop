import { Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useBackground } from "@/hooks/use-background";

const backgrounds = ["default", "gradient", "dark", "muted", "accent"] as const;

export default function BackgroundCustomizer() {
  const { background, setBackground } = useBackground();

  const cycleBackground = () => {
    const currentIndex = backgrounds.findIndex((bg) => bg === background);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    setBackground(backgrounds[nextIndex]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleBackground}
      className="rounded-full h-9 w-9 hover:bg-background/20"
      aria-label="Change background style"
    >
      <Sun className="h-5 w-5" />
    </Button>
  );
}
