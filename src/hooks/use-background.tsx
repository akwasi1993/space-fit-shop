import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type BackgroundType = "default" | "gradient" | "dark" | "muted" | "accent";

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (bg: BackgroundType) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [background, setBackgroundState] = useState<BackgroundType>(() => {
    const saved = localStorage.getItem("fitOnTheGo-background");
    return (saved as BackgroundType) || "default";
  });

  const setBackground = (bg: BackgroundType) => {
    setBackgroundState(bg);
    localStorage.setItem("fitOnTheGo-background", bg);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all background classes
    root.classList.remove("bg-gradient", "bg-dark", "bg-muted", "bg-accent");
    
    // Apply selected background
    switch (background) {
      case "gradient":
        root.classList.add("bg-gradient");
        break;
      case "dark":
        root.classList.add("bg-dark");
        break;
      case "muted":
        root.classList.add("bg-muted");
        break;
      case "accent":
        root.classList.add("bg-accent");
        break;
    }
  }, [background]);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within BackgroundProvider");
  }
  return context;
};
