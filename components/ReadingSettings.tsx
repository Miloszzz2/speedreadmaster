'use client'
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  TextSelection,
  AlignJustify,
  Type
} from "lucide-react";

interface ReadingSettingsProps {
  font: string;
  fontSize: string;
  chunkSize: number;
  highlightStyle: string;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onChunkSizeChange: (size: number) => void;
  onHighlightStyleChange: (style: string) => void;
}

export default function ReadingSettings({
  font,
  fontSize,
  chunkSize,
  highlightStyle,
  onFontChange,
  onFontSizeChange,
  onChunkSizeChange,
  onHighlightStyleChange
}: ReadingSettingsProps) {
  const getFontSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      case 'x-large':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700">
      <h2 className="font-semibold text-lg mb-4">Display Settings</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="fontSelector" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Font Family
          </label>
          <Select value={font} onValueChange={onFontChange}>
            <SelectTrigger id="fontSelector">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="font-serif">Serif</SelectItem>
              <SelectItem value="font-sans">Sans-serif</SelectItem>
              <SelectItem value="font-mono">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Font Size
          </label>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                const sizes = ['small', 'medium', 'large', 'x-large'];
                const currentIndex = sizes.indexOf(fontSize);
                if (currentIndex > 0) {
                  onFontSizeChange(sizes[currentIndex - 1]);
                }
              }}
              disabled={fontSize === 'small'}
            >
              <div className="flex items-center"><Type className="h-4 w-4" /> -</div>
            </Button>
            <div className={`flex-1 text-center font-medium ${getFontSizeClass(fontSize)}`}>
              {fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                const sizes = ['small', 'medium', 'large', 'x-large'];
                const currentIndex = sizes.indexOf(fontSize);
                if (currentIndex < sizes.length - 1) {
                  onFontSizeChange(sizes[currentIndex + 1]);
                }
              }}
              disabled={fontSize === 'x-large'}
            >
              <div className="flex items-center"><Type className="h-4 w-4" /> +</div>
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Words per Chunk
          </label>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onChunkSizeChange(Math.max(1, chunkSize - 1))}
              disabled={chunkSize === 1}
            >
              <div className="flex items-center"><TextSelection className="h-4 w-4" /> -</div>
            </Button>
            <div className="flex-1 text-center font-medium">
              {chunkSize}
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onChunkSizeChange(Math.min(10, chunkSize + 1))}
              disabled={chunkSize === 10}
            >
              <div className="flex items-center"><TextSelection className="h-4 w-4" /> +</div>
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Highlight Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'classic', label: 'Classic', bg: 'bg-transparent border border-neutral-200 dark:border-neutral-700' },
              { value: 'red', label: 'Red', bg: 'bg-red-100 dark:bg-red-900' },
              { value: 'green', label: 'Green', bg: 'bg-green-100 dark:bg-green-900' },
              { value: 'blue', label: 'Blue', bg: 'bg-blue-100 dark:bg-blue-900' },
              { value: 'yellow', label: 'Yellow', bg: 'bg-yellow-100 dark:bg-yellow-900' },
              { value: 'purple', label: 'Purple', bg: 'bg-purple-100 dark:bg-purple-900' }
            ].map((style) => (
              <button
                key={style.value}
                onClick={() => onHighlightStyleChange(style.value)}
                className={`col-span-1 py-1 px-2 rounded transition-colors focus:outline-none focus:ring-0 hover:bg-transparent`}
              >
                <div className={`w-full h-6 rounded ${style.bg} flex items-center justify-center text-xs`}>
                  {style.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}