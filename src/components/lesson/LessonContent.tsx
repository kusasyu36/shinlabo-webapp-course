"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface LessonContentProps {
  content: string
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
