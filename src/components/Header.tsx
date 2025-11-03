import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FitOnTheGo
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Shop
              </Link>
              <Link to="/programs" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Programs
              </Link>
              <Link to="/inspiration" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Inspiration
              </Link>
              <Link to="/deals" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Deals
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
