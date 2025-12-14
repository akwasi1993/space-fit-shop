import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Image, LogOut, User } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
    } else {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.display_name || user.email?.split("@")[0] || "User";
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl">{displayName}</CardTitle>
            <CardDescription className="text-lg">{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/upload">
                <Card className="hover:bg-accent transition-smooth cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload Files</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload your fitness images and videos
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/gallery">
                <Card className="hover:bg-accent transition-smooth cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">My Gallery</h3>
                      <p className="text-sm text-muted-foreground">
                        View all your uploaded content
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Display Name:</span>
                  <span className="font-medium">{displayName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Created:</span>
                  <span className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full md:w-auto"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
