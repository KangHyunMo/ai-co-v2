/** @format */

import React, { useState } from "react"
import "../styles/GoalMonitor.css"
import { Goal } from "../types"

interface Props {
  goals: Goal[]
  onAddGoal: (goal: Goal) => void
  onUpdateGoal: (goal: Goal) => void
  onDeleteGoal: (goalId: string) => void
}

export const GoalMonitor: React.FC<Props> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) => {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<Goal["category"]>("personal")
  const [daysToComplete, setDaysToComplete] = useState(30)

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()

    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + daysToComplete)

    const goal: Goal = {
      id: Date.now().toString(),
      title,
      description,
      targetDate,
      progress: 0,
      category,
      status: "active",
      createdAt: new Date(),
    }

    onAddGoal(goal)
    setTitle("")
    setDescription("")
    setCategory("personal")
    setDaysToComplete(30)
    setShowForm(false)
    alert("목표가 등록되었습니다! 💪")
  }

  const handleProgressChange = (goal: Goal, newProgress: number) => {
    onUpdateGoal({
      ...goal,
      progress: Math.min(100, newProgress),
      status: newProgress >= 100 ? "completed" : "active",
    })
  }

  const daysLeft = (goal: Goal) => {
    const today = new Date()
    const diff = goal.targetDate.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className='goal-monitor'>
      <h2>🎯 목표 모니터링</h2>

      <button className='add-goal-btn' onClick={() => setShowForm(!showForm)}>
        + 새 목표 추가
      </button>

      {showForm && (
        <form onSubmit={handleAddGoal} className='goal-form'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='목표 제목'
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='목표 설명'
            rows={3}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Goal["category"])}
          >
            <option value='health'>건강</option>
            <option value='work'>업무</option>
            <option value='personal'>개인</option>
            <option value='relationship'>관계</option>
            <option value='learning'>학습</option>
          </select>

          <div className='days-input'>
            <label>완료 기간 (일)</label>
            <input
              type='number'
              value={daysToComplete}
              onChange={(e) => setDaysToComplete(Number(e.target.value))}
              min='1'
              max='365'
            />
          </div>

          <button type='submit' className='submit-btn'>
            목표 등록하기
          </button>
        </form>
      )}

      <div className='goals-list'>
        {goals.length === 0 ? (
          <p className='empty-state'>
            아직 목표가 없습니다. 새로운 목표를 추가해보세요! 🚀
          </p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className={`goal-card ${goal.status}`}>
              <div className='goal-header'>
                <h3>{goal.title}</h3>
                <span className={`category-badge ${goal.category}`}>
                  {goal.category === "health" && "건강"}
                  {goal.category === "work" && "업무"}
                  {goal.category === "personal" && "개인"}
                  {goal.category === "relationship" && "관계"}
                  {goal.category === "learning" && "학습"}
                </span>
              </div>

              <p className='goal-description'>{goal.description}</p>

              <div className='progress-section'>
                <div className='progress-bar'>
                  <div
                    className='progress-fill'
                    style={{ width: `${goal.progress}%` }}
                  >
                    <span className='progress-text'>{goal.progress}%</span>
                  </div>
                </div>

                <div className='progress-controls'>
                  <button
                    onClick={() =>
                      handleProgressChange(goal, goal.progress - 5)
                    }
                    className='btn-decrease'
                  >
                    -5%
                  </button>
                  <button
                    onClick={() =>
                      handleProgressChange(goal, goal.progress + 5)
                    }
                    className='btn-increase'
                  >
                    +5%
                  </button>
                </div>
              </div>

              <div className='goal-footer'>
                <span className='days-left'>
                  남은 일수: {daysLeft(goal) > 0 ? daysLeft(goal) : "완료!"}
                </span>
                <div className='goal-actions'>
                  {goal.progress >= 100 && (
                    <span className='completion-badge'>✅ 완료!</span>
                  )}
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className='btn-delete'
                    title='목표 삭제'
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GoalMonitor
