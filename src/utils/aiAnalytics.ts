/** @format */

import { AIFeedback, EmotionEntry, PatternAnalysis } from "../types"

// 감정을 숫자 점수로 변환
const emotionScore: Record<string, number> = {
  "very-sad": 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  "very-happy": 5,
}

// 감정 분석 (지난 7일 데이터 기반)
export function analyzeEmotionalTrend(
  entries: EmotionEntry[]
): PatternAnalysis {
  if (entries.length === 0) {
    return {
      emotionalTrend: "아직 감정 데이터가 충분하지 않습니다.",
      moodPeaks: [],
      moodDips: [],
      recommendations: ["매일 감정을 기록해보세요."],
      insights: [],
    }
  }

  // 최근 7일 데이터 필터링
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentEntries = entries.filter((e) => new Date(e.date) >= sevenDaysAgo)

  if (recentEntries.length === 0) {
    return {
      emotionalTrend: "최근 일주일 데이터가 없습니다.",
      moodPeaks: [],
      moodDips: [],
      recommendations: ["매일 감정을 기록해보세요."],
      insights: [],
    }
  }

  // 감정 점수 계산
  const scores = recentEntries.map((e) => emotionScore[e.emotion])
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
  const trend = calculateTrend(scores)

  // 감정 피크와 딥 찾기
  const maxScore = Math.max(...scores)
  const minScore = Math.min(...scores)
  const moodPeaks = recentEntries
    .filter((e) => emotionScore[e.emotion] === maxScore)
    .map((e) => e.mood)
  const moodDips = recentEntries
    .filter((e) => emotionScore[e.emotion] === minScore)
    .map((e) => e.mood)

  // 기본 피드백 생성
  const insights: string[] = []
  const recommendations: string[] = []

  if (avgScore >= 4) {
    insights.push("최근 좋은 기분이 많았어요. 계속 유지해보세요!")
  } else if (avgScore >= 3) {
    insights.push("감정이 안정적이네요. 더 긍정적인 활동을 시도해보세요.")
  } else {
    insights.push("요즘 감정이 좋지 않은 것 같아요. 자신을 돌봐주세요.")
    recommendations.push("일찍 잠을 자고 충분히 휴식을 취해보세요.")
  }

  if (trend === "improving") {
    insights.push("당신의 기분이 점점 좋아지고 있어요! 좋은 신호입니다.")
  } else if (trend === "declining") {
    insights.push(
      "기분이 조금씩 내려가고 있네요. 스트레스 관리가 필요할 수 있습니다."
    )
    recommendations.push("운동이나 명상을 시도해보세요.")
  }

  // 트렌드 문자열 생성
  let emotionalTrend = ""
  if (trend === "improving") {
    emotionalTrend = "당신의 기분이 좋아지고 있어요! 🌱"
  } else if (trend === "declining") {
    emotionalTrend = "기분이 조금씩 내려가고 있어요. 😐"
  } else {
    emotionalTrend = "감정이 안정적이네요. 😌"
  }

  return {
    emotionalTrend,
    moodPeaks,
    moodDips,
    recommendations,
    insights,
  }
}

// 트렌드 계산 (선형 회귀)
function calculateTrend(
  scores: number[]
): "improving" | "declining" | "stable" {
  if (scores.length < 2) return "stable"

  const n = scores.length
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0

  for (let i = 0; i < n; i++) {
    sumX += i
    sumY += scores[i]
    sumXY += i * scores[i]
    sumX2 += i * i
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)

  if (Math.abs(slope) < 0.1) return "stable"
  return slope > 0 ? "improving" : "declining"
}

// AI 피드백 생성
export function generateAIFeedback(analysis: PatternAnalysis): AIFeedback {
  const messages = [...analysis.insights, ...analysis.recommendations]

  if (messages.length === 0) {
    messages.push("계속해서 자신의 감정을 관찰해보세요.")
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return {
    timestamp: new Date(),
    message: randomMessage,
    type: analysis.emotionalTrend.includes("좋아")
      ? "encouragement"
      : "suggestion",
    confidence: 0.8,
  }
}

// 목표 진행률 평가
export function evaluateGoalProgress(
  daysLeft: number,
  targetProgress: number,
  currentProgress: number
): string {
  const progressRate = (currentProgress / targetProgress) * 100
  const daysPerDay = progressRate / Math.max(1, daysLeft)

  if (currentProgress >= targetProgress) {
    return "축하해요! 목표를 달성했어요! 🎉"
  }

  if (daysPerDay < 1) {
    return "목표 달성을 위해 조금 더 노력이 필요해요."
  } else if (daysPerDay < 2) {
    return "페이스가 좋네요. 계속 진행하세요."
  } else {
    return "훌륭한 진행 중입니다! 이 속도라면 충분히 달성할 수 있어요!"
  }
}

// localStorage에서 데이터 로드
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

// localStorage에 데이터 저장
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Failed to save to storage:", error)
  }
}
