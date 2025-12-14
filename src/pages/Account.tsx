import { User, Package, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Account = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and orders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-elevated transition-smooth cursor-pointer">
              <User className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Profile</h3>
              <p className="text-muted-foreground mb-4">
                Update your personal information and preferences
              </p>
              <Button variant="outline">Edit Profile</Button>
            </Card>

            <Card 
              className="p-6 hover:shadow-elevated transition-smooth cursor-pointer"
              onClick={() => navigate("/orders")}
            >
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Orders</h3>
              <p className="text-muted-foreground mb-4">
                View and track your order history
              </p>
              <Button variant="outline">View Orders</Button>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-smooth cursor-pointer">
              <Heart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Saved Items</h3>
              <p className="text-muted-foreground mb-4">
                Access your wishlist and favorites
              </p>
              <Button variant="outline">View Saved</Button>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-smooth cursor-pointer">
              <Settings className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-muted-foreground mb-4">
                Manage notifications and preferences
              </p>
              <Button variant="outline">Open Settings</Button>
            </Card>
          </div>

          <Card className="mt-8 p-8 bg-gradient-primary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-3">Not signed in?</h2>
            <p className="mb-6 opacity-90">
              Create an account to track orders and save your favorites
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/auth")}
            >
              Sign In / Create Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
