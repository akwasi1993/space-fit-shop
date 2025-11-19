import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Image as ImageIcon, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PendingContent {
  id: string;
  title: string;
  description?: string;
  user_id: string;
  created_at: string;
  type: "gallery" | "program";
  image_url?: string;
  cover_image_url?: string;
  reported_count: number;
}

const AdminModeration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingContent, setPendingContent] = useState<PendingContent[]>([]);
  const [reportedContent, setReportedContent] = useState<PendingContent[]>([]);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<PendingContent | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error("Access denied: Admin privileges required");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadPendingContent();
      loadReportedContent();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadPendingContent = async () => {
    try {
      // Load pending gallery images
      const { data: galleryData, error: galleryError } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (galleryError) throw galleryError;

      // Load pending programs
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (programError) throw programError;

      const combined = [
        ...(galleryData || []).map((item) => ({ ...item, type: "gallery" as const })),
        ...(programData || []).map((item) => ({ 
          ...item, 
          type: "program" as const,
          user_id: item.created_by_user_id 
        })),
      ];

      setPendingContent(combined);
    } catch (error) {
      console.error("Error loading pending content:", error);
      toast.error("Failed to load pending content");
    }
  };

  const loadReportedContent = async () => {
    try {
      // Load reported gallery images
      const { data: galleryData, error: galleryError } = await supabase
        .from("gallery_images")
        .select("*")
        .gt("reported_count", 0)
        .order("reported_count", { ascending: false });

      if (galleryError) throw galleryError;

      // Load reported programs
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .gt("reported_count", 0)
        .order("reported_count", { ascending: false });

      if (programError) throw programError;

      const combined = [
        ...(galleryData || []).map((item) => ({ ...item, type: "gallery" as const })),
        ...(programData || []).map((item) => ({ 
          ...item, 
          type: "program" as const,
          user_id: item.created_by_user_id 
        })),
      ];

      setReportedContent(combined);
    } catch (error) {
      console.error("Error loading reported content:", error);
      toast.error("Failed to load reported content");
    }
  };

  const handleApprove = async (content: PendingContent) => {
    try {
      const tableName = content.type === "gallery" ? "gallery_images" : "programs";
      const { error } = await supabase
        .from(tableName)
        .update({ status: "approved", reported_count: 0 })
        .eq("id", content.id);

      if (error) throw error;

      toast.success("Content approved");
      loadPendingContent();
      loadReportedContent();
    } catch (error) {
      console.error("Error approving content:", error);
      toast.error("Failed to approve content");
    }
  };

  const openRejectDialog = (content: PendingContent) => {
    setSelectedContent(content);
    setRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (!selectedContent || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      const tableName = selectedContent.type === "gallery" ? "gallery_images" : "programs";
      const { error } = await supabase
        .from(tableName)
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
        })
        .eq("id", selectedContent.id);

      if (error) throw error;

      toast.success("Content rejected");
      setRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedContent(null);
      loadPendingContent();
      loadReportedContent();
    } catch (error) {
      console.error("Error rejecting content:", error);
      toast.error("Failed to reject content");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Content Moderation</h1>
          <p className="text-muted-foreground">Review and manage community content</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending">
              Pending ({pendingContent.length})
            </TabsTrigger>
            <TabsTrigger value="reported">
              Reported ({reportedContent.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingContent.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending content to review</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onApprove={handleApprove}
                    onReject={openRejectDialog}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reported" className="mt-6">
            {reportedContent.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reported content</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reportedContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onApprove={handleApprove}
                    onReject={openRejectDialog}
                    showReportCount
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Content</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explain why this content is being rejected..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function ContentCard({
  content,
  onApprove,
  onReject,
  showReportCount = false,
}: {
  content: PendingContent;
  onApprove: (content: PendingContent) => void;
  onReject: (content: PendingContent) => void;
  showReportCount?: boolean;
}) {
  const imageUrl = content.type === "gallery" ? content.image_url : content.cover_image_url;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {content.type === "gallery" ? (
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Video className="h-5 w-5 text-muted-foreground" />
            )}
            <Badge variant="outline">{content.type}</Badge>
          </div>
          {showReportCount && content.reported_count > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {content.reported_count} reports
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
        {content.description && (
          <CardDescription className="line-clamp-2">{content.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={content.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        <div className="text-sm text-muted-foreground mb-4">
          Submitted {new Date(content.created_at).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => onApprove(content)}
            className="flex-1 gap-2"
            variant="default"
          >
            <Check className="h-4 w-4" />
            Approve
          </Button>
          <Button
            onClick={() => onReject(content)}
            className="flex-1 gap-2"
            variant="destructive"
          >
            <X className="h-4 w-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminModeration;
