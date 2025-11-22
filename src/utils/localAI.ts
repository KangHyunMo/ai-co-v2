/** @format */

import { AIFeedback, PatternAnalysis } from "../types"

/**
 * 로컬 AI 엔진
 * 클라이언트 측에서만 작동하는 경량 AI
 */

// 감정 관련 키워드
const EMOTION_KEYWORDS = {
  happy: ["기쁨", "행복", "즐거움", "신남", "행복", "좋음"],
  sad: ["슬픔", "우울", "침울", "기분", "외로움"],
  stressed: ["스트레스", "불안", "걱정", "긴장", "피곤", "힘듦"],
  calm: ["차분", "편안", "평화", "조용", "안정"],
  excited: ["흥분", "신났", "기대", "설렜", "신남"],
}

// AI 피드백 템플릿
const FEEDBACK_TEMPLATES = {
  improving: [
    "최근에 좋은 기분이 많아지고 있어요. 계속 유지해보세요! 🌱",
    "감정이 점점 좋아지고 있습니다. 훌륭해요! 💪",
    "당신의 노력이 나타나고 있어요. 더 진행하세요! ✨",
  ],
  declining: [
    "최근에 기분이 좋지 않은 것 같아요. 자신을 돌봐주세요. 💙",
    "스트레스가 많아 보입니다. 휴식이 필요할 수 있습니다. 🌤️",
    "감정이 낮아지고 있네요. 긍정적인 활동을 시도해보세요. 🎯",
  ],
  stable: [
    "감정이 안정적이네요. 현재의 상태를 유지하세요. 😌",
    "균형잡힌 감정 상태를 유지하고 있습니다. 좋습니다! 🎨",
    "일관된 감정 패턴을 보여주고 있어요. 좋은 신호입니다. 📊",
  ],
  energetic: [
    "오늘은 에너지가 많아요! 이 활력을 유지해보세요. ⚡",
    "신나는 기분이 느껴집니다. 좋은 하루예요! 🎉",
  ],
  relaxed: [
    "편안한 상태를 유지하고 있군요. 좋은 휴식이 되길 바랍니다. 🌙",
    "차분한 기분이 드네요. 자신을 아껴주세요. 💝",
  ],
}

// 시간대별 조언
const TIME_BASED_SUGGESTIONS = {
  morning: "새벽에는 충분한 휴식이 중요합니다. 천천히 시작해보세요. 🌅",
  afternoon: "오후에는 활동적인 움직임이 도움이 될 거예요. 📍",
  evening: "저녁에는 휴식과 정리 시간이 좋습니다. 🌆",
  night: "밤에는 충분한 수면이 중요합니다. 푹 쉬어보세요. 🌙",
}

// 감정 점수 계산
const EMOTION_SCORE = {
  "very-sad": 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  "very-happy": 5,
}

/**
 * 지역 AI - 패턴 분석
 * 사용자의 감정 데이터를 분석하여 패턴 도출
 */
export function analyzeWithLocalAI(
  emotions: Array<{ emotion: string; date: string; mood: string }>
): PatternAnalysis {
  if (emotions.length === 0) {
    return {
      emotionalTrend: "아직 충분한 데이터가 없습니다.",
      moodPeaks: [],
      moodDips: [],
      recommendations: ["매일 감정을 기록해주세요."],
      insights: [],
    }
  }

  // 1. 감정 점수 계산
  const scores = emotions.map(
    (e) => EMOTION_SCORE[e.emotion as keyof typeof EMOTION_SCORE] || 3
  )
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
  const trend = calculateTrend(scores)

  // 2. 감정 피크와 딥 찾기
  const maxScore = Math.max(...scores)
  const minScore = Math.min(...scores)
  const moodPeaks = emotions
    .filter((_, i) => scores[i] === maxScore)
    .map((e) => e.mood)
    .slice(0, 3)
  const moodDips = emotions
    .filter((_, i) => scores[i] === minScore)
    .map((e) => e.mood)
    .slice(0, 3)

  // 3. 인사이트 생성
  const insights: string[] = []
  const recommendations: string[] = []

  // 평균 점수 기반 인사이트
  if (avgScore >= 4) {
    insights.push("최근 좋은 기분이 많았어요. 계속 유지해보세요!")
  } else if (avgScore >= 3) {
    insights.push("감정이 안정적이네요. 더 긍정적인 활동을 시도해보세요.")
  } else {
    insights.push("요즘 감정이 좋지 않은 것 같아요. 자신을 돌봐주세요.")
    recommendations.push("일찍 잠을 자고 충분히 휴식을 취해보세요.")
  }

  // 트렌드 기반 인사이트
  if (trend === "improving") {
    insights.push("당신의 기분이 점점 좋아지고 있어요! 좋은 신호입니다.")
  } else if (trend === "declining") {
    insights.push(
      "기분이 조금씩 내려가고 있네요. 스트레스 관리가 필요할 수 있습니다."
    )
    recommendations.push("운동이나 명상을 시도해보세요.")
  }

  // 시간대 기반 조언
  const hour = new Date().getHours()
  if (hour < 6) {
    recommendations.push(TIME_BASED_SUGGESTIONS.morning)
  } else if (hour < 12) {
    recommendations.push(TIME_BASED_SUGGESTIONS.morning)
  } else if (hour < 18) {
    recommendations.push(TIME_BASED_SUGGESTIONS.afternoon)
  } else if (hour < 21) {
    recommendations.push(TIME_BASED_SUGGESTIONS.evening)
  } else {
    recommendations.push(TIME_BASED_SUGGESTIONS.night)
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
    recommendations: recommendations.slice(0, 3),
    insights,
  }
}

