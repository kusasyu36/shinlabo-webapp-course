"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { phases } from "@/content/phases"
import { Lesson, Phase, Section } from "@/content/types"
import { Quiz } from "@/components/lesson/Quiz"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  CheckCircle,
  BookOpen,
  Menu,
  X
} from "lucide-react"

interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
}

function getAllLessons(): { lesson: Lesson; phase: Phase }[] {
  const allLessons: { lesson: Lesson; phase: Phase }[] = []
  for (const phase of phases) {
    for (const lesson of phase.lessons) {
      allLessons.push({ lesson, phase })
    }
  }
  return allLessons
}

function findLessonById(lessonId: string): { lesson: Lesson; phase: Phase } | null {
  for (const phase of phases) {
    const lesson = phase.lessons.find(l => l.id === lessonId)
    if (lesson) {
      return { lesson, phase }
    }
  }
  return null
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.lessonId as string

  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("sdgs-pro-course-progress")
    if (saved) {
      setProgress(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  const lessonData = findLessonById(lessonId)
  const allLessons = getAllLessons()
  const currentIndex = allLessons.findIndex(l => l.lesson.id === lessonId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  if (!lessonData) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <h1 className="text-2xl font-bold">レッスンが見つかりません</h1>
            <p className="mt-2 text-muted-foreground">
              指定されたレッスンは存在しません。
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">ダッシュボードへ戻る</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { lesson, phase } = lessonData
  const currentSection = lesson.sections[currentSectionIndex]
  const isCompleted = progress.some(p => p.lessonId === lessonId && p.completed)
  const sectionProgress = ((currentSectionIndex + 1) / lesson.sections.length) * 100

  const markAsComplete = () => {
    const newProgress: LessonProgress = {
      lessonId,
      completed: true,
      completedAt: new Date().toISOString()
    }

    const updatedProgress = progress.filter(p => p.lessonId !== lessonId)
    updatedProgress.push(newProgress)

    setProgress(updatedProgress)
    localStorage.setItem("sdgs-pro-course-progress", JSON.stringify(updatedProgress))
  }

  const goToNextSection = () => {
    if (currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!isLoaded) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-background border-r transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <Badge variant="outline">Phase {phase.id}</Badge>
              <h2 className="mt-1 font-semibold text-sm truncate">{lesson.title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowSidebar(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {lesson.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSectionIndex(index)
                    setShowSidebar(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    index === currentSectionIndex
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="text-xs opacity-70">{index + 1}.</span> {section.title}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </div>
            {isCompleted ? (
              <div className="flex items-center gap-2 text-teal-500 text-sm">
                <CheckCircle className="h-4 w-4" />
                完了済み
              </div>
            ) : (
              <Button size="sm" className="w-full" onClick={markAsComplete}>
                完了としてマーク
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-background border-b p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(true)}>
              <Menu className="h-4 w-4 mr-2" />
              セクション
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentSectionIndex + 1} / {lesson.sections.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="border-b">
          <Progress value={sectionProgress} className="rounded-none h-1" />
        </div>

        {/* Content */}
        <div className="flex-1 container max-w-4xl py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground">
              ダッシュボード
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Phase {phase.id}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Lesson {lesson.number}</span>
          </div>

          {/* Lesson Header (First section only) */}
          {currentSectionIndex === 0 && (
            <div className="mb-8">
              <Badge variant="secondary" className="mb-2">
                Phase {phase.id} - Lesson {lesson.number}
              </Badge>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="mt-2 text-muted-foreground">{lesson.description}</p>

              {/* Objectives */}
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    学習目標
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Section Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {currentSection.title}
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentSection.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Quiz */}
          {currentSection.quiz && (
            <div className="mb-8">
              <Quiz quiz={currentSection.quiz} />
            </div>
          )}

          {/* Section Navigation */}
          <div className="flex items-center justify-between border-t pt-6">
            <Button
              variant="outline"
              onClick={goToPrevSection}
              disabled={currentSectionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              前のセクション
            </Button>

            {currentSectionIndex < lesson.sections.length - 1 ? (
              <Button onClick={goToNextSection}>
                次のセクション
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {!isCompleted && (
                  <Button variant="outline" onClick={markAsComplete}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    完了
                  </Button>
                )}
                {nextLesson ? (
                  <Button asChild>
                    <Link href={`/lessons/${nextLesson.lesson.id}`}>
                      次のレッスンへ
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/dashboard">
                      ダッシュボードへ
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lesson Navigation Footer */}
        <div className="border-t bg-muted/50">
          <div className="container max-w-4xl py-4">
            <div className="flex items-center justify-between">
              {prevLesson ? (
                <Link
                  href={`/lessons/${prevLesson.lesson.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">前: </span>
                  {prevLesson.lesson.title}
                </Link>
              ) : (
                <div />
              )}
              {nextLesson && (
                <Link
                  href={`/lessons/${nextLesson.lesson.id}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <span className="hidden sm:inline">次: </span>
                  {nextLesson.lesson.title}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
