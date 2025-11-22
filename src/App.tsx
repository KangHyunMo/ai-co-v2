/** @format */

import { useEffect, useState } from "react"
import "./App.css"
import AIFeedback from "./components/AIFeedback"
import { EmotionTracker } from "./components/EmotionTracker"
import GoalMonitor from "./components/GoalMonitor"
import MoodGraph from "./components/MoodGraph"
import SettingsPanel from "./components/SettingsPanel"
import StatsCards from "./components/StatsCards"
import { EmotionEntry, Goal } from "./types"
import {
  loadEmotions,
  loadGoals,
  saveEmotions,
  saveGoals,
} from "./utils/indexedDB"

function App() {
  const [emotions, setEmotions] = useState<EmotionEntry[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [activeSection, setActiveSection] = useState<string>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // 데스크톱에서는 기본적으로 열림, 모바일에서는 닫힘
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768
    }
    return true
  })
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    (localStorage.getItem("mogle_theme") as "light" | "dark") === "dark"
      ? "dark"
      : "light"
  )


  // 데이터 저장 (초기 로드 후에만 저장)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedEmotions = await loadEmotions()
        const savedGoals = await loadGoals()
        setEmotions(savedEmotions)
        setGoals(savedGoals)
        setIsInitialLoad(false) // 초기 로드 완료
      } catch (error) {
        console.error("데이터 로드 실패:", error)
        setIsInitialLoad(false)
      }
    }
    loadData()
  }, [])

  // 데이터 저장 (초기 로드 완료 후에만)
  useEffect(() => {
    if (!isInitialLoad && emotions.length >= 0) {
      saveEmotions(emotions).catch((error) => {
        console.error("감정 저장 오류:", error)
      })
    }
  }, [emotions, isInitialLoad])

  // theme apply + persist
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("mogle_theme", theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  useEffect(() => {
    if (!isInitialLoad && goals.length >= 0) {
      saveGoals(goals).catch((error) => {
        console.error("목표 저장 오류:", error)
      })
    }
  }, [goals, isInitialLoad])

  const handleAddEmotion = (emotion: EmotionEntry) => {
    setEmotions([...emotions, emotion])
  }

  const handleDeleteEmotion = (emotionId: string) => {
    if (window.confirm("정말 이 감정 기록을 삭제하시겠습니까?")) {
      setEmotions(emotions.filter((e) => e.id !== emotionId))
    }
  }

  const handleAddGoal = (goal: Goal) => {
    setGoals([...goals, goal])
  }

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)))
  }

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm("정말 이 목표를 삭제하시겠습니까?")) {
      setGoals(goals.filter((g) => g.id !== goalId))
    }
  }

  return (
    <div className='app'>
      {/* 사이드바 오버레이 (모바일) */}
      {sidebarOpen && (
        <div
          className='sidebar-overlay'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className='logo-section'>
          {/* 모바일 닫기 버튼 */}
          <button
            className='sidebar-close-btn'
            onClick={() => setSidebarOpen(false)}
            aria-label='메뉴 닫기'
          >
            ✕
          </button>
          <h1 className='logo'>
            🧠 <span>Mogle</span>
          </h1>
          <p className='tagline'>개인 AI 코치</p>
        </div>

        <nav className='nav-menu'>
          <button
            className={`nav-item ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("dashboard")
              // 모바일에서 메뉴 항목 클릭 시 사이드바 닫기
              if (window.innerWidth <= 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <span className='icon'>📊</span>
            <span className='label'>대시보드</span>
          </button>
          <button
            className={`nav-item ${
              activeSection === "emotion" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("emotion")
              if (window.innerWidth <= 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <span className='icon'>😊</span>
            <span className='label'>감정 기록</span>
          </button>
          <button
            className={`nav-item ${activeSection === "goals" ? "active" : ""}`}
            onClick={() => {
              setActiveSection("goals")
              if (window.innerWidth <= 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <span className='icon'>🎯</span>
            <span className='label'>목표 관리</span>
          </button>
          <button
            className={`nav-item ${
              activeSection === "analytics" ? "active" : ""
            }`}
            onClick={() => {
              setActiveSection("analytics")
              if (window.innerWidth <= 768) {
                setSidebarOpen(false)
              }
            }}
          >
            <span className='icon'>📈</span>
            <span className='label'>분석</span>
          </button>
        </nav>

        <div className='sidebar-footer'>
          <p className='footer-text'>Made by Mogle</p>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className={`main-wrapper ${!sidebarOpen ? "sidebar-closed" : ""}`}>
        {/* 헤더 */}
        <header className='app-header'>
          <button
            className='menu-toggle'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <button
            className='theme-toggle'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label='Toggle theme'
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <div className='header-content'>
            <h2>나만의 AI 코치</h2>
            <p>당신의 감정과 목표를 함께 추적해보세요</p>
          </div>
          <SettingsPanel />
        </header>

        {/* 콘텐츠 영역 */}
        <div className='content-area'>
          {/* 대시보드 */}
          {activeSection === "dashboard" && (
            <div className='section-container dashboard-container'>
              <StatsCards emotions={emotions} goals={goals} />
              <div className='dashboard-grid'>
                <div className='grid-item'>
                  <AIFeedback emotions={emotions} />
                </div>
                <div className='grid-item'>
                  <MoodGraph emotions={emotions} />
                </div>
                <div className='grid-item'>
                  <GoalMonitor
                    goals={goals}
                    onAddGoal={handleAddGoal}
                    onUpdateGoal={handleUpdateGoal}
                    onDeleteGoal={handleDeleteGoal}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 감정 기록 */}
          {activeSection === "emotion" && (
            <div className='section-container'>
              <EmotionTracker 
                onAddEmotion={handleAddEmotion}
                emotions={emotions}
                onDeleteEmotion={handleDeleteEmotion}
              />
            </div>
          )}

          {/* 목표 관리 */}
          {activeSection === "goals" && (
            <div className='section-container'>
              <GoalMonitor
                goals={goals}
                onAddGoal={handleAddGoal}
                onUpdateGoal={handleUpdateGoal}
                onDeleteGoal={handleDeleteGoal}
              />
            </div>
          )}

          {/* 분석 */}
          {activeSection === "analytics" && (
            <div className='section-container analytics-grid'>
              <div className='grid-item full'>
                <MoodGraph emotions={emotions} />
              </div>
              <div className='grid-item'>
                <AIFeedback emotions={emotions} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
