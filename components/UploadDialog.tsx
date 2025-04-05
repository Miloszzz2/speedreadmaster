import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadDialog({ isOpen, onClose, onUpload }: UploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Text File</DialogTitle>
        </DialogHeader>
        
        <div 
          className="p-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-neutral-400 dark:text-neutral-500 mx-auto mb-2" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Drag and drop a text file here, or click to select
          </p>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </Button>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept=".txt"
            onChange={handleFileChange}
          />
          
          {selectedFile && (
            <div className="mt-4 p-2 bg-neutral-100 dark:bg-neutral-700 rounded flex items-center justify-between">
              <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile}
          >
            Upload and Process
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
