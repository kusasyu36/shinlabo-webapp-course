import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { phases } from "@/content/phases"
import { Clock, CheckCircle, ArrowRight, Target } from "lucide-react"

export default function PhasesPage() {
  const totalLessons = phases.reduce((sum, phase) => sum + phase.lessons.length, 0)
  const totalHours = phases.reduce((sum, phase) => {
    const hours = parseInt(phase.duration.replace(/[^0-9]/g, ''))
    return sum + hours
  }, 0)

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">カリキュラム</h1>
        <p className="mt-2 text-muted-foreground">
          全{phases.length}フェーズ・{totalLessons}レッスン・約{totalHours}時間の充実したカリキュラム
        </p>
      </div>

      {/* Phases List */}
      <div className="space-y-8">
        {phases.map((phase) => (
          <Card key={phase.id} className="overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default" className="text-lg px-3 py-1">
                  Phase {phase.id}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {phase.duration}
                </div>
              </div>
              <CardTitle className="text-2xl mt-2">{phase.title}</CardTitle>
              <CardDescription className="text-base">
                {phase.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {phase.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lessons/${lesson.id}`}
                    className="group"
                  >
                    <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            Lesson {lesson.number}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                        <CardTitle className="text-base mt-2 group-hover:text-primary transition-colors">
                          {lesson.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm line-clamp-2">
                          {lesson.description}
                        </CardDescription>
                        <div className="mt-3 space-y-1">
                          {lesson.objectives.slice(0, 2).map((obj, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 mt-0.5 shrink-0" />
                              <span className="line-clamp-1">{obj}</span>
                            </div>
                          ))}
                          {lesson.objectives.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{lesson.objectives.length - 2} more
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-8">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold">学習を始めましょう</h2>
            <p className="mt-2 opacity-90">
              ダッシュボードで進捗を確認しながら学習を進められます
            </p>
            <Button variant="secondary" size="lg" className="mt-6" asChild>
              <Link href="/dashboard">
                ダッシュボードへ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
