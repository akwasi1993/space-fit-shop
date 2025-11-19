import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { REPORT_REASONS } from "@/lib/moderation";
import { useNavigate } from "react-router-dom";

interface ReportContentProps {
  contentType: "gallery" | "program";
  contentId: string;
  variant?: "icon" | "text";
}

export function ReportContent({ contentType, contentId, variant = "text" }: ReportContentProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>(REPORT_REASONS[0].value);
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleReport = async () => {
    if (!user) {
      toast.error("Please sign in to report content");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert report
      const { error: reportError } = await supabase.from("content_reports").insert({
        reporter_user_id: user.id,
        content_type: contentType,
        content_id: contentId,
        reason,
        details: reason === "other" ? details : null,
      });

      if (reportError) throw reportError;

      // Increment reported_count
      const tableName = contentType === "gallery" ? "gallery_images" : "programs";
      const { data: currentData, error: fetchError } = await supabase
        .from(tableName)
        .select("reported_count")
        .eq("id", contentId)
        .single();

      if (fetchError) throw fetchError;

      const newCount = (currentData.reported_count || 0) + 1;

      // Update count
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ reported_count: newCount })
        .eq("id", contentId);

      if (updateError) throw updateError;

      toast.success("Content reported successfully");
      setOpen(false);
      setReason(REPORT_REASONS[0].value);
      setDetails("");
    } catch (error: any) {
      console.error("Error reporting content:", error);
      toast.error("Failed to report content");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Flag className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
            <Flag className="h-4 w-4" />
            Report
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription>
            Help us keep the community safe by reporting inappropriate content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            {REPORT_REASONS.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} id={item.value} />
                <Label htmlFor={item.value} className="cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {reason === "other" && (
            <div className="space-y-2">
              <Label htmlFor="details">Please provide details</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe the issue..."
                rows={3}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleReport} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
