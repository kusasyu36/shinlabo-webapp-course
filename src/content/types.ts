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
}

export interface Lesson {
  id: string
  number: number
  title: string
  description: string
  duration: string
  objectives: string[]
  sections: Section[]
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
