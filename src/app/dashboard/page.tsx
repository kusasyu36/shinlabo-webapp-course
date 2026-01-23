"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LevelSelector } from "@/components/level/LevelSelector"
import { getPhasesByLevel } from "@/content/phases/byLevel"
import { CourseLevel, LEVEL_CONFIGS } from "@/content/types"
import { BookOpen, Clock, CheckCircle, Circle, PlayCircle, Trophy, Target, Settings, ArrowRight } from "lucide-react"

interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
}

interface UserProgress {
  selectedLevel: CourseLevel | null
  levelSelectedAt: string | null
  lessons: LessonProgress[]
}

const STORAGE_KEY = "webapp-course-progress"

export default function DashboardPage() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    selectedLevel: null,
    levelSelectedAt: null,
    lessons: []
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLevelSelector, setShowLevelSelector] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setUserProgress(parsed)
    }
    setIsLoaded(true)
  }, [])

  const saveProgress = (progress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    setUserProgress(progress)
  }

  const handleSelectLevel = (level: CourseLevel) => {
    const newProgress: UserProgress = {
      ...userProgress,
      selectedLevel: level,
      levelSelectedAt: new Date().toISOString(),
      lessons: [] // Reset lessons when changing level
    }
    saveProgress(newProgress)
    setShowLevelSelector(false)
  }

  const handleChangeLevel = () => {
    setShowLevelSelector(true)
  }

  // Show level selector if no level selected or if requested
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

  if (!userProgress.selectedLevel || showLevelSelector) {
    return (
      <div className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">AIでWebアプリを作る実践講座</h1>
          <p className="mt-2 text-muted-foreground">
            あなたのペースに合わせて学習できます
          </p>
        </div>
        <LevelSelector
          onSelectLevel={handleSelectLevel}
          currentLevel={userProgress.selectedLevel || undefined}
        />
      </div>
    )
  }

  const phases = getPhasesByLevel(userProgress.selectedLevel)
  const levelConfig = LEVEL_CONFIGS[userProgress.selectedLevel]
  const totalLessons = phases.reduce((sum, phase) => sum + phase.lessons.length, 0)
  const completedLessons = userProgress.lessons.filter(p => p.completed).length
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  const getPhaseProgress = (phaseId: number) => {
    const phase = phases.find(p => p.id === phaseId)
    if (!phase) return { completed: 0, total: 0, percent: 0 }

    const completed = phase.lessons.filter(lesson =>
      userProgress.lessons.some(p => p.lessonId === lesson.id && p.completed)
    ).length

    return {
      completed,
      total: phase.lessons.length,
      percent: phase.lessons.length > 0 ? (completed / phase.lessons.length) * 100 : 0
    }
  }

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.lessons.some(p => p.lessonId === lessonId && p.completed)
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

  return (
    <div className="container py-8">
      {/* Header with Level Badge */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {levelConfig.icon} {levelConfig.nameJa}コース
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleChangeLevel}>
              <Settings className="h-4 w-4 mr-1" />
              レベル変更
            </Button>
          </div>
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="mt-2 text-muted-foreground">
            {levelConfig.description}
          </p>
        </div>
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <Badge variant="secondary">次のレッスン</Badge>
                <CardTitle className="mt-2">
                  Lesson {nextLesson.lesson.number}: {nextLesson.lesson.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {nextLesson.lesson.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {nextLesson.lesson.duration}
                </div>
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

      {/* Completion Message */}
      {completedLessons === totalLessons && totalLessons > 0 && (
        <Card className="mb-8 border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 text-yellow-500" />
              <div>
                <CardTitle className="text-yellow-700">
                  🎉 {levelConfig.nameJa}コース修了おめでとうございます！
                </CardTitle>
                <CardDescription className="mt-1">
                  全{totalLessons}レッスンを完了しました。
                  {userProgress.selectedLevel !== 'advanced' && (
                    <span>次のレベルにチャレンジしてみませんか？</span>
                  )}
                </CardDescription>
                {userProgress.selectedLevel !== 'advanced' && (
                  <Button className="mt-4" variant="outline" onClick={handleChangeLevel}>
                    次のレベルへ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Phase Progress */}
      <h2 className="text-xl font-bold mb-4">
        {userProgress.selectedLevel === 'beginner' ? 'ユニット' : 'フェーズ'}別進捗
      </h2>
      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseProgress = getPhaseProgress(phase.id)

          return (
            <Card key={phase.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={phaseProgress.percent === 100 ? "default" : "outline"}>
                      {userProgress.selectedLevel === 'beginner' ? 'Unit' : 'Phase'} {phase.id}
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
                        <div className="min-w-0">
                          <span className={`text-sm block truncate ${completed ? "text-muted-foreground line-through" : ""}`}>
                            L{lesson.number}: {lesson.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Level Info Footer */}
      <Card className="mt-8 bg-muted/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{levelConfig.icon}</span>
              <span>{levelConfig.nameJa}コース: {levelConfig.estimatedTime} / {levelConfig.lessonCount}レッスン</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleChangeLevel}>
              レベルを変更する
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
