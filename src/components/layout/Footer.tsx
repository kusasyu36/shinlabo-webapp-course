import Link from "next/link"
import { Target } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">SDGs推進のプロになる</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AIをパートナーに、SDGs推進者としてのスキルを磨く実践講座です。
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">講座内容</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/phases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                カリキュラム
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                ダッシュボード
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">参照資料</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="https://www.mofa.go.jp/mofaj/gaiko/oda/sdgs/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                外務省 SDGs
              </a>
              <a
                href="https://www.env.go.jp/policy/sdgs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                環境省 SDGs
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 一般社団法人未来技術推進協会. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
