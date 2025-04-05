'use client'
import { motion } from "framer-motion";
import { useSpeedRead } from "@/hooks/useSpeedRead";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadingAreaProps {
  speedReadState: ReturnType<typeof useSpeedRead>;
  font: string;
  fontSize: string;
}

export default function ReadingArea({ speedReadState, font, fontSize }: ReadingAreaProps) {
  const {
    isReading,
    words,
    currentPosition,
    totalWords,
    chunkSize,
    readingAreaRef,
    textPreviewRef,
    startReading,
    toggleReading,
    previousChunk,
    nextChunk,
    decreaseSpeed,
    increaseSpeed,
    progress,
    currentWpm,
    isFullscreen,
    toggleFullscreen,
    resetReading,
    highlightStyle
  } = speedReadState;

  // Add state for AI generations counter
  const [aiGenerationsLeft, setAiGenerationsLeft] = useState(10);

  // Fixed number of words to display in the reading area
  const totalVisibleWords = 24; // Increased for smoother scrolling display
  const [linePosition, setLinePosition] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineHeight = 40; // Line height in pixels

  // Get the visible words for rendering with additional context
  const getVisibleWords = () => {
    if (words.length === 0) return [];

    // Always show the same set of words from the start
    const endIdx = Math.min(words.length, totalVisibleWords);

    // Slicing the words to show a fixed set
    return words.slice(0, endIdx).map((word, idx) => {
      const isHighlighted = idx >= currentPosition && idx < currentPosition + chunkSize;

      return {
        word,
        isHighlighted,
        key: `${idx}-${word}`,
      };
    });
  };

  const visibleWords = getVisibleWords();

  // Remove the line position update effect since we're not moving words anymore
  useEffect(() => {
    if (words.length === 0) return;

    // Calculate vertical scroll amount based on current reading position
    const linesTotal = Math.ceil(words.length / chunkSize);
    const currentLine = Math.floor(currentPosition / chunkSize);
    const scrollPosition = currentLine * lineHeight;
  }, [currentPosition, chunkSize, words.length, currentWpm]);

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

  const [currentChunk, setCurrentChunk] = useState<number[]>([]);

  // Split text into chunks based on chunkSize
  useEffect(() => {
    if (words.length > 0) {
      const start = currentPosition;
      const end = Math.min(start + chunkSize, words.length);
      setCurrentChunk(Array.from({ length: end - start }, (_, i) => start + i));
    }
  }, [currentPosition, chunkSize, words.length]);

  const getHighlightClass = (style: string) => {
    switch (style) {
      case 'classic':
        return 'text-primary font-semibold ';
      case 'red':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 font-semibold px-0 ';
      case 'green':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 font-semibold px-0 ';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold px-0 ';
      case 'yellow':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 font-semibold px-0 ';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 font-semibold px-0 ';
      default:
        return 'text-primary font-semibold ';
    }
  };

  return (
    <div className="lg:col-span-9 space-y-6">
      <div
        ref={containerRef}
        className={cn(
          "relative p-8 rounded-lg bg-white dark:bg-neutral-800 border border-secondary transition-all duration-300 ease-in-out",
          isFullscreen ? "fixed inset-0 z-50 flex flex-col m-0 p-12 rounded-none border-0" : "relative"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Reading Area</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={toggleReading}
              className="flex items-center gap-2"
            >
              {isReading ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Start</span>
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={resetReading}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className={cn(
          "prose dark:prose-invert max-w-none w-full overflow-y-auto text-justify ",
          font,
          getFontSizeClass(fontSize)
        )}>
          {words.map((word, index) => {
            const isStartOfChunk = currentChunk.includes(index) && !currentChunk.includes(index - 1);
            const isEndOfChunk = currentChunk.includes(index) && !currentChunk.includes(index + 1);

            return (
              <span key={index}> <span

                className={cn(
                  "transition-colors duration-200 relative",
                  currentChunk.includes(index)
                    ? cn(
                      getHighlightClass(highlightStyle),
                      isStartOfChunk && "rounded-l-sm",
                      isEndOfChunk && "rounded-r-sm",
                      highlightStyle !== 'classic' && "mx-0"
                    )
                    : "text-neutral-600 dark:text-neutral-300"
                )}
              >
                {word}{!isEndOfChunk && ' '}
              </span>{isEndOfChunk && ' '}</span>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700 mt-6 lg:hidden">
        <h2 className="font-semibold text-lg mb-2">Reading Progress</h2>

        <div className="flex justify-between mb-2 text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            Words read:
          </span>
          <span className="font-medium">
            {currentPosition} / {totalWords}
          </span>
        </div>

        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-4">
          <div
            className="reading-progress-bar h-full bg-primary-500 dark:bg-primary-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Current speed
            </div>
            <div className="font-medium">{speedReadState.currentWpm} WPM</div>
          </div>
          <div>
            <div className="text-neutral-600 dark:text-neutral-400">
              Time remaining
            </div>
            <div className="font-medium">{speedReadState.timeRemaining}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
