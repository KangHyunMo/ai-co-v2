/** @format */

import React from "react"
import "../styles/StatsCards.css"
import { EmotionEntry, Goal } from "../types"

interface Props {
  emotions: EmotionEntry[]
  goals: Goal[]
}

const StatsCards: React.FC<Props> = ({ emotions, goals }) => {
  // 감정 통계 계산
  const todayEmotions = emotions.filter((e) => {
    const today = new Date()
    const entryDate = new Date(e.date)
    return (
      today.getFullYear() === entryDate.getFullYear() &&
      today.getMonth() === entryDate.getMonth() &&
      today.getDate() === entryDate.getDate()
    )
  })

  const weekEmotions = emotions.filter((e) => {
    const entryDate = new Date(e.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return entryDate >= weekAgo
  })

  const avgEmotionScore = (emotions: EmotionEntry[]) => {
    if (emotions.length === 0) return 0
    const scores: Record<string, number> = {
      "very-sad": 1,
      sad: 2,
      neutral: 3,
      happy: 4,
      "very-happy": 5,
      angry: 2,
    }
    const total = emotions.reduce(
      (sum, e) => sum + (scores[e.emotion] || 3),
      0
    )
    return (total / emotions.length).toFixed(1)
  }

  const activeGoals = goals.filter((g) => g.status === "active").length
  const completedGoals = goals.filter((g) => g.status === "completed").length
  const avgProgress =
    goals.length > 0
      ? (
          goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
        ).toFixed(0)
      : 0

  // 최근 감정 트렌드
  const recentTrend =
    weekEmotions.length >= 2
      ? (() => {
          const recent = weekEmotions.slice(-3)
          const older = weekEmotions.slice(-6, -3)
          if (older.length === 0) return "stable"
          const recentAvg =
            recent.reduce(
              (sum, e) =>
                sum +
                ({ "very-sad": 1, sad: 2, neutral: 3, happy: 4, "very-happy": 5, angry: 2 }[
                  e.emotion
                ] || 3),
              0
            ) / recent.length
          const olderAvg =
            older.reduce(
              (sum, e) =>
                sum +
                ({ "very-sad": 1, sad: 2, neutral: 3, happy: 4, "very-happy": 5, angry: 2 }[
                  e.emotion
                ] || 3),
              0
            ) / older.length
          if (recentAvg > olderAvg + 0.3) return "improving"
          if (recentAvg < olderAvg - 0.3) return "declining"
          return "stable"
        })()
      : "stable"

  const stats = [
    {
      title: "오늘의 감정",
      value: todayEmotions.length > 0 ? avgEmotionScore(todayEmotions) : "-",
      subtitle: todayEmotions.length > 0 ? "기록됨" : "기록 없음",
      icon: "😊",
      color: "#667eea",
      trend: todayEmotions.length > 0 ? undefined : undefined,
    },
    {
      title: "주간 평균",
      value: weekEmotions.length > 0 ? avgEmotionScore(weekEmotions) : "-",
      subtitle: `${weekEmotions.length}일 기록`,
      icon: "📊",
      color: "#764ba2",
      trend: recentTrend,
    },
    {
      title: "활성 목표",
      value: activeGoals,
      subtitle: `${completedGoals}개 완료`,
      icon: "🎯",
      color: "#f5576c",
      trend: undefined,
    },
    {
      title: "평균 진행도",
      value: `${avgProgress}%`,
      subtitle: `${goals.length}개 목표`,
      icon: "📈",
      color: "#17a2b8",
      trend: undefined,
    },
  ]

  return (
    <div className='stats-cards'>
      {stats.map((stat, idx) => (
        <div key={idx} className='stat-card' style={{ "--card-color": stat.color } as React.CSSProperties}>
          <div className='stat-header'>
            <span className='stat-icon'>{stat.icon}</span>
            <h3 className='stat-title'>{stat.title}</h3>
          </div>
          <div className='stat-content'>
            <div className='stat-value'>{stat.value}</div>
            <div className='stat-subtitle'>{stat.subtitle}</div>
            {stat.trend && (
              <div className={`stat-trend ${stat.trend}`}>
                {stat.trend === "improving" && "📈 개선 중"}
                {stat.trend === "declining" && "📉 하락 중"}
                {stat.trend === "stable" && "➡️ 안정"}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards

