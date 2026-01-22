"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { phases } from "@/content/phases"
import { BookOpen, Clock, CheckCircle, Circle, PlayCircle, Trophy, Target } from "lucide-react"

interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
}

export default function DashboardPage() {
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sdgs-pro-course-progress")
    if (saved) {
      setProgress(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  const totalLessons = phases.reduce((sum, phase) => sum + phase.lessons.length, 0)
  const completedLessons = progress.filter(p => p.completed).length
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  const getPhaseProgress = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId)
    if (!phase) return { completed: 0, total: 0, percent: 0 }

    const completed = phase.lessons.filter(lesson =>
      progress.some(p => p.lessonId === lesson.id && p.completed)
    ).length

    return {
      completed,
      total: phase.lessons.length,
      percent: phase.lessons.length > 0 ? (completed / phase.lessons.length) * 100 : 0
    }
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p => p.lessonId === lessonId && p.completed)
  }

  const getNextLesson = () => {
    for (const phase of phases) {
      for (const lesson of phase.lessons) {
        if (!isLessonCompleted(lesson.id)) {
          return { phase, lesson }
        }
      }
    }
    return null
  }

  const nextLesson = getNextLesson()

  if (!isLoaded) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="mt-2 text-muted-foreground">
          学習の進捗状況を確認しましょう
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              全体の進捗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <div className="text-2xl font-bold">{Math.round(progressPercent)}%</div>
                <Progress value={progressPercent} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              完了レッスン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-teal-500" />
              <div>
                <div className="text-2xl font-bold">
                  {completedLessons} / {totalLessons}
                </div>
                <div className="text-sm text-muted-foreground">レッスン完了</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              学習状況
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">
                  {completedLessons === totalLessons && totalLessons > 0 ? "修了!" : "学習中"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {completedLessons === 0 ? "さあ始めよう" :
                   completedLessons === totalLessons ? "おめでとうございます" : "頑張ってます"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Lesson CTA */}
      {nextLesson && (
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="secondary">次のレッスン</Badge>
                <CardTitle className="mt-2">
                  Phase {nextLesson.phase.id} - Lesson {nextLesson.lesson.number}: {nextLesson.lesson.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {nextLesson.lesson.description}
                </CardDescription>
              </div>
              <Button asChild>
                <Link href={`/lessons/${nextLesson.lesson.id}`}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  学習を始める
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Phase Progress */}
      <h2 className="text-xl font-bold mb-4">フェーズ別進捗</h2>
      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseProgress = getPhaseProgress(phase.id)

          return (
            <Card key={phase.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={phaseProgress.percent === 100 ? "default" : "outline"}>
                      Phase {phase.id}
                    </Badge>
                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {phase.duration}
                  </div>
                </div>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{phaseProgress.completed} / {phaseProgress.total} レッスン完了</span>
                    <span>{Math.round(phaseProgress.percent)}%</span>
                  </div>
                  <Progress value={phaseProgress.percent} />
                </div>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {phase.lessons.map((lesson) => {
                    const completed = isLessonCompleted(lesson.id)

                    return (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.id}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        {completed ? (
                          <CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span className={`text-sm ${completed ? "text-muted-foreground line-through" : ""}`}>
                          Lesson {lesson.number}: {lesson.title}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