/**
 * 트렌드 계산 (선형 회귀)
 */
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

/**
 * 로컬 AI - 감정 키워드 감지
 */
export function detectEmotionKeywords(text: string): string[] {
  const detected: string[] = []

  Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
    keywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) {
        detected.push(emotion)
      }
    })
  })

  return [...new Set(detected)] // 중복 제거
}

/**
 * 로컬 AI - 피드백 생성
 */
export function generateLocalAIFeedback(
  analysis: PatternAnalysis,
  emotions: any[]
): AIFeedback {
  const trend = analysis.emotionalTrend

  let messagePool: string[] = []

  if (trend.includes("좋아지")) {
    messagePool = FEEDBACK_TEMPLATES.improving
  } else if (trend.includes("내려가")) {
    messagePool = FEEDBACK_TEMPLATES.declining
  } else {
    messagePool = FEEDBACK_TEMPLATES.stable
  }

  // 최근 감정에 따른 추가 피드백
  if (emotions.length > 0) {
    const recentMood = emotions[emotions.length - 1].mood
    const detectedEmotions = detectEmotionKeywords(recentMood)

    if (detectedEmotions.includes("happy")) {
      messagePool.push(...FEEDBACK_TEMPLATES.energetic)
    } else if (detectedEmotions.includes("calm")) {
      messagePool.push(...FEEDBACK_TEMPLATES.relaxed)
    }
  }

  const randomMessage =
    messagePool[Math.floor(Math.random() * messagePool.length)]

  return {
    timestamp: new Date(),
    message: randomMessage,
    type: trend.includes("좋아지") ? "encouragement" : "suggestion",
    confidence: 0.85,
  }
}

/**
 * 로컬 AI - 추천 활동
 */
export function suggestActivities(avgEmotion: number): string[] {
  const suggestions: string[] = []

  if (avgEmotion < 2) {
    suggestions.push("🌳 자연 속에서 산책해보세요")
    suggestions.push("🧘 명상이나 요가를 시도해보세요")
    suggestions.push("☕ 좋아하는 음료를 마시면서 휴식해보세요")
  } else if (avgEmotion < 3) {
    suggestions.push("📚 재미있는 책이나 영상 감상")
    suggestions.push("🎵 좋아하는 음악 듣기")
    suggestions.push("🎨 창의적인 활동 (그리기, 글쓰기)")
  } else {
    suggestions.push("🏃 운동으로 에너지 발산")
    suggestions.push("👥 친구들과 시간 보내기")
    suggestions.push("🎯 새로운 도전 시작하기")
  }

  return suggestions
}

/**
 * 로컬 AI - 일일 목표 추천
 */
