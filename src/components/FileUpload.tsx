import { Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize: number;
  preview?: string;
  onClear?: () => void;
  label: string;
  helperText?: string;
}

export const FileUpload = ({
  onFileSelect,
  accept,
  maxSize,
  preview,
  onClear,
  label,
  helperText,
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size <= maxSize) {
        onFileSelect(file);
      } else {
        alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= maxSize) {
        onFileSelect(file);
      } else {
        alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {preview ? (
        <div className="relative">
          {accept.includes("image") ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <video
              src={preview}
              className="w-full h-48 object-cover rounded-lg"
              controls
            />
          )}
          {onClear && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-1">
            Drop file here or click to upload
          </p>
          {helperText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};
