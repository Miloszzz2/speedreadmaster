'use client'
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ReadingArea from "./ReadingArea";
import ControlPanel from "./ControlPanel";
import UploadDialog from "./UploadDialog";
import Quiz from "./Quiz";
import { useSpeedRead } from "@/hooks/useSpeedRead";
import { useToast } from "@/hooks/use-toast";

export default function SpeedReadApp() {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const speedReadState = useSpeedRead();
  const {
    isReading,
    currentWpm,
    currentPosition,
    totalWords,
    setText,
    loadSampleText,
    applyCustomText,
    processUploadedFile,
    currentFont,
    currentFontSize
  } = speedReadState;

  // Handle file uploads
  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      processUploadedFile(text);
      setUploadDialogOpen(false);
      toast({
        title: "File uploaded successfully",
        description: `Loaded text with ${text.split(/\s+/).filter(w => w.length > 0).length} words.`,
      });
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: "Could not read the text file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    toast({
      title: "Quiz Completed!",
      description: `Your score: ${score} out of 3`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 py-6 grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ControlPanel
            speedReadState={speedReadState}
            onUploadClick={() => setUploadDialogOpen(true)}
          />
          <div className="lg:col-span-9 space-y-6">
            <ReadingArea
              speedReadState={speedReadState}
              font={currentFont}
              fontSize={currentFontSize}
            />

            <Quiz onComplete={handleQuizComplete} />

          </div>
        </div>
      </main>

      <Footer />

      <UploadDialog
        isOpen={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
}