export function suggestDailyGoal(emotions: any[]): string {
  if (emotions.length === 0) {
    return "오늘 하루를 긍정적으로 보내는 것을 목표로 해보세요."
  }

  const today = new Date()
  const todayEmotions = emotions.filter((e) => {
    const eDate = new Date(e.date)
    return (
      eDate.getFullYear() === today.getFullYear() &&
      eDate.getMonth() === today.getMonth() &&
      eDate.getDate() === today.getDate()
    )
  })

  if (todayEmotions.length === 0) {
    return "오늘 첫 감정을 기록해보세요. 🌅"
  }

  const avgToday =
    todayEmotions.reduce(
      (sum, e) =>
        sum + (EMOTION_SCORE[e.emotion as keyof typeof EMOTION_SCORE] || 3),
      0
    ) / todayEmotions.length

  if (avgToday < 2.5) {
    return "오늘은 자신을 아끼고 휴식을 우선하세요. 💙"
  } else if (avgToday < 3.5) {
    return "오늘 하루의 좋은 순간을 찾아보세요. 👀"
  } else {
    return "오늘의 좋은 기분을 나누어주세요. ✨"
  }
}

/**
 * 로컬 AI - 고급 패턴 분석
 * 주기성, 이상 징후, 개선 제안 등
 */
export function advancedPatternAnalysis(
  emotions: Array<{ emotion: string; date: string; mood: string; intensity?: number }>
): {
  weeklyPattern: string
  anomalies: string[]
  improvementSuggestions: string[]
  healthScore: number
} {
  if (emotions.length < 7) {
    return {
      weeklyPattern: "데이터가 부족합니다. 일주일 이상 기록해주세요.",
      anomalies: [],
      improvementSuggestions: ["매일 감정을 기록해주세요."],
      healthScore: 0,
    }
  }

  const scores = emotions.map(
    (e) => EMOTION_SCORE[e.emotion as keyof typeof EMOTION_SCORE] || 3
  )

  // 주간 패턴 분석 (요일별)
  const dayOfWeekScores: Record<number, number[]> = {}
  emotions.forEach((e, i) => {
    const date = new Date(e.date)
    const day = date.getDay()
    if (!dayOfWeekScores[day]) dayOfWeekScores[day] = []
    dayOfWeekScores[day].push(scores[i])
  })

  const dayAverages: Record<number, number> = {}
  Object.keys(dayOfWeekScores).forEach((day) => {
    const dayNum = parseInt(day)
    dayAverages[dayNum] =
      dayOfWeekScores[dayNum].reduce((a, b) => a + b, 0) /
      dayOfWeekScores[dayNum].length
  })

  const bestDay = Object.entries(dayAverages).sort((a, b) => b[1] - a[1])[0]
  const worstDay = Object.entries(dayAverages).sort((a, b) => a[1] - b[1])[0]

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]
  const weeklyPattern = `가장 좋은 요일: ${dayNames[parseInt(bestDay[0])]}요일 (${bestDay[1].toFixed(1)}점), 가장 어려운 요일: ${dayNames[parseInt(worstDay[0])]}요일 (${worstDay[1].toFixed(1)}점)`

  // 이상 징후 감지
  const anomalies: string[] = []
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
  // 표준편차 계산 (향후 사용 예정)
  // const stdDev = Math.sqrt(
  //   scores.reduce((sum, s) => sum + Math.pow(s - avgScore, 2), 0) / scores.length
  // )

  // 급격한 변화 감지
  for (let i = 1; i < scores.length; i++) {
    const change = Math.abs(scores[i] - scores[i - 1])
    if (change >= 2) {
      anomalies.push(
        `${new Date(emotions[i].date).toLocaleDateString('ko-KR')}에 감정이 급격히 변화했습니다.`
      )
    }
  }

  // 건강 점수 계산 (0-100)
  const healthScore = Math.min(
    100,
    Math.max(
      0,
      ((avgScore - 1) / 4) * 100 - anomalies.length * 5
    )
  )

  // 개선 제안
  const improvementSuggestions: string[] = []
  if (avgScore < 2.5) {
    improvementSuggestions.push("전문가 상담을 고려해보세요.")
    improvementSuggestions.push("규칙적인 운동과 충분한 수면을 권장합니다.")
  } else if (avgScore < 3.5) {
    improvementSuggestions.push("긍정적인 활동을 늘려보세요.")
    improvementSuggestions.push("사회적 연결을 유지하세요.")
  }

  if (anomalies.length > emotions.length * 0.3) {
    improvementSuggestions.push("감정 변화가 크네요. 스트레스 관리를 시도해보세요.")
  }

  return {
    weeklyPattern,
    anomalies: anomalies.slice(0, 5), // 최대 5개
    improvementSuggestions,
    healthScore: Math.round(healthScore),
  }
}