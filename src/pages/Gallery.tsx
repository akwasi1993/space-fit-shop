import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Video, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
}

const Gallery = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [fileToDelete, setFileToDelete] = useState<UploadedFile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    loadUserFiles(user.id);
  };

  const loadUserFiles = async (userId: string) => {
    try {
      const { data: files, error } = await supabase.storage
        .from('user-uploads')
        .list(userId, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const filesWithUrls: UploadedFile[] = files.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('user-uploads')
          .getPublicUrl(`${userId}/${file.name}`);

        return {
          id: file.id,
          name: file.name,
          url: publicUrl,
          type: (file.metadata?.mimetype?.startsWith('image/') ? 'image' : 'video') as 'image' | 'video',
          size: file.metadata?.size || 0
        };
      });

      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error",
        description: "Failed to load your files",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (file: UploadedFile) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.storage
        .from('user-uploads')
        .remove([`${user.id}/${file.name}`]);

      if (error) throw error;

      setFiles(prev => prev.filter(f => f.id !== file.id));
      toast({
        title: "Deleted",
        description: "File deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive"
      });
    } finally {
      setFileToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Gallery</h1>
          <p className="text-muted-foreground">View all your uploaded photos and videos</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : files.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No files yet</h2>
            <p className="text-muted-foreground mb-6">Upload some photos or videos to get started</p>
            <Button onClick={() => navigate("/upload")}>Go to Upload</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <Card
                key={file.id}
                className="group relative aspect-square overflow-hidden cursor-pointer transition-smooth hover:shadow-lg"
                onClick={() => setSelectedFile(file)}
              >
                {file.type === 'image' ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                ) : (
                  <div className="relative w-full h-full bg-muted flex items-center justify-center">
                    <Video className="w-12 h-12 text-muted-foreground" />
                    <video
                      src={file.url}
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                      muted
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileToDelete(file);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={() => setSelectedFile(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          {selectedFile && (
            <div className="flex items-center justify-center w-full h-full p-4">
              {selectedFile.type === 'image' ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={selectedFile.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[90vh]"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{fileToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => fileToDelete && handleDelete(fileToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Gallery;
