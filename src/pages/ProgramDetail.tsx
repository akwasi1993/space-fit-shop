import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, TrendingUp, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface Program {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string | null;
  cover_image_url: string;
  intro_video_url: string;
  duration: string;
  level: string;
  category: string | null;
  tags: string[] | null;
  view_count: number | null;
  created_by_user_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
}

const ProgramDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isCreator, isAdmin } = useAuth();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProgram();
    }
  }, [slug]);

  const loadProgram = async () => {
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setProgram(data);

      // Increment view count
      if (data.view_count !== null) {
        await supabase
          .from("programs")
          .update({ view_count: data.view_count + 1 })
          .eq("slug", slug);
      }
    } catch (error) {
      console.error("Error loading program:", error);
      toast.error("Program not found");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!program || !window.confirm("Are you sure you want to delete this program?")) return;

    try {
      const { error } = await supabase
        .from("programs")
        .delete()
        .eq("id", program.id);

      if (error) throw error;
      toast.success("Program deleted successfully");
      navigate("/programs");
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error("Failed to delete program");
    }
  };

  const canEdit =
    user &&
    program &&
    (isAdmin || program.created_by_user_id === user.id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Skeleton className="aspect-video w-full mb-6" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Program not found</h1>
        <Link to="/programs">
          <Button>Back to Programs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <img
          src={program.cover_image_url}
          alt={program.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
      </div>

      {/* Moderation Status Banner */}
      {program.status !== 'approved' && (
        <div className={`mb-6 p-4 rounded-lg border ${
          program.status === 'pending' 
            ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' 
            : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-2">
            <Badge variant={program.status === 'pending' ? 'secondary' : 'destructive'}>
              {program.status === 'pending' ? 'Pending Review' : 'Rejected'}
            </Badge>
            {program.status === 'pending' && (
              <p className="text-sm text-muted-foreground">
                Your program is awaiting moderation review.
              </p>
            )}
            {program.status === 'rejected' && program.rejection_reason && (
              <p className="text-sm text-destructive">
                Reason: {program.rejection_reason}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge>{program.level}</Badge>
            {program.category && <Badge variant="outline">{program.category}</Badge>}
            {program.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{program.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{program.duration}</span>
            </div>
            {program.view_count !== null && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{program.view_count} views</span>
              </div>
            )}
          </div>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Link to={`/programs/${program.slug}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="mb-8">
        {program.intro_video_url.includes('youtube.com') || 
         program.intro_video_url.includes('vimeo.com') ? (
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={program.intro_video_url}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <video
            src={program.intro_video_url}
            controls
            className="w-full aspect-video rounded-lg"
          />
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2>About this Program</h2>
        <p className="text-lg">{program.short_description}</p>
        {program.full_description && (
          <div className="whitespace-pre-wrap">{program.full_description}</div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetail;
