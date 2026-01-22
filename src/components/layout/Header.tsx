"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Code2 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold hidden sm:inline-block">AIでWebアプリを作る</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/phases" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            カリキュラム
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            ダッシュボード
          </Link>
          <Button asChild size="sm">
            <Link href="/dashboard">学習を始める</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              href="/phases"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              カリキュラム
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              ダッシュボード
            </Link>
            <Button asChild size="sm">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                学習を始める
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
