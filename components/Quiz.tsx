'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizProps {
   onComplete: (score: number) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [answers, setAnswers] = useState<number[]>([]);

   // Sample questions with options
   const questions = [
      {
         question: "What was the main topic of the text?",
         options: [
            "The history of speed reading",
            "The benefits of regular exercise",
            "The impact of technology on society",
            "The importance of sleep"
         ],
         correctAnswer: 0
      },
      {
         question: "Which technique was mentioned as most effective?",
         options: [
            "Reading word by word",
            "Using a pointer",
            "Subvocalization",
            "Reading backwards"
         ],
         correctAnswer: 1
      },
      {
         question: "What was the recommended reading speed?",
         options: [
            "100-200 WPM",
            "200-300 WPM",
            "300-400 WPM",
            "400-500 WPM"
         ],
         correctAnswer: 2
      }
   ];

   const handleAnswerSelect = (value: string) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = parseInt(value);
      setAnswers(newAnswers);
   };

   const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
         setCurrentQuestion(currentQuestion + 1);
      } else {
         const score = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
         onComplete(score);
      }
   };

   const handlePrevious = () => {
      if (currentQuestion > 0) {
         setCurrentQuestion(currentQuestion - 1);
      }
   };

   return (
      <Card className="w-full bg-white dark:bg-neutral-800 border-secondary">
         <CardHeader>
            <CardTitle>Reading Comprehension Quiz</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-6">
               <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                     Question {currentQuestion + 1} of {questions.length}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                     {questions[currentQuestion].question}
                  </p>
               </div>

               <RadioGroup
                  value={answers[currentQuestion]?.toString()}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
               >
                  {questions[currentQuestion].options.map((option, index) => (
                     <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem
                           value={index.toString()}
                           id={`option-${index}`}
                           className="h-4 w-4 border-2 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                        />
                        <Label
                           htmlFor={`option-${index}`}
                           className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                           {option}
                        </Label>
                     </div>
                  ))}
               </RadioGroup>

               <div className="flex justify-between pt-4">
                  <Button
                     variant="outline"
                     onClick={handlePrevious}
                     disabled={currentQuestion === 0}
                  >
                     Previous
                  </Button>
                  <Button
                     onClick={handleNext}
                     disabled={answers[currentQuestion] === undefined}
                  >
                     {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}