"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, ArrowRight, Sparkles } from "lucide-react"
import { CourseLevel, LEVEL_CONFIGS } from "@/content/types"

interface LevelSelectorProps {
  onSelectLevel: (level: CourseLevel) => void
  currentLevel?: CourseLevel
}

export function LevelSelector({ onSelectLevel, currentLevel }: LevelSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(currentLevel || null)

  const handleSelect = (level: CourseLevel) => {
    setSelectedLevel(level)
  }

  const handleConfirm = () => {
    if (selectedLevel) {
      onSelectLevel(selectedLevel)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">あなたに合ったコースを選んでください</h2>
        <p className="mt-2 text-muted-foreground">
          どのレベルを選んでも、途中で変更できます
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(LEVEL_CONFIGS) as CourseLevel[]).map((level) => {
          const config = LEVEL_CONFIGS[level]
          const isSelected = selectedLevel === level

          return (
            <Card
              key={level}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? "ring-2 ring-primary border-primary"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleSelect(level)}
            >
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{config.icon}</div>
                <CardTitle className="text-xl">{config.nameJa}</CardTitle>
                <CardDescription className="text-xs">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{config.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{config.lessonCount}</span>
                    <span className="text-muted-foreground">レッスン</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {config.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Users className="h-3 w-3" />
                    <span>こんな方におすすめ</span>
                  </div>
                  <div className="space-y-1">
                    {config.targetAudience.map((audience, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {audience}
                      </div>
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <div className="pt-2">
                    <Badge className="w-full justify-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      選択中
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedLevel && (
        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleConfirm}>
            {LEVEL_CONFIGS[selectedLevel].nameJa}コースで始める
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>迷ったら「標準」がおすすめです。いつでもレベルを変更できます。</p>
      </div>
    </div>
  )
}
