'use client'
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeedControlsProps {
  wpm: number;
  isReading: boolean;
  onWpmChange: (wpm: number) => void;
  onPresetWpm: (wpm: number) => void;
  onToggleReading: () => void;
  onResetReading: () => void;
}

export default function SpeedControls({
  wpm,
  isReading,
  onWpmChange,
  onPresetWpm,
  onToggleReading,
  onResetReading
}: SpeedControlsProps) {
  const handleSliderChange = (value: number[]) => {
    onWpmChange(value[0]);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700">
      <h2 className="font-semibold text-lg mb-4">Reading Speed</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="wpmSlider" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Words per minute: <span className="font-bold text-primary-700 dark:text-primary-400">{wpm}</span>
          </label>
          <Slider
            id="wpmSlider"
            min={100}
            max={800}
            step={10}
            value={[wpm]}
            onValueChange={handleSliderChange}
            className="w-full mt-4"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onWpmChange(Math.max(100, wpm - 50))}
            disabled={wpm === 100}
          >
            <div className="flex items-center">-</div>
          </Button>
          <div className="flex-1 text-center font-medium">
            {wpm}
          </div>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onWpmChange(Math.min(800, wpm + 50))}
            disabled={wpm === 800}
          >
            <div className="flex items-center">+</div>
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="default"
            className="flex items-center justify-center w-1/2"
            onClick={onToggleReading}
          >
            {isReading ? (
              <>
                <Pause className="mr-1 h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="mr-1 h-4 w-4" />
                <span>Start</span>
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="flex items-center justify-center w-5/12"
            onClick={onResetReading}
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            <span>Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
