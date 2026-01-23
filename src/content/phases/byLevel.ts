import { Phase, CourseLevel } from "../types"
import { beginnerPhases } from "./beginner"
import { phases as standardPhases } from "./index"
import { advancedPhases } from "./advanced"

export const phasesByLevel: Record<CourseLevel, Phase[]> = {
  beginner: beginnerPhases,
  standard: standardPhases,
  advanced: advancedPhases,
}

export function getPhasesByLevel(level: CourseLevel): Phase[] {
  return phasesByLevel[level]
}

export function getTotalLessons(level: CourseLevel): number {
  return phasesByLevel[level].reduce((sum, phase) => sum + phase.lessons.length, 0)
}

export function getTotalDuration(level: CourseLevel): string {
  const phases = phasesByLevel[level]
  const totalMinutes = phases.reduce((sum, phase) => {
    const lessons = phase.lessons
    return sum + lessons.reduce((lessonSum, lesson) => {
      const minutes = parseInt(lesson.duration.replace(/[^0-9]/g, ''))
      return lessonSum + minutes
    }, 0)
  }, 0)

  if (totalMinutes < 60) {
    return `約${totalMinutes}分`
  }
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (minutes === 0) {
    return `約${hours}時間`
  }
  return `約${hours}時間${minutes}分`
}
