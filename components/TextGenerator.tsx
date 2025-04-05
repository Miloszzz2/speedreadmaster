'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextGeneratorProps {
   onTextGenerated: (text: string) => void;
}

export default function TextGenerator({ onTextGenerated }: TextGeneratorProps) {
   const [topic, setTopic] = useState('');
   const [isGenerating, setIsGenerating] = useState(false);
   const { toast } = useToast();

   const handleGenerate = async () => {
      if (!topic.trim()) {
         toast({
            title: "Topic required",
            description: "Please enter a topic to generate text about.",
            variant: "destructive",
         });
         return;
      }

      setIsGenerating(true);

   };

   return (
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xs p-4 border border-neutral-200 dark:border-neutral-700">
         <h2 className="font-semibold text-lg mb-4">Generate Text with AI</h2>

         <div className="space-y-4">
            <div>
               <label htmlFor="topic" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Enter a topic
               </label>
               <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Climate change, Artificial Intelligence, History of Rome"
                  className="w-full"
               />
            </div>

            <Button
               onClick={handleGenerate}
               disabled={isGenerating}
               className="w-full"
            >
               {isGenerating ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Generating...
                  </>
               ) : (
                  'Generate Text'
               )}
            </Button>

            <div className="text-sm text-neutral-500 dark:text-neutral-400">
               <p>Enter a topic and our AI will generate a unique text for you to practice speed reading.</p>
            </div>
         </div>
      </div>
   );
} 