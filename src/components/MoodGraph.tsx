/** @format */

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import React from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import "../styles/MoodGraph.css"
import { EmotionEntry } from "../types"

interface Props {
  emotions: EmotionEntry[]
}

const emotionScore: Record<string, number> = {
  "very-sad": 1,
  sad: 2,
  neutral: 3,
  happy: 4,
  "very-happy": 5,
}

const emotionLabel: Record<string, string> = {
  "very-sad": "매우 슬픔",
  sad: "슬픔",
  neutral: "보통",
  happy: "행복",
  "very-happy": "매우 행복",
}

export const MoodGraph: React.FC<Props> = ({ emotions }) => {
  // 날짜별로 감정 데이터 그룹화
  const groupedByDate = emotions.reduce((acc, emotion) => {
    const date = format(new Date(emotion.date), "MM/dd", { locale: ko })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(emotion)
    return acc
  }, {} as Record<string, EmotionEntry[]>)

  // 차트 데이터로 변환
  const chartData = Object.entries(groupedByDate)
    .map(([date, entries]) => {
      const avgScore =
        entries.reduce((sum, e) => sum + emotionScore[e.emotion], 0) /
        entries.length
      const maxIntensity = Math.max(...entries.map((e) => e.intensity))
      const mood = entries.map((e) => e.mood).join(", ")

      return {
        date,
        평균감정점수: Number(avgScore.toFixed(2)),
        강도: maxIntensity,
        기분: mood,
      }
    })
    .slice(-7) // 최근 7일

  const totalEntries = emotions.length
  const avgEmotionScore =
    emotions.length > 0
      ? (
          emotions.reduce((sum, e) => sum + emotionScore[e.emotion], 0) /
          emotions.length
        ).toFixed(2)
      : "0"

  // 감정 분포
  const emotionDistribution = Object.entries(
    emotions.reduce((acc, e) => {
      acc[e.emotion] = (acc[e.emotion] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).sort(([, a], [, b]) => b - a)

  return (
    <div className='mood-graph'>
      <h2>📊 감정 변화 그래프</h2>

      <div className='stats-summary'>
        <div className='stat-card'>
          <span className='stat-label'>총 기록 수</span>
          <span className='stat-value'>{totalEntries}</span>
        </div>
        <div className='stat-card'>
          <span className='stat-label'>평균 감정 점수</span>
          <span className='stat-value'>{avgEmotionScore}/5</span>
        </div>
      </div>

      {chartData.length > 0 ? (
        <>
          <div className='chart-container'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis
                  domain={[0, 5]}
                  label={{
                    value: "감정 점수",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className='custom-tooltip'>
                          <p className='date'>{data.date}</p>
                          <p className='score'>감정: {data.평균감정점수}/5</p>
                          <p className='intensity'>강도: {data.강도}/10</p>
                          <p className='mood'>기분: {data.기분}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='평균감정점수'
                  stroke='#8884d8'
                  dot={{ fill: "#8884d8", r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type='monotone'
                  dataKey='강도'
                  stroke='#82ca9d'
                  dot={{ fill: "#82ca9d", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className='emotion-distribution'>
            <h3>감정 분포</h3>
            <div className='distribution-bars'>
              {emotionDistribution.map(([emotion, count]) => (
                <div key={emotion} className='distribution-bar'>
                  <span className='emotion-label'>{emotionLabel[emotion]}</span>
                  <div className='bar-container'>
                    <div
                      className='bar-fill'
                      style={{
                        width: `${(count / totalEntries) * 100}%`,
                        backgroundColor: getEmotionColor(emotion),
                      }}
                    />
                  </div>
                  <span className='bar-count'>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className='empty-state'>
          아직 감정 데이터가 없습니다. 감정을 기록해보세요! 📝
        </p>
      )}
    </div>
  )
}

function getEmotionColor(emotion: string): string {
  const colors: Record<string, string> = {
    "very-sad": "#d32f2f",
    sad: "#ff6f00",
    neutral: "#fbc02d",
    happy: "#7cb342",
    "very-happy": "#1976d2",
  }
  return colors[emotion] || "#999"
}

export default MoodGraph
