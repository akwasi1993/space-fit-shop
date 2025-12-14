import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setIsCreator(false);
    setIsAdmin(false);
  }, []);

  const signOut = useCallback(async () => {
    // Clear local state immediately
    clearAuthState();
    // Then attempt server signout (ignore errors for expired sessions)
    await supabase.auth.signOut();
  }, [clearAuthState]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setIsCreator(false);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (roles) {
        setIsCreator(
          roles.some((r) => r.role === "creator" || r.role === "admin")
        );
        setIsAdmin(roles.some((r) => r.role === "admin"));
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, isCreator, isAdmin, signOut };
};
