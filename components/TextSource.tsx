import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface TextSourceProps {
  currentTextSource: string;
  customText: string;
  onTextSourceChange: (source: string) => void;
  onCustomTextChange: (text: string) => void;
  onApplyCustomText: () => void;
  onUploadClick: () => void;
}

export default function TextSource({
  currentTextSource,
  customText,
  onTextSourceChange,
  onCustomTextChange,
  onApplyCustomText,
  onUploadClick
}: TextSourceProps) {
  const [showCustomTextEntry, setShowCustomTextEntry] = useState(currentTextSource === 'custom');

  const handleTextSourceChange = (value: string) => {
    onTextSourceChange(value);
    setShowCustomTextEntry(value === 'custom');
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700">
      <h2 className="font-semibold text-lg mb-4">Text Source</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="textSourceSelector" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Choose Text
          </label>
          <Select value={currentTextSource} onValueChange={handleTextSourceChange}>
            <SelectTrigger id="textSourceSelector">
              <SelectValue placeholder="Select a text source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sample1">The Science of Learning</SelectItem>
              <SelectItem value="sample2">Introduction to Psychology</SelectItem>
              <SelectItem value="sample3">The History of Computing</SelectItem>
              <SelectItem value="sample4">Miłość</SelectItem>
              <SelectItem value="custom">Paste Custom Text</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showCustomTextEntry && (
          <div>
            <label htmlFor="customText" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Your Text
            </label>
            <Textarea
              id="customText"
              rows={4}
              value={customText}
              onChange={(e) => onCustomTextChange(e.target.value)}
              className="resize-none"
              placeholder="Paste or type your text here..."
            />
            <Button
              className="w-full mt-3"
              onClick={onApplyCustomText}
              disabled={!customText.trim()}
            >
              Apply Text
            </Button>
          </div>
        )}

        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 text-center">
          <Button
            variant="ghost"
            className="inline-flex items-center justify-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
            onClick={onUploadClick}
          >
            <Upload className="mr-1 h-4 w-4" />
            <span>Upload Text File</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
