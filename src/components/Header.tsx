import { Menu, Search, ShoppingCart, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const { totalItems } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // Ignore errors - session may already be invalid
      console.log("Logout completed (session may have been expired)");
    }
    // Always clear local state and redirect, even if server call fails
    toast.success("Logged out successfully");
    navigate("/");
  };
  
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
              <Link to="/inspiration" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Inspiration
              </Link>
              <Link to="/programs" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                Programs
              </Link>
              {user && (
                <>
                  <Link to="/upload" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                    Upload
                  </Link>
                  <Link to="/gallery" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
                    Gallery
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/search">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeSwitcher />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link to="/account" className="hidden md:block">
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleLogout}
                      className="hidden md:flex"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="hidden md:block">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link to="/auth?tab=signup" className="hidden md:block">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}
              </>
            )}
            
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
