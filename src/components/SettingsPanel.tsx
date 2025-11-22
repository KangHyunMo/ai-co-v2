/** @format */

import React, { useEffect, useState } from "react"
import "../styles/SettingsPanel.css"
import { deleteAllData, exportAllData, getDBStats } from "../utils/indexedDB"
import { getLlamaStatus, initLlamaClient } from "../utils/llamaClient"

const SettingsPanel: React.FC = () => {
  const [dbStats, setDbStats] = useState<{
    emotionsCount: number
    goalsCount: number
    lastUpdated: string
  } | null>(null)
  const [modelStatus, setModelStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    refresh()
    // 주기적으로 상태 업데이트
    const interval = setInterval(refresh, 5000)
    return () => clearInterval(interval)
  }, [])

  async function refresh() {
    try {
      const s = await getDBStats()
      setDbStats(s)
    } catch (e) {
      setDbStats(null)
    }

    try {
      setModelStatus(getLlamaStatus())
    } catch (e) {
      setModelStatus(null)
    }
  }

  async function handleInitModel() {
    setLoading(true)
    try {
      const ok = await initLlamaClient()
      setModelStatus(getLlamaStatus())
      if (ok) {
        alert("✅ 로컬 AI 모델이 성공적으로 초기화되었습니다!")
      } else {
        alert("⚠️ 모델 파일을 찾을 수 없습니다. public/models/ 폴더에 모델을 설치하세요.")
      }
    } catch (e) {
      console.error(e)
      alert("❌ 모델 초기화 중 오류가 발생했습니다. 콘솔을 확인하세요.")
    } finally {
      setLoading(false)
    }
  }

  async function handleExport() {
    try {
      const data = await exportAllData()
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mogle_backup_${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      alert("✅ 데이터가 성공적으로 내보내졌습니다!")
    } catch (e) {
      alert("❌ 데이터 내보내기 중 오류가 발생했습니다.")
    }
  }

  async function handleClear() {
    if (!confirm("⚠️ 정말로 모든 로컬 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) return
    try {
      await deleteAllData()
      await refresh()
      alert("✅ 모든 데이터가 삭제되었습니다.")
    } catch (e) {
      alert("❌ 데이터 삭제 중 오류가 발생했습니다.")
    }
  }

  const isModelReady = modelStatus?.modelLoaded && modelStatus?.runtimeAvailable
  const hasModelFiles = modelStatus?.hasModelFiles

  return (
    <div className='settings-panel'>
      <div className='db-stats'>
        <strong>📊 데이터</strong>
        <div>
          {dbStats ? (
            <>
              <span className='stat-value'>{dbStats.emotionsCount}</span> 감정 ·{" "}
              <span className='stat-value'>{dbStats.goalsCount}</span> 목표
            </>
          ) : (
            "불러오는 중..."
          )}
        </div>
      </div>

      <div className={`model-status ${isModelReady ? 'ready' : hasModelFiles ? 'partial' : 'not-ready'}`}>
        <strong>🤖 로컬 AI</strong>
        <div className='model-status-indicator'>
          {isModelReady ? (
            <span className='status-badge success'>✅ 준비됨</span>
          ) : hasModelFiles ? (
            <span className='status-badge warning'>⚠️ 초기화 필요</span>
          ) : (
            <span className='status-badge error'>❌ 모델 없음</span>
          )}
        </div>
      </div>

      <div className='settings-actions'>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className='btn btn-info'
          title='상세 정보'
        >
          {showDetails ? "▲" : "▼"}
        </button>
        <button
          onClick={handleInitModel}
          disabled={loading}
          className='btn btn-primary'
          title='로컬 AI 모델 초기화'
        >
          {loading ? "⏳ 초기화중..." : "🤖 모델 초기화"}
        </button>
        <button onClick={handleExport} className='btn btn-export' title='데이터 백업'>
          💾 내보내기
        </button>
        <button onClick={handleClear} className='btn btn-danger' title='모든 데이터 삭제'>
          🗑️ 삭제
        </button>
      </div>

      {showDetails && (
        <div className='settings-details'>
          <div className='details-section'>
            <h4>📊 데이터베이스 상태</h4>
            {dbStats ? (
              <ul>
                <li>감정 기록: {dbStats.emotionsCount}개</li>
                <li>목표: {dbStats.goalsCount}개</li>
                <li>마지막 업데이트: {new Date(dbStats.lastUpdated).toLocaleString('ko-KR')}</li>
              </ul>
            ) : (
              <p>로딩 중...</p>
            )}
          </div>

          <div className='details-section'>
            <h4>🤖 로컬 AI 모델 상태</h4>
            {modelStatus ? (
              <ul>
                <li>
                  모델 파일:{" "}
                  {modelStatus.hasModelFiles ? (
                    <span className='status-ok'>✅ 있음</span>
                  ) : (
                    <span className='status-error'>❌ 없음</span>
                  )}
                </li>
                <li>
                  런타임:{" "}
                  {modelStatus.runtimeAvailable ? (
                    <span className='status-ok'>✅ 준비됨</span>
                  ) : (
                    <span className='status-error'>❌ 없음</span>
                  )}
                </li>
                <li>
                  모델 로드:{" "}
                  {modelStatus.modelLoaded ? (
                    <span className='status-ok'>✅ 완료</span>
                  ) : (
                    <span className='status-error'>❌ 미완료</span>
                  )}
                </li>
                {modelStatus.lastError && (
                  <li className='error-info'>
                    오류: {String(modelStatus.lastError)}
                  </li>
                )}
              </ul>
            ) : (
              <p>로딩 중...</p>
            )}
          </div>

          <div className='details-section'>
            <h4>📝 모델 설치 가이드</h4>
            <ol>
              <li>public/models/ 폴더를 생성하세요</li>
              <li>Llama 모델 파일을 다운로드하세요</li>
              <li>모델을 public/models/llama-3.2-1b/ 에 배치하세요</li>
              <li>"모델 초기화" 버튼을 클릭하세요</li>
            </ol>
            <p className='help-text'>
              💡 모델이 없어도 룰 기반 AI가 작동합니다!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPanel
