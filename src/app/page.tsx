import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { phases } from "@/content/phases"
import { Code2, Sparkles, Rocket, CheckCircle, ArrowRight, Zap, Layout, Briefcase, GraduationCap, MessageSquare } from "lucide-react"

export default function Home() {
  const totalLessons = phases.reduce((sum, phase) => sum + phase.lessons.length, 0)
  const totalHours = phases.reduce((sum, phase) => {
    const hours = parseInt(phase.duration.replace(/[^0-9]/g, ''))
    return sum + hours
  }, 0)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-500/10 to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              シンラボ限定コンテンツ
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="flex items-center justify-center gap-3 mb-2">
                <Code2 className="h-12 w-12 text-primary" />
                AIでWebアプリを作る
              </span>
              <span className="block text-primary">実践講座</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              プログラミング未経験でも大丈夫！
              <br />
              AIに話しかけるだけで、本格的なWebアプリが作れる
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  今すぐ始める
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/phases">カリキュラムを見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Level Selection Section */}
      <section className="border-y bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold">3つのコースから選べます</h2>
            <p className="mt-2 text-muted-foreground">
              あなたの経験に合わせたコースをお選びください
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌱</div>
                <CardTitle>初心者</CardTitle>
                <CardDescription>AI未経験の方</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>約50分 / 10レッスン</div>
                  <div>動画で見るだけ</div>
                </div>
              </CardContent>
            </Card>
            <Card className="relative text-center border-primary hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">おすすめ</Badge>
                <div className="text-4xl mb-2">🌿</div>
                <CardTitle>標準</CardTitle>
                <CardDescription>AIを少し使ったことがある方</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>約5時間 / 20レッスン</div>
                  <div>スクショ付き解説</div>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🌳</div>
                <CardTitle>経験者</CardTitle>
                <CardDescription>AIを毎日使う方</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>約4時間 / 22レッスン</div>
                  <div>React/Next.js対応</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/dashboard">
                コースを選んで始める
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Vibe Coding Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Vibe Codingとは？</h2>
            <p className="mt-4 text-muted-foreground">
              AIに自然な言葉で「こんなアプリを作って」と伝えるだけ
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>従来のプログラミング</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-red-500">-</span>
                  <span>プログラミング言語の文法を覚える必要がある</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-red-500">-</span>
                  <span>エラーメッセージが英語で意味不明</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-red-500">-</span>
                  <span>習得に数ヶ月〜数年かかる</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Vibe Coding（AIと一緒に）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-500" />
                  <span>日本語で「こんなの作って」と伝えるだけ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-500" />
                  <span>エラーもAIが解決方法を教えてくれる</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-500" />
                  <span>初日から動くアプリが作れる</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">こんな方におすすめ</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">プログラミング未経験者</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  コードを書いたことがなくても大丈夫。AIが全部サポートします
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">業務を効率化したい方</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  日常業務で使える便利ツールを自分で作れるようになります
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Rocket className="h-8 w-8 text-primary" />
                <CardTitle className="mt-2">アイデアを形にしたい方</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  「こんなアプリがあったら便利」を実現できるスキルが身につきます
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Build Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">この講座で作れるようになるもの</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">ToDoアプリ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  タスク管理の基本アプリ。追加・完了・削除機能を実装
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Layout className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">ポートフォリオサイト</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  自己紹介・スキル・実績を載せた個人サイト
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary" />
                <CardTitle className="mt-4">業務ツール</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  日報入力、経費計算など日常業務で使えるツール
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">使用するAIツール</h2>
            <p className="mt-4 text-muted-foreground">
              無料で使えるAIツールでWebアプリを作成します
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Google AI Studio", "Claude Artifacts", "ChatGPT Canvas", "v0 by Vercel"].map((tool) => (
              <Card key={tool} className="text-center">
                <CardContent className="py-4">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-medium">{tool}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">カリキュラム</h2>
            <p className="mt-4 text-muted-foreground">
              {phases.length}つのフェーズで段階的にマスター
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {phases.map((phase) => (
              <Card key={phase.id} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 h-1 w-full bg-primary" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Phase {phase.id}</Badge>
                    <span className="text-sm text-muted-foreground">{phase.duration}</span>
                  </div>
                  <CardTitle className="mt-2">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{phase.description}</CardDescription>
                  <div className="mt-4 space-y-2">
                    {phase.lessons.slice(0, 2).map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Lesson {lesson.number}: {lesson.title}</span>
                      </div>
                    ))}
                    {phase.lessons.length > 2 && (
                      <div className="text-sm text-muted-foreground">
                        +{phase.lessons.length - 2} more lessons
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/phases">
                すべてのレッスンを見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shinlabo Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold">シンラボ会員限定</h2>
            <p className="mt-4 text-muted-foreground">
              この講座はシンラボ会員様向けの限定コンテンツです
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Slackで質問し放題</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  分からないことは何でも聞けます
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">隔週の勉強会で実践</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  講座の内容を一緒に学べます
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Rocket className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">仲間と一緒に成長</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  同じ志を持つ仲間がいます
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-700 py-20 text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Code2 className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold">今すぐ学習を始めましょう</h2>
            <p className="mt-4 opacity-90">
              全{totalLessons}レッスン・約{totalHours}時間の充実したカリキュラム
            </p>
            <p className="mt-2 opacity-80 text-sm">
              AIと一緒なら、あなたもWebアプリが作れる
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/dashboard">
                ダッシュボードへ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
