export interface Quiz {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface SimulatorScenario {
  id: string
  steps: SimulatorStep[]
}

export interface SimulatorStep {
  instruction: string
  expectedInput?: string
  output?: string
  hint?: string
  delay?: number
}

export interface Section {
  id: string
  title: string
  content: string
  hasSimulator?: boolean
  simulatorScenario?: string
  quiz?: Quiz
  videoUrl?: string // For beginner level
  videoRequired?: boolean
}

export interface Lesson {
  id: string
  number: number
  title: string
  description: string
  duration: string
  objectives: string[]
  sections: Section[]
  skippable?: boolean // For advanced level
}

export interface Phase {
  id: number
  title: string
  description: string
  duration: string
  lessons: Lesson[]
}

export interface CourseData {
  phases: Phase[]
}

// Level types
export type CourseLevel = 'beginner' | 'standard' | 'advanced'

export interface LevelConfig {
  id: CourseLevel
  name: string
  nameJa: string
  description: string
  icon: string
  estimatedTime: string
  lessonCount: number
  features: string[]
  targetAudience: string[]
}

export const LEVEL_CONFIGS: Record<CourseLevel, LevelConfig> = {
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    nameJa: '初心者',
    description: 'AI未経験・PC操作に不安がある方向け。動画を見るだけで理解できます。',
    icon: '🌱',
    estimatedTime: '約50分',
    lessonCount: 10,
    features: [
      '1レッスン5分の超短時間設計',
      '動画で操作を見せる（コード非表示）',
      '専門用語なし',
      '「できた！」を感じる成功体験',
    ],
    targetAudience: [
      'AI・プログラミング未経験の方',
      'パソコン操作に不安がある方',
      'まずは体験してみたい方',
    ],
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    nameJa: '標準',
    description: 'AIを少し使ったことがある方向け。スクショ付きで丁寧に解説します。',
    icon: '🌿',
    estimatedTime: '約5時間',
    lessonCount: 20,
    features: [
      '1レッスン10分',
      'スクリーンショット付きの詳細手順',
      '専門用語には注釈付き',
      '「見るだけでOK」のコード表示',
    ],
    targetAudience: [
      'ChatGPTやGeminiを月数回使う方',
      '基本的なPC操作ができる方',
      '本格的にアプリを作りたい方',
    ],
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    nameJa: '経験者',
    description: 'AIを毎日使う方向け。スキップ機能とReact/Next.jsオプション付き。',
    icon: '🌳',
    estimatedTime: '約4時間',
    lessonCount: 22,
    features: [
      '1レッスン15-20分',
      '基礎フェーズ（Phase 1-2）はスキップ可能',
      'React/Next.js + Tailwind CSS',
      'Supabase連携 + Vercelデプロイ',
    ],
    targetAudience: [
      'AIを毎日使っている方',
      'プログラミング経験がある方',
      '本格的なアプリ開発を学びたい方',
    ],
  },
}

export interface UserLevelProgress {
  selectedLevel: CourseLevel
  levelSelectedAt: string
  completedLessons: string[]
  currentLesson: string | null
  levelHistory: {
    timestamp: string
    from: CourseLevel
    to: CourseLevel
    atLesson: string
  }[]
}
