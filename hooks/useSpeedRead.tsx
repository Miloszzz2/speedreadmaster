import { useState, useEffect, useRef, useCallback } from 'react';
import { sampleTexts } from '@/lib/sample-texts';
import { useToast } from "@/hooks/use-toast";

export function useSpeedRead() {
  const { toast } = useToast();

  // Settings state
  const [currentWpm, setCurrentWpm] = useState(300);
  const [currentFont, setCurrentFont] = useState('font-sans');
  const [currentFontSize, setCurrentFontSize] = useState('medium');
  const [chunkSize, setChunkSize] = useState(4);
  const [currentTextSource, setCurrentTextSource] = useState('sample1');
  const [customText, setCustomText] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState('classic');

  // Reading state
  const [isReading, setIsReading] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalReadTime, setTotalReadTime] = useState(0);
  const readingInterval = useRef<NodeJS.Timeout | null>(null);
  const readingAreaRef = useRef<HTMLDivElement>(null);
  const textPreviewRef = useRef<HTMLDivElement>(null);

  // Calculate time read and time remaining
  const secondsRead = totalReadTime / 1000;
  const wordsPerSecond = currentWpm / 60;
  const secondsRemaining = Math.max(0, (words.length - currentPosition) / wordsPerSecond);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeRead = formatTime(secondsRead);
  const timeRemaining = formatTime(secondsRemaining);

  // Calculate progress
  const totalWords = words.length;
  const progress = totalWords > 0 ? (currentPosition / totalWords) * 100 : 0;

  // Initialize with first sample text
  useEffect(() => {
    setWords(sampleTexts.sample1.split(/\s+/).filter(word => word.length > 0));
    setCurrentPosition(0);
    setTotalReadTime(0);
  }, []);

  useEffect(() => {
    if (isReading) {
      // Calculate time per chunk instead of per word
      // We divide by the chunk size to get the correct reading speed
      const msPerChunk = (60000 / currentWpm) * chunkSize;

      if (readingInterval.current) {
        clearInterval(readingInterval.current);
      }

      setStartTime(Date.now());

      readingInterval.current = setInterval(() => {
        setCurrentPosition(prev => {
          if (prev >= words.length - chunkSize) {
            setIsReading(false);
            clearInterval(readingInterval.current!);
            return prev;
          }
          // Move forward by chunk size, not just 1 word
          return prev + chunkSize;
        });
      }, msPerChunk);
    } else {
      if (readingInterval.current) {
        clearInterval(readingInterval.current);

        // Update total read time
        if (startTime) {
          setTotalReadTime(prev => prev + (Date.now() - startTime));
          setStartTime(null);
        }
      }
    }

    return () => {
      if (readingInterval.current) {
        clearInterval(readingInterval.current);
      }
    };
  }, [isReading, currentWpm, words.length, chunkSize]);

  // Process text function
  const processText = useCallback((text: string) => {
    const processedWords = text.split(/\s+/).filter(word => word.length > 0);
    setWords(processedWords);
    setCurrentPosition(0);
    setTotalReadTime(0);
  }, []);

  // Record activity for statistics

  // Load sample text
  const loadSampleText = useCallback(() => {
    const text = sampleTexts[currentTextSource] || sampleTexts.sample1;
    processText(text);
  }, [currentTextSource, processText]);

  // Text source handlers
  const selectTextSource = useCallback((source: string) => {
    setCurrentTextSource(source);
    if (source in sampleTexts) {
      setWords(sampleTexts[source as keyof typeof sampleTexts].split(/\s+/).filter(word => word.length > 0));
      setCurrentPosition(0);
      setTotalReadTime(0);
    }
  }, [processText]);

  const updateCustomText = useCallback((text: string) => {
    setCustomText(text);
  }, []);

  const applyCustomText = useCallback(() => {
    if (customText.trim()) {
      processText(customText);
    }
  }, [customText, processText]);

  const processUploadedFile = useCallback((text: string) => {
    setCurrentTextSource('custom');
    setCustomText(text);
    processText(text);
  }, [processText]);

  // Reading control handlers
  const startReading = useCallback(() => {
    setIsReading(true);
  }, []);

  const toggleReading = useCallback(() => {
    setIsReading(prev => {
      if (!prev && currentPosition >= words.length - chunkSize) {
        // If we're starting reading and we're at the end, reset the position
        setCurrentPosition(0);
        setTotalReadTime(0);
        return true;
      }
      return !prev;
    });
  }, [currentPosition, words.length, chunkSize]);

  const pauseReading = useCallback(() => {
    setIsReading(false);
  }, []);

  const resetReading = useCallback(() => {
    pauseReading();
    setCurrentPosition(0);
    setTotalReadTime(0);
  }, [pauseReading]);

  const previousChunk = useCallback(() => {
    setCurrentPosition(prev => Math.max(0, prev - chunkSize));
  }, [chunkSize]);

  const nextChunk = useCallback(() => {
    setCurrentPosition(prev => Math.min(words.length - chunkSize, prev + chunkSize));
  }, [words.length, chunkSize]);

  // Speed handlers
  const setWpm = useCallback((wpm: number) => {
    setCurrentWpm(wpm);
  }, []);

  const decreaseSpeed = useCallback(() => {
    setCurrentWpm(prev => Math.max(100, prev - 50));
  }, []);

  const increaseSpeed = useCallback(() => {
    setCurrentWpm(prev => Math.min(800, prev + 50));
  }, []);

  // Font handlers
  const setFont = useCallback((font: string) => {
    setCurrentFont(font);
  }, []);

  const setFontSize = useCallback((size: string) => {
    setCurrentFontSize(size);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return {
    // Reading state
    isReading,
    words,
    currentPosition,
    totalWords,
    progress,
    timeRead,
    timeRemaining,

    // Settings
    currentWpm,
    currentFont,
    currentFontSize,
    chunkSize,
    currentTextSource,
    customText,
    isFullscreen,
    highlightStyle,

    // Refs
    readingAreaRef,
    textPreviewRef,

    // Text handlers
    setText: processText,
    loadSampleText,
    selectTextSource,
    updateCustomText,
    applyCustomText,
    processUploadedFile,

    // Reading control handlers
    startReading,
    toggleReading,
    pauseReading,
    resetReading,
    previousChunk,
    nextChunk,

    // Setting handlers
    setWpm,
    decreaseSpeed,
    increaseSpeed,
    setFont,
    setFontSize,
    setChunkSize,

    toggleFullscreen,
    setHighlightStyle,
  };
}
