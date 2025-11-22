/** @format */

import React, { useEffect, useState } from "react"
import "../styles/AIFeedback.css"
import { AIFeedback, EmotionEntry, PatternAnalysis } from "../types"
import {
  generateResponse,
  initLlamaClient,
  isLlamaAvailable,
} from "../utils/llamaClient"
import {
  analyzeWithLocalAI,
  generateLocalAIFeedback,
  advancedPatternAnalysis,
} from "../utils/localAI"

interface Props {
  emotions: EmotionEntry[]
}

export const AIFeedbackComponent: React.FC<Props> = ({ emotions }) => {
  const [analysis, setAnalysis] = useState<PatternAnalysis | null>(null)
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [advancedAnalysis, setAdvancedAnalysis] = useState<any>(null)

  useEffect(() => {
    generateAnalysis()
  }, [emotions])

  const generateAnalysis = async () => {
    setLoading(true)
    try {
      // 로컬 AI 분석 사용
      const analysisResult = analyzeWithLocalAI(
        emotions.map((e) => ({
          emotion: e.emotion,
          date: e.date instanceof Date ? e.date.toISOString() : e.date,
          mood: e.mood,
        }))
      )
      setAnalysis(analysisResult)

      // 고급 패턴 분석
      const advanced = advancedPatternAnalysis(
        emotions.map((e) => ({
          emotion: e.emotion,
          date: e.date instanceof Date ? e.date.toISOString() : e.date,
          mood: e.mood,
          intensity: e.intensity,
        }))
      )
      setAdvancedAnalysis(advanced)

      // 로컬 AI 피드백 생성
      let feedbackResult = generateLocalAIFeedback(analysisResult, emotions)

      // If a local model is available, try to get a richer response
      try {
        const detected = await initLlamaClient()
        if (detected || isLlamaAvailable()) {
          const prompt = `User emotions summary: ${
            analysisResult.emotionalTrend
          }\nInsights: ${analysisResult.insights.join(
            ", "
          )}\nRecommendations: ${analysisResult.recommendations.join(
            ", "
          )}\nProvide a short supportive message in Korean.`
          const modelText = await generateResponse(prompt)
          if (modelText && modelText.length > 0) {
            feedbackResult = {
              ...feedbackResult,
              message: modelText,
              confidence: 0.9,
            }
          }
        }
      } catch (e) {
        // model failed — keep rule-based feedback
        console.warn("Local model not used:", e)
      }

      setFeedback(feedbackResult)
    } catch (error) {
      console.error("분석 중 오류 발생:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!analysis || !feedback) {
    return (
      <div className='ai-feedback'>
        <h2>🤖 AI 코치 피드백</h2>
        <p className='loading'>분석 중입니다...</p>
      </div>
    )
  }

  return (
    <div className='ai-feedback'>
      <h2>🤖 AI 코치 피드백</h2>

      <div className='feedback-card'>
        <div className='feedback-message'>
          <p className='main-feedback'>"{feedback.message}"</p>
          <span className={`feedback-type ${feedback.type}`}>
            {feedback.type === "insight" && "💡 인사이트"}
            {feedback.type === "encouragement" && "💪 격려"}
            {feedback.type === "suggestion" && "💭 제안"}
            {feedback.type === "warning" && "⚠️ 주의"}
          </span>
        </div>
      </div>

      <div className='analysis-section'>
        <div className='analysis-card'>
          <h3>📈 감정 트렌드</h3>
          <p className='trend-text'>{analysis.emotionalTrend}</p>
        </div>

        {analysis.insights.length > 0 && (
          <div className='analysis-card'>
            <h3>💭 인사이트</h3>
            <ul className='insights-list'>
              {analysis.insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recommendations.length > 0 && (
          <div className='analysis-card'>
            <h3>🎯 추천사항</h3>
            <ul className='recommendations-list'>
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.moodPeaks.length > 0 && (
          <div className='analysis-card'>
            <h3>😊 좋은 기분 순간</h3>
            <div className='mood-tags'>
              {analysis.moodPeaks.map((mood, idx) => (
                <span key={idx} className='mood-tag positive'>
                  {mood}
                </span>
              ))}
            </div>
          </div>
        )}

        {analysis.moodDips.length > 0 && (
          <div className='analysis-card'>
            <h3>😔 힘든 순간</h3>
            <div className='mood-tags'>
              {analysis.moodDips.map((mood, idx) => (
                <span key={idx} className='mood-tag negative'>
                  {mood}
                </span>
              ))}
            </div>
          </div>
        )}

        {advancedAnalysis && (
          <>
            <div className='analysis-card health-score'>
              <h3>💚 건강 점수</h3>
              <div className='health-score-value'>
                <span className='score-number'>{advancedAnalysis.healthScore}</span>
                <span className='score-label'>/ 100</span>
              </div>
              <div className='health-score-bar'>
                <div
                  className='health-score-fill'
                  style={{ width: `${advancedAnalysis.healthScore}%` }}
                ></div>
              </div>
            </div>

            {advancedAnalysis.weeklyPattern && (
              <div className='analysis-card'>
                <h3>📅 주간 패턴</h3>
                <p className='pattern-text'>{advancedAnalysis.weeklyPattern}</p>
              </div>
            )}

            {advancedAnalysis.anomalies.length > 0 && (
              <div className='analysis-card'>
                <h3>⚠️ 주의사항</h3>
                <ul className='anomalies-list'>
                  {advancedAnalysis.anomalies.map((anomaly: string, idx: number) => (
                    <li key={idx}>{anomaly}</li>
                  ))}
                </ul>
              </div>
            )}

            {advancedAnalysis.improvementSuggestions.length > 0 && (
              <div className='analysis-card suggestions-card'>
                <h3>💡 개선 제안</h3>
                <ul className='suggestions-list'>
                  {advancedAnalysis.improvementSuggestions.map(
                    (suggestion: string, idx: number) => (
                      <li key={idx}>✨ {suggestion}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <button
        onClick={generateAnalysis}
        className='refresh-btn'
        disabled={loading}
      >
        {loading ? "분석 중..." : "분석 새로고침 🔄"}
      </button>
    </div>
  )
}

export default AIFeedbackComponent
