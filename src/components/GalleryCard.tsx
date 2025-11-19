import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ReportContent } from "@/components/ReportContent";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryCardProps {
  id: string;
  image: string;
  title: string;
  tags: string[];
  author: string;
}

interface Comment {
  id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  profiles?: {
    display_name: string | null;
  } | null;
}

export const GalleryCard = ({ id, image, title, tags, author }: GalleryCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userInteraction, setUserInteraction] = useState<boolean | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadInteractions();
    loadComments();
  }, [id]);

  const loadInteractions = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_interactions")
        .select("is_like, user_id")
        .eq("image_id", id);

      if (error) throw error;

      if (data) {
        const likesCount = data.filter((i) => i.is_like).length;
        const dislikesCount = data.filter((i) => !i.is_like).length;
        setLikes(likesCount);
        setDislikes(dislikesCount);

        if (user) {
          const userInt = data.find((i) => i.user_id === user.id);
          setUserInteraction(userInt ? userInt.is_like : null);
        }
      }
    } catch (error) {
      console.error("Error loading interactions:", error);
    }
  };

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_comments")
        .select(`
          id,
          user_id,
          comment_text,
          created_at
        `)
        .eq("image_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Load profiles separately
      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(c => c.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", userIds);

        const commentsWithProfiles = data.map(comment => ({
          ...comment,
          profiles: profiles?.find(p => p.id === comment.user_id) || null
        }));

        setComments(commentsWithProfiles);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  const handleInteraction = async (isLike: boolean) => {
    if (!user) {
      sessionStorage.setItem("redirectAfterLogin", "/inspiration");
      navigate("/auth");
      return;
    }

    try {
      if (userInteraction === isLike) {
        // Remove interaction
        await supabase
          .from("gallery_interactions")
          .delete()
          .eq("user_id", user.id)
          .eq("image_id", id);
        setUserInteraction(null);
      } else {
        // Upsert interaction
        await supabase
          .from("gallery_interactions")
          .upsert({
            user_id: user.id,
            image_id: id,
            is_like: isLike,
          });
        setUserInteraction(isLike);
      }
      loadInteractions();
    } catch (error) {
      console.error("Error updating interaction:", error);
      toast.error("Failed to update reaction");
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      sessionStorage.setItem("redirectAfterLogin", "/inspiration");
      navigate("/auth");
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("gallery_comments").insert({
        user_id: user.id,
        image_id: id,
        comment_text: newComment.trim(),
      });

      if (error) throw error;

      setNewComment("");
      loadComments();
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-elevated transition-smooth">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {author}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Like/Dislike Section */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b">
          <Button
            variant={userInteraction === true ? "default" : "outline"}
            size="sm"
            onClick={() => handleInteraction(true)}
            className="gap-2"
          >
            <ThumbsUp className="h-4 w-4" />
            {likes}
          </Button>
          <Button
            variant={userInteraction === false ? "destructive" : "outline"}
            size="sm"
            onClick={() => handleInteraction(false)}
            className="gap-2"
          >
            <ThumbsDown className="h-4 w-4" />
            {dislikes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="gap-2 ml-auto"
          >
            <MessageCircle className="h-4 w-4" />
            {comments.length}
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-4">
            {/* Comment Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder={user ? "Add a comment..." : "Sign in to comment"}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!user || isSubmitting}
                className="min-h-[60px]"
                onClick={() => {
                  if (!user) {
                    sessionStorage.setItem("redirectAfterLogin", "/inspiration");
                    navigate("/auth");
                  }
                }}
              />
              <Button
                size="icon"
                onClick={handleCommentSubmit}
                disabled={!user || !newComment.trim() || isSubmitting}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-secondary/30 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium text-sm">
                        {comment.profiles?.display_name || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{comment.comment_text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        )}
        
        <div className="pt-3 mt-3 border-t">
          <ReportContent contentType="gallery" contentId={id} variant="text" />
        </div>
      </div>
    </Card>
  );
};
