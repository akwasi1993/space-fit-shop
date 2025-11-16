import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramFilters } from "@/components/ProgramFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface Program {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  cover_image_url: string;
  duration: string;
  level: string;
  category: string | null;
  view_count: number | null;
}

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [level, setLevel] = useState("all");
  const [category, setCategory] = useState("all");
  const { isCreator, loading: authLoading } = useAuth();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error("Error loading programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = level === "all" || program.level === level;
    const matchesCategory =
      category === "all" || program.category === category;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Programs</h1>
            <p className="text-muted-foreground">
              Browse guided programs with videos, images, and step-by-step
              instructions.
            </p>
          </div>
          {!authLoading && isCreator && (
            <Link to="/programs/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Program
              </Button>
            </Link>
          )}
        </div>

        <ProgramFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          level={level}
          onLevelChange={setLevel}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No programs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              slug={program.slug}
              title={program.title}
              shortDescription={program.short_description}
              coverImageUrl={program.cover_image_url}
              duration={program.duration}
              level={program.level}
              category={program.category || undefined}
              viewCount={program.view_count || undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Programs;
