/** @format */

// 감정 데이터 타입
export interface EmotionEntry {
  id: string
  date: Date
  emotion: "very-sad" | "sad" | "neutral" | "happy" | "very-happy"
  intensity: number // 1-10
  mood: string // 사용자가 입력한 기분 설명
  note: string // 추가 노트
}

// 목표 타입
export interface Goal {
  id: string
  title: string
  description: string
  targetDate: Date
  progress: number // 0-100
  category: "health" | "work" | "personal" | "relationship" | "learning"
  status: "active" | "completed" | "paused"
  createdAt: Date
}

// 일일 통계
export interface DailyStats {
  date: Date
  averageEmotion: number
  moodTrend: "improving" | "declining" | "stable"
  entries: EmotionEntry[]
}

// AI 피드백
export interface AIFeedback {
  timestamp: Date
  message: string
  type: "insight" | "encouragement" | "suggestion" | "warning"
  confidence: number // 0-1
}

// 패턴 분석 결과
export interface PatternAnalysis {
  emotionalTrend: string
  moodPeaks: string[]
  moodDips: string[]
  recommendations: string[]
  insights: string[]
}
