/** @format */

import React, { useState } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import "../styles/EmotionTracker.css"
import { EmotionEntry } from "../types"

interface Props {
  onAddEmotion: (emotion: EmotionEntry) => void
  emotions: EmotionEntry[]
  onDeleteEmotion?: (emotionId: string) => void
}

const emotionOptions = [
  { value: "very-sad", label: "매우 슬픔", emoji: "😢" },
  { value: "sad", label: "슬픔", emoji: "😔" },
  { value: "neutral", label: "보통", emoji: "😐" },
  { value: "happy", label: "행복", emoji: "😊" },
  { value: "very-happy", label: "매우 행복", emoji: "😄" },
]

export const EmotionTracker: React.FC<Props> = ({ 
  onAddEmotion, 
  emotions = [],
  onDeleteEmotion 
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("neutral")
  const [intensity, setIntensity] = useState(5)
  const [mood, setMood] = useState("")
  const [note, setNote] = useState("")
  const [historyExpanded, setHistoryExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emotion: EmotionEntry = {
      id: Date.now().toString(),
      date: new Date(),
      emotion: selectedEmotion as any,
      intensity,
      mood,
      note,
    }

    onAddEmotion(emotion)

    // Reset form
    setSelectedEmotion("neutral")
    setIntensity(5)
    setMood("")
    setNote("")

    alert("감정이 기록되었습니다! 📝")
  }

  return (
    <div className='emotion-tracker'>
      <h2>🎯 오늘의 감정을 기록해주세요</h2>

      <form onSubmit={handleSubmit} className='emotion-form'>
        <div className='emotion-buttons'>
          {emotionOptions.map((option) => (
            <button
              key={option.value}
              type='button'
              className={`emotion-btn ${
                selectedEmotion === option.value ? "active" : ""
              }`}
              onClick={() => setSelectedEmotion(option.value)}
              title={option.label}
            >
              <span className='emoji'>{option.emoji}</span>
              <span className='label'>{option.label}</span>
            </button>
          ))}
        </div>

        <div className='form-group'>
          <label>강도 (1-10)</label>
          <input
            type='range'
            min='1'
            max='10'
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className='intensity-slider'
          />
          <span className='intensity-value'>{intensity}/10</span>
        </div>

        <div className='form-group'>
          <label>기분 상태 (예: 피곤함, 스트레스, 활기참)</label>
          <input
            type='text'
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder='현재 기분을 한 두 단어로 표현해주세요'
            className='input-field'
            required
          />
        </div>

        <div className='form-group'>
          <label>추가 노트</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='오늘의 경험이나 생각을 자유롭게 작성해주세요'
            className='textarea-field'
            rows={4}
          />
        </div>

        <button type='submit' className='submit-btn'>
          감정 기록하기 ✨
        </button>
      </form>

      {/* 감정 히스토리 */}
      {emotions.length > 0 && (
        <div className='emotion-history'>
          <div className='history-header-section'>
            <h3>📝 감정 기록 히스토리 ({emotions.length}개)</h3>
            <button
              type='button'
              onClick={() => setHistoryExpanded(!historyExpanded)}
              className='history-toggle-btn'
            >
              {historyExpanded ? '접기 ▲' : '펼치기 ▼'}
            </button>
          </div>
          {historyExpanded && (
            <div className='history-list'>
            {emotions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((emotion) => {
                const emotionInfo = emotionOptions.find(
                  (opt) => opt.value === emotion.emotion
                )
                return (
                  <div key={emotion.id} className='history-item'>
                    <div className='history-header'>
                      <div className='history-emoji'>{emotionInfo?.emoji}</div>
                      <div className='history-info'>
                        <div className='history-date'>
                          {format(new Date(emotion.date), "yyyy년 MM월 dd일 HH:mm", {
                            locale: ko,
                          })}
                        </div>
                        <div className='history-emotion'>
                          {emotionInfo?.label} (강도: {emotion.intensity}/10)
                        </div>
                        {emotion.mood && (
                          <div className='history-mood'>기분: {emotion.mood}</div>
                        )}
                        {emotion.note && (
                          <div className='history-note'>{emotion.note}</div>
                        )}
                      </div>
                    </div>
                    {onDeleteEmotion && (
                      <button
                        onClick={() => onDeleteEmotion(emotion.id)}
                        className='btn-delete-emotion'
                        title='기록 삭제'
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// export default EmotionTracker
