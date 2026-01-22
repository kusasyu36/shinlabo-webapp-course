"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quiz as QuizType } from "@/content/types"
import { CheckCircle, XCircle, HelpCircle, RefreshCw } from "lucide-react"

interface QuizProps {
  quiz: QuizType
}

export function Quiz({ quiz }: QuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isCorrect = selectedIndex === quiz.correctIndex

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setSelectedIndex(null)
    setIsSubmitted(false)
  }

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="h-5 w-5 text-primary" />
          確認クイズ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{quiz.question}</p>

        <div className="space-y-2">
          {quiz.options.map((option, index) => {
            const isSelected = selectedIndex === index
            const isCorrectOption = index === quiz.correctIndex

            let optionStyle = "border-2 p-3 rounded-lg cursor-pointer transition-all"

            if (!isSubmitted) {
              optionStyle += isSelected
                ? " border-primary bg-primary/10"
                : " border-muted hover:border-primary/50"
            } else {
              if (isCorrectOption) {
                optionStyle += " border-green-500 bg-green-500/10"
              } else if (isSelected && !isCorrectOption) {
                optionStyle += " border-red-500 bg-red-500/10"
              } else {
                optionStyle += " border-muted opacity-50"
              }
            }

            return (
              <button
                key={index}
                className={`w-full text-left ${optionStyle}`}
                onClick={() => !isSubmitted && setSelectedIndex(index)}
                disabled={isSubmitted}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </span>
                  {isSubmitted && isCorrectOption && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {isSubmitted && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="w-full"
          >
            回答を確認
          </Button>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${
                isCorrect
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      正解です!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-red-700 dark:text-red-400">
                      不正解です
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
            </div>

            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              もう一度挑戦
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
