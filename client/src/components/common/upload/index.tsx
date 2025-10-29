"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

interface ImageUploadProps {
  selectedImages: File[];
  handleImagesSelect: (files: File[]) => void;
  accept: HTMLInputElement["accept"];
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

export const ImageUpload = ({
  accept,
  selectedImages,
  handleImagesSelect,
  maxFiles = 5,
  maxFileSize = 3,
}: ImageUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const dragCounter = useRef(0);

  // Generate preview URLs when selectedImages change
  useEffect(() => {
    // Cleanup old URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    // Generate new URLs
    const newUrls = selectedImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // Cleanup on unmount
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages]);

  const validateFiles = (files: File[]): File[] => {
    setError(null);
    const validFiles: File[] = [];

    // Check if adding these files would exceed max count
    if (selectedImages.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images`);
      return [];
    }

    for (const file of files) {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`File "${file.name}" exceeds ${maxFileSize}MB`);
        continue;
      }

      // Check file type
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        setError(`File "${file.name}" must be PNG or JPG`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const handleImageChange = () => {
    if (!imageRef.current) return;
    const files = imageRef.current.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = validateFiles(fileArray);

    if (validFiles.length > 0) {
      handleImagesSelect([...selectedImages, ...validFiles]);
    }

    // Reset input to allow selecting the same file again
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = validateFiles(fileArray);

    if (validFiles.length > 0) {
      handleImagesSelect([...selectedImages, ...validFiles]);
    }

    e.dataTransfer.clearData();
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setIsDragging(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    handleImagesSelect(newImages);
    setError(null);
  };

  return (
    <div className="w-full grid grid-cols-4 gap-3">
      {selectedImages.length > 0 && (
        <>
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group"
            >
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center truncate">
                {selectedImages[index]?.name || ""}
              </div>
            </div>
          ))}
        </>
      )}

      {selectedImages.length < maxFiles && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => imageRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") imageRef.current?.click();
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed text-gray-500 cursor-pointer rounded-md transition-colors
          ${error ? "border-red-500" : isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:bg-gray-50"}
        `}
        >
          <Plus size={32} />
          <span className="text-xs text-center">
            Click to upload or drag and drop
          </span>
          {selectedImages.length > 0 && (
            <span className="text-sm text-gray-600 mt-2">
              {selectedImages.length} / {maxFiles} images selected
            </span>
          )}
          {error && (
            <span className="text-sm font-medium text-red-500 mt-1">
              {error}
            </span>
          )}
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
            accept={accept}
            multiple
          />
        </div>
      )}
    </div>
  );
};
