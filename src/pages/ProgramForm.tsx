import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/FileUpload";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const ProgramForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    duration: "",
    level: "Beginner",
    category: "",
    tags: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [videoSource, setVideoSource] = useState<"upload" | "link">("upload");
  const [videoLink, setVideoLink] = useState("");
  const [pdfDocument, setPdfDocument] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please log in to add a program");
      // Store intended destination for after login
      sessionStorage.setItem("redirectAfterLogin", "/programs/new");
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

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

      setFormData({
        title: data.title,
        slug: data.slug,
        shortDescription: data.short_description,
        fullDescription: data.full_description || "",
        duration: data.duration,
        level: data.level,
        category: data.category || "",
        tags: data.tags?.join(", ") || "",
      });
      setCoverImagePreview(data.cover_image_url);
      
      // Check if video URL is a YouTube/Vimeo link or uploaded file
      const videoUrl = data.intro_video_url;
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com')) {
        setVideoSource("link");
        setVideoLink(videoUrl);
      } else {
        setVideoPreview(videoUrl);
      }
    } catch (error) {
      console.error("Error loading program:", error);
      toast.error("Failed to load program");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const generateUniqueSlug = async (title: string, currentSlug?: string) => {
    const baseSlug = generateSlug(title);
    
    // If editing and title hasn't changed, keep the current slug
    if (currentSlug && baseSlug === generateSlug(currentSlug)) {
      return currentSlug;
    }

    // Check if base slug exists
    const { data: existingProgram } = await supabase
      .from("programs")
      .select("slug")
      .eq("slug", baseSlug)
      .maybeSingle();

    if (!existingProgram) {
      return baseSlug;
    }

    // If slug exists, find the next available number
    let suffix = 2;
    let uniqueSlug = `${baseSlug}-${suffix}`;
    
    while (true) {
      const { data: conflictingProgram } = await supabase
        .from("programs")
        .select("slug")
        .eq("slug", uniqueSlug)
        .maybeSingle();

      if (!conflictingProgram) {
        return uniqueSlug;
      }

      suffix++;
      uniqueSlug = `${baseSlug}-${suffix}`;
      
      // Safety check to prevent infinite loops
      if (suffix > 1000) {
        throw new Error("Unable to generate unique slug");
      }
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const ALLOWED_VIDEO_DOMAINS = [
    'youtube.com',
    'www.youtube.com',
    'youtu.be',
    'vimeo.com',
    'player.vimeo.com'
  ];

  const isValidVideoUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ALLOWED_VIDEO_DOMAINS.includes(parsed.hostname);
    } catch {
      return false;
    }
  };

  const convertToEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      
      // Validate domain
      if (!ALLOWED_VIDEO_DOMAINS.includes(parsed.hostname)) {
        return null;
      }

      // YouTube watch URL
      if (parsed.hostname === 'youtube.com' || parsed.hostname === 'www.youtube.com') {
        if (parsed.pathname === '/watch') {
          const videoId = parsed.searchParams.get('v');
          if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            return `https://www.youtube.com/embed/${videoId}`;
          }
        }
        // YouTube embed URL (already valid)
        if (parsed.pathname.startsWith('/embed/')) {
          const videoId = parsed.pathname.split('/embed/')[1]?.split('?')[0];
          if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            return url;
          }
        }
        return null;
      }

      // YouTube short URL
      if (parsed.hostname === 'youtu.be') {
        const videoId = parsed.pathname.slice(1).split('?')[0];
        if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return null;
      }

      // Vimeo
      if (parsed.hostname === 'vimeo.com' || parsed.hostname === 'player.vimeo.com') {
        const pathParts = parsed.pathname.split('/').filter(Boolean);
        // For player.vimeo.com/video/ID or vimeo.com/ID
        const videoId = parsed.hostname === 'player.vimeo.com' ? pathParts[1] : pathParts[0];
        if (videoId && /^\d+$/.test(videoId)) {
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return null;
      }

      return null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!coverImage && !coverImagePreview) {
      toast.error("Please upload a cover image");
      return;
    }

    if (videoSource === "upload" && !video && !videoPreview) {
      toast.error("Please upload a video");
      return;
    }

    if (videoSource === "link") {
      if (!videoLink) {
        toast.error("Please provide a video link");
        return;
      }
      if (!isValidVideoUrl(videoLink)) {
        toast.error("Please provide a valid YouTube or Vimeo URL");
        return;
      }
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      let coverImageUrl = coverImagePreview;
      let videoUrl = videoPreview;
      let pdfUrl = pdfPreview;

      if (coverImage) {
        setUploadProgress(20);
        const imagePath = `${user.id}/${Date.now()}-${coverImage.name}`;
        coverImageUrl = await uploadFile(coverImage, "program-covers", imagePath);
      }

      if (videoSource === "link") {
        const embedUrl = convertToEmbedUrl(videoLink);
        if (!embedUrl) {
          toast.error("Invalid video URL format");
          setLoading(false);
          return;
        }
        videoUrl = embedUrl;
        setUploadProgress(60);
      } else if (video) {
        setUploadProgress(40);
        const videoPath = `${user.id}/${Date.now()}-${video.name}`;
        videoUrl = await uploadFile(video, "program-videos", videoPath);
      }

      if (pdfDocument) {
        setUploadProgress(70);
        const pdfPath = `${user.id}/${Date.now()}-${pdfDocument.name}`;
        pdfUrl = await uploadFile(pdfDocument, "user-uploads", pdfPath);
      }

      setUploadProgress(85);

      // Generate unique slug
      const uniqueSlug = await generateUniqueSlug(formData.title, slug);

      const programData = {
        title: formData.title,
        slug: uniqueSlug,
        short_description: formData.shortDescription,
        full_description: formData.fullDescription || null,
        cover_image_url: coverImageUrl,
        intro_video_url: videoUrl,
        duration: formData.duration,
        level: formData.level,
        category: formData.category || null,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        created_by_user_id: user.id,
        status: 'approved' as const, // Auto-publish all new programs
      };

      if (slug) {
        const { error } = await supabase
          .from("programs")
          .update(programData)
          .eq("slug", slug);

        if (error) {
          console.error("Update error details:", error);
          throw error;
        }
        toast.success("Program updated successfully");
      } else {
        const { error, data } = await supabase.from("programs").insert(programData).select();

        if (error) {
          console.error("Insert error details:", error);
          throw error;
        }
        console.log("Program created successfully:", data);
        toast.success("Program published successfully!");
      }

      setUploadProgress(100);
      setTimeout(() => {
        navigate("/programs");
      }, 1500);
    } catch (error: any) {
      console.error("Error saving program:", error);
      const errorMessage = error?.message || "Failed to save program";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (authLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        {slug ? "Edit Program" : "Create New Program"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Title <span className="text-destructive">*</span>
          </label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            placeholder="Program title"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Short Description <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData({ ...formData, shortDescription: e.target.value })
            }
            required
            placeholder="Brief description (2-3 sentences)"
            rows={3}
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.shortDescription.length}/200 characters
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Full Description
          </label>
          <Textarea
            value={formData.fullDescription}
            onChange={(e) =>
              setFormData({ ...formData, fullDescription: e.target.value })
            }
            placeholder="Detailed program description"
            rows={6}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Duration <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              placeholder="e.g., 4 Weeks, 10 Sessions"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Level <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.level}
              onValueChange={(value) =>
                setFormData({ ...formData, level: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Input
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g., Fitness, Mindset"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <Input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="Comma-separated tags"
            />
          </div>
        </div>

        <FileUpload
          label="Cover Image"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          onFileSelect={(file) => {
            setCoverImage(file);
            setCoverImagePreview(URL.createObjectURL(file));
          }}
          preview={coverImagePreview}
          onClear={() => {
            setCoverImage(null);
            setCoverImagePreview("");
          }}
          helperText="Max 5MB - JPG, PNG, WEBP"
        />

        <div className="space-y-4">
          <label className="text-sm font-medium block">
            Program Video <span className="text-destructive">*</span>
          </label>
          
          <div className="flex gap-4 mb-4">
            <Button
              type="button"
              variant={videoSource === "upload" ? "default" : "outline"}
              onClick={() => setVideoSource("upload")}
              className="flex-1"
            >
              Upload Video
            </Button>
            <Button
              type="button"
              variant={videoSource === "link" ? "default" : "outline"}
              onClick={() => setVideoSource("link")}
              className="flex-1"
            >
              Paste Link
            </Button>
          </div>

          {videoSource === "upload" ? (
            <FileUpload
              label=""
              accept="video/*"
              maxSize={100 * 1024 * 1024}
              onFileSelect={(file) => {
                setVideo(file);
                setVideoPreview(URL.createObjectURL(file));
              }}
              preview={videoPreview}
              onClear={() => {
                setVideo(null);
                setVideoPreview("");
              }}
              helperText="Max 100MB - MP4, MOV"
            />
          ) : (
            <div>
              <Input
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                className="mb-2"
              />
              <p className="text-xs text-muted-foreground">
                Paste a YouTube or Vimeo link
              </p>
              {videoLink && isValidVideoUrl(videoLink) && convertToEmbedUrl(videoLink) && (
                <div className="mt-4 aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={convertToEmbedUrl(videoLink) || ''}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              {videoLink && !isValidVideoUrl(videoLink) && (
                <p className="text-sm text-destructive mt-2">
                  Please enter a valid YouTube or Vimeo URL
                </p>
              )}
            </div>
          )}
        </div>

        <FileUpload
          label="Workout Plan PDF (Optional)"
          accept=".pdf,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          onFileSelect={(file) => {
            setPdfDocument(file);
            setPdfPreview(file.name);
          }}
          preview={pdfPreview}
          onClear={() => {
            setPdfDocument(null);
            setPdfPreview("");
          }}
          helperText="Max 10MB - PDF, DOC, DOCX"
        />

        {uploadProgress > 0 && (
          <div>
            <Progress value={uploadProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Saving..." : slug ? "Update Program" : "Create Program"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/programs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;
