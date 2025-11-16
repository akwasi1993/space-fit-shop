import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, X, Image as ImageIcon, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

const Upload = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error("Please sign in to upload files");
        navigate("/auth");
      } else {
        setUser(session.user);
        loadUserFiles(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadUserFiles = async (userId: string) => {
    const { data, error } = await supabase.storage
      .from('user-uploads')
      .list(userId, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error("Error loading files:", error);
      return;
    }

    if (data) {
      const filesWithUrls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('user-uploads')
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id,
          name: file.name,
          url: publicUrl,
          type: file.metadata?.mimetype || '',
          size: file.metadata?.size || 0
        };
      });
      setUploadedFiles(filesWithUrls);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !user) return;

    setIsUploading(true);
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type`);
        continue;
      }

      if (file.size > maxSize) {
        toast.error(`${file.name} is too large (max 50MB)`);
        continue;
      }

      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file);

      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error("Upload error:", error);
      } else {
        toast.success(`${file.name} uploaded successfully!`);
      }
    }

    setIsUploading(false);
    loadUserFiles(user.id);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  }, [user]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(e.target.files);
  };

  const handleDelete = async (file: UploadedFile) => {
    if (!user) return;

    const filePath = `${user.id}/${file.name.split('-').slice(1).join('-')}`;
    
    const { error } = await supabase.storage
      .from('user-uploads')
      .remove([`${user.id}/${file.name}`]);

    if (error) {
      toast.error("Failed to delete file");
      console.error("Delete error:", error);
    } else {
      toast.success("File deleted");
      setUploadedFiles(files => files.filter(f => f.id !== file.id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Upload Photos & Videos</h1>
          <p className="text-muted-foreground text-lg">
            Share your fitness journey with the community
          </p>
        </div>

        {/* Upload Area */}
        <Card
          className={`relative border-2 border-dashed transition-smooth p-12 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10">
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              ) : (
                <UploadIcon className="h-12 w-12 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isUploading ? "Uploading..." : "Drag & drop your files here"}
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports: JPG, PNG, GIF, WEBP, MP4, MOV, WEBM (max 50MB)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/webm"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button variant="default" disabled={isUploading} className="pointer-events-none">
              Select Files
            </Button>
          </div>
        </Card>

        {/* Uploaded Files Grid */}
        {uploadedFiles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Your Uploads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="group relative overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Video className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth"
                      onClick={() => handleDelete(file)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium truncate mb-1">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
