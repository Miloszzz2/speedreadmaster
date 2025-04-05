'use client'
import { useSpeedRead } from "@/hooks/useSpeedRead";
import SpeedControls from "./SpeedControls";
import ReadingSettings from "./ReadingSettings";
import TextSource from "./TextSource";
import Statistics from "./Statistics";
import TextGenerator from "./TextGenerator";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  speedReadState: ReturnType<typeof useSpeedRead>;
  onUploadClick: () => void;
}

export default function ControlPanel({ speedReadState, onUploadClick }: ControlPanelProps) {
  const [showTextGenerator, setShowTextGenerator] = useState(false);
  const [aiGenerationsLeft, setAiGenerationsLeft] = useState(10);

  const {
    currentWpm,
    isReading,
    setWpm,
    toggleReading,
    resetReading,
    currentFont,
    currentFontSize,
    chunkSize,
    setFont,
    setFontSize,
    setChunkSize,
    currentTextSource,
    customText,
    selectTextSource,
    updateCustomText,
    applyCustomText,
    setText,
    progress,
    timeRead,
    timeRemaining
  } = speedReadState;

  const handleTextGenerated = (text: string) => {
    setText(text);
    setShowTextGenerator(false);
    setAiGenerationsLeft(prev => Math.max(0, prev - 1));
  };

  const toggleTextGenerator = () => {
    if (aiGenerationsLeft > 0) {
      setShowTextGenerator(!showTextGenerator);
    }
  };

  return (
    <aside className="lg:col-span-3 space-y-6">
      <SpeedControls
        wpm={currentWpm}
        isReading={isReading}
        onWpmChange={setWpm}
        onPresetWpm={setWpm}
        onToggleReading={toggleReading}
        onResetReading={resetReading}
      />

      <ReadingSettings
        font={currentFont}
        fontSize={currentFontSize}
        chunkSize={chunkSize}
        highlightStyle={speedReadState.highlightStyle}
        onFontChange={setFont}
        onFontSizeChange={setFontSize}
        onChunkSizeChange={setChunkSize}
        onHighlightStyleChange={speedReadState.setHighlightStyle}
      />

      <div className="space-y-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg hover:text-neutral-100",
            aiGenerationsLeft === 0 && "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleTextGenerator}
          disabled={aiGenerationsLeft === 0}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {showTextGenerator ? "Hide Text Generator" : "Generate Text with AI"}
          {aiGenerationsLeft === 0 && " (No generations left)"}
        </Button>

        {showTextGenerator && (
          <TextGenerator onTextGenerated={handleTextGenerated} />
        )}

        <TextSource
          currentTextSource={currentTextSource}
          customText={customText}
          onTextSourceChange={selectTextSource}
          onCustomTextChange={updateCustomText}
          onApplyCustomText={applyCustomText}
          onUploadClick={onUploadClick}
        />
      </div>

      <Statistics
        wpm={currentWpm}
        progress={progress}
        wordsRead={speedReadState.currentPosition}
        totalWords={speedReadState.totalWords}
        timeRead={timeRead}
        timeRemaining={timeRemaining}
      />
    </aside>
  );
}