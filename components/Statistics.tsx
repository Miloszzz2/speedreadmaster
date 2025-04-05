'use client'
import { Progress } from "@/components/ui/progress";

interface StatisticsProps {
  wpm: number;
  progress: number;
  wordsRead: number;
  totalWords: number;
  timeRead: string;
  timeRemaining: string;
}

export default function Statistics({
  wpm,
  progress,
  wordsRead,
  totalWords,
  timeRead,
  timeRemaining
}: StatisticsProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700 lg:block hidden">
      <h2 className="font-semibold text-lg mb-4">Statistics</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Current speed:</span>
          <span className="font-medium">{wpm} WPM</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Completion:</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Words read:</span>
          <span className="font-medium">{wordsRead} / {totalWords}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Time read:</span>
          <span className="font-medium">{timeRead}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Time remaining:</span>
          <span className="font-medium">{timeRemaining}</span>
        </div>

        <div className="pt-2">
          <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">Progress</div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </div>
  );
}
