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
import { getPhasesByLevel, phasesByLevel } from "@/content/phases/byLevel"
import { Lesson, Phase, CourseLevel, LEVEL_CONFIGS } from "@/content/types"
import { Quiz } from "@/components/lesson/Quiz"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target,
  CheckCircle,
  BookOpen,
  Menu,
  X,
  Video,
  AlertCircle
} from "lucide-react"

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

function getAllLessonsForLevel(level: CourseLevel): { lesson: Lesson; phase: Phase }[] {
  const phases = getPhasesByLevel(level)
  const allLessons: { lesson: Lesson; phase: Phase }[] = []
  for (const phase of phases) {
    for (const lesson of phase.lessons) {
      allLessons.push({ lesson, phase })
    }
  }
  return allLessons
}

function findLessonById(lessonId: string, level: CourseLevel): { lesson: Lesson; phase: Phase } | null {
  const phases = getPhasesByLevel(level)
  for (const phase of phases) {
    const lesson = phase.lessons.find(l => l.id === lessonId)
    if (lesson) {
      return { lesson, phase }
    }
  }
  return null
}

// Try to find lesson in any level (for fallback)
function findLessonInAnyLevel(lessonId: string): { lesson: Lesson; phase: Phase; level: CourseLevel } | null {
  for (const level of ['beginner', 'standard', 'advanced'] as CourseLevel[]) {
    const result = findLessonById(lessonId, level)
    if (result) {
      return { ...result, level }
    }
  }
  return null
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.lessonId as string

  const [userProgress, setUserProgress] = useState<UserProgress>({
    selectedLevel: null,
    levelSelectedAt: null,
    lessons: []
  })
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setUserProgress(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  // Redirect to dashboard if no level selected
  useEffect(() => {
    if (isLoaded && !userProgress.selectedLevel) {
      // Try to find the lesson and determine its level
      const found = findLessonInAnyLevel(lessonId)
      if (found) {
        // Auto-select the level based on the lesson
        const newProgress: UserProgress = {
          selectedLevel: found.level,
          levelSelectedAt: new Date().toISOString(),
          lessons: []
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
        setUserProgress(newProgress)
      } else {
        router.push('/dashboard')
      }
    }
  }, [isLoaded, userProgress.selectedLevel, lessonId, router])

  if (!isLoaded || !userProgress.selectedLevel) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>
    )
  }

  const lessonData = findLessonById(lessonId, userProgress.selectedLevel)
  const allLessons = getAllLessonsForLevel(userProgress.selectedLevel)
  const currentIndex = allLessons.findIndex(l => l.lesson.id === lessonId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  const levelConfig = LEVEL_CONFIGS[userProgress.selectedLevel]

  if (!lessonData) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold">レッスンが見つかりません</h1>
            <p className="mt-2 text-muted-foreground">
              このレッスンは{levelConfig.nameJa}コースには含まれていません。
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
  const isCompleted = userProgress.lessons.some(p => p.lessonId === lessonId && p.completed)
  const sectionProgress = ((currentSectionIndex + 1) / lesson.sections.length) * 100

  const markAsComplete = () => {
    const newLessonProgress: LessonProgress = {
      lessonId,
      completed: true,
      completedAt: new Date().toISOString()
    }

    const updatedLessons = userProgress.lessons.filter(p => p.lessonId !== lessonId)
    updatedLessons.push(newLessonProgress)

    const newProgress: UserProgress = {
      ...userProgress,
      lessons: updatedLessons
    }

    setUserProgress(newProgress)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
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

  // Determine the unit/phase label based on level
  const unitLabel = userProgress.selectedLevel === 'beginner' ? 'Unit' : 'Phase'

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
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">{unitLabel} {phase.id}</Badge>
                <Badge variant="secondary" className="text-xs">
                  {levelConfig.icon} {levelConfig.nameJa}
                </Badge>
              </div>
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-70">{index + 1}.</span>
                    <span className="flex-1 truncate">{section.title}</span>
                    {section.videoRequired && (
                      <Video className="h-3 w-3 opacity-70" />
                    )}
                  </div>
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
            <span>{unitLabel} {phase.id}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Lesson {lesson.number}</span>
          </div>

          {/* Lesson Header (First section only) */}
          {currentSectionIndex === 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">
                  {unitLabel} {phase.id} - Lesson {lesson.number}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {levelConfig.icon} {levelConfig.nameJa}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <p className="mt-2 text-muted-foreground">{lesson.description}</p>

              {/* Video Notice for Beginner Level */}
              {userProgress.selectedLevel === 'beginner' && (
                <Card className="mt-4 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                      <Video className="h-5 w-5" />
                      <span className="font-medium">動画で学習できます</span>
                    </div>
                    <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                      このレッスンは動画を見ながら学習できます。テキストを読まなくても大丈夫です。
                    </p>
                  </CardContent>
                </Card>
              )}

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

          {/* Video Placeholder (for beginner level) */}
          {currentSection.videoRequired && (
            <Card className="mb-6 bg-slate-100 dark:bg-slate-900">
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-2xl aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-muted-foreground">
                      <Video className="h-16 w-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">動画プレースホルダー</p>
                      <p className="text-xs mt-1">（実際の動画はここに表示されます）</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    動画を見ながら、一緒に操作してみましょう
                  </p>
                </div>
              </CardContent>
            </Card>
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
