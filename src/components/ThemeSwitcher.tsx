import { Palette, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

const themes = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "blue", label: "Blue", icon: "🌊" },
  { value: "gradient", label: "Gradient", icon: "🎨" },
] as const;

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-background/80 transition-all duration-200"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-background/95 backdrop-blur-md border-border shadow-lg"
      >
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="cursor-pointer flex items-center justify-between px-3 py-2 hover:bg-accent transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>{themeOption.icon}</span>
              <span>{themeOption.label}</span>
            </span>
            {theme === themeOption.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
