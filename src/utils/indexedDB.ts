/** @format */

import { EmotionEntry, Goal } from "../types"

// IndexedDB 설정
const DB_NAME = "MogleDB"
const DB_VERSION = 1
const EMOTIONS_STORE = "emotions"
const GOALS_STORE = "goals"

// IndexedDB 초기화
export async function initIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // 감정 스토어
      if (!db.objectStoreNames.contains(EMOTIONS_STORE)) {
        const emotionStore = db.createObjectStore(EMOTIONS_STORE, {
          keyPath: "id",
        })
        emotionStore.createIndex("date", "date", { unique: false })
      }

      // 목표 스토어
      if (!db.objectStoreNames.contains(GOALS_STORE)) {
        const goalStore = db.createObjectStore(GOALS_STORE, { keyPath: "id" })
        goalStore.createIndex("status", "status", { unique: false })
        goalStore.createIndex("createdAt", "createdAt", { unique: false })
      }
    }
  })
}

// IndexedDB에 저장
export async function saveToIndexedDB<T extends { id: string }>(
  storeName: string,
  data: T[]
): Promise<void> {
  if (!data || data.length === 0) {
    // 빈 배열이면 저장하지 않음 (기존 데이터 유지)
    return Promise.resolve()
  }

  const db = await initIndexedDB()
  const transaction = db.transaction(storeName, "readwrite")
  const store = transaction.objectStore(storeName)

  return new Promise((resolve, reject) => {
    // 기존 데이터 삭제
    const clearRequest = store.clear()

    clearRequest.onsuccess = () => {
      // 새 데이터 추가 (put 사용 - id가 있으면 업데이트, 없으면 추가)
      let completed = 0
      const total = data.length

      if (total === 0) {
        transaction.oncomplete = () => resolve()
        return
      }

      data.forEach((item) => {
        const putRequest = store.put(item) // add 대신 put 사용
        
        putRequest.onsuccess = () => {
          completed++
          if (completed === total) {
            // 모든 항목이 저장되면 완료
            setTimeout(() => {
              if (transaction.readyState === 'active' || transaction.readyState === 'inactive') {
                resolve()
              }
            }, 0)
          }
        }

        putRequest.onerror = () => {
          console.error("항목 저장 실패:", putRequest.error)
          completed++
          if (completed === total) {
            resolve() // 일부 실패해도 계속 진행
          }
        }
      })

      transaction.oncomplete = () => {
        resolve()
      }

      transaction.onerror = () => {
        console.error("트랜잭션 오류:", transaction.error)
        reject(transaction.error)
      }
    }

    clearRequest.onerror = () => {
      console.error("데이터 삭제 실패:", clearRequest.error)
      // 삭제 실패해도 put으로 덮어쓰기 시도
      let completed = 0
      const total = data.length

      data.forEach((item) => {
        const putRequest = store.put(item)
        
        putRequest.onsuccess = () => {
          completed++
          if (completed === total) {
            resolve()
          }
        }

        putRequest.onerror = () => {
          completed++
          if (completed === total) {
            resolve()
          }
        }
      })
    }
  })
}

// IndexedDB에서 로드
export async function loadFromIndexedDB<T>(storeName: string): Promise<T[]> {
  const db = await initIndexedDB()
  const transaction = db.transaction(storeName, "readonly")
  const store = transaction.objectStore(storeName)

  return new Promise((resolve, reject) => {
    const request = store.getAll()

    request.onsuccess = () => {
      resolve(request.result as T[])
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

// 감정 저장
export async function saveEmotions(emotions: EmotionEntry[]): Promise<void> {
  try {
    // Ensure dates are stored as ISO strings for broad compatibility
    const toStore = emotions.map((e) => ({
      ...e,
      date: e.date instanceof Date ? e.date.toISOString() : e.date,
    }))
    
    // IndexedDB에 저장
    await saveToIndexedDB(EMOTIONS_STORE, toStore as any)
    
    // localStorage에도 백업 (IndexedDB 실패 시 복구용)
    try {
      localStorage.setItem("emotions_backup", JSON.stringify(toStore))
      localStorage.setItem("emotions_backup_timestamp", Date.now().toString())
    } catch (e) {
      console.warn("localStorage 백업 실패:", e)
    }
    
    console.log(`✅ 감정 ${emotions.length}개 저장 완료`)
  } catch (error) {
    console.error("감정 저장 실패:", error)
    // 실패 시 localStorage로 폴백
    try {
      const toStore = emotions.map((e) => ({
        ...e,
        date: e.date instanceof Date ? e.date.toISOString() : e.date,
      }))
      localStorage.setItem("emotions", JSON.stringify(toStore))
      localStorage.setItem("emotions_fallback", "true")
    } catch (e) {
      console.error("localStorage 폴백도 실패:", e)
    }
  }
}

// 감정 로드
export async function loadEmotions(): Promise<EmotionEntry[]> {
  try {
    const raw = await loadFromIndexedDB<any>(EMOTIONS_STORE)
    console.log(`📂 IndexedDB에서 감정 ${raw.length}개 로드`)
    
    // Convert date strings back to Date objects where applicable
    const emotions = raw.map((e: any) => ({
      ...e,
      date: e.date ? new Date(e.date) : new Date(),
    }))
    
    // 빈 배열이 아니면 반환
    if (emotions.length > 0) {
      return emotions
    }
    
    // IndexedDB가 비어있으면 localStorage에서 복구 시도
    const backup = localStorage.getItem("emotions_backup")
    if (backup) {
      console.log("📦 localStorage 백업에서 복구 시도")
      const parsed = JSON.parse(backup)
      return parsed.map((e: any) => ({
        ...e,
        date: e.date ? new Date(e.date) : new Date(),
      }))
    }
    
    return []
  } catch (error) {
    console.error("감정 로드 실패:", error)
    // localStorage에서 복구
    try {
      const backup = localStorage.getItem("emotions_backup") || localStorage.getItem("emotions")
      if (backup) {
        console.log("📦 localStorage에서 복구")
        const parsed = JSON.parse(backup)
        return parsed.map((e: any) => ({
          ...e,
          date: e.date ? new Date(e.date) : new Date(),
        }))
      }
    } catch (e) {
      console.error("localStorage 복구 실패:", e)
    }
    return []
  }
}

// 목표 저장
export async function saveGoals(goals: Goal[]): Promise<void> {
  try {
    const toStore = goals.map((g) => ({
      ...g,
      targetDate:
        g.targetDate instanceof Date
          ? g.targetDate.toISOString()
          : g.targetDate,
      createdAt:
        g.createdAt instanceof Date ? g.createdAt.toISOString() : g.createdAt,
    }))
    
    // IndexedDB에 저장
    await saveToIndexedDB(GOALS_STORE, toStore as any)
    
    // localStorage에도 백업
    try {
      localStorage.setItem("goals_backup", JSON.stringify(toStore))
      localStorage.setItem("goals_backup_timestamp", Date.now().toString())
    } catch (e) {
      console.warn("localStorage 백업 실패:", e)
    }
    
    console.log(`✅ 목표 ${goals.length}개 저장 완료`)
  } catch (error) {
    console.error("목표 저장 실패:", error)
    // 실패 시 localStorage로 폴백
    try {
      const toStore = goals.map((g) => ({
        ...g,
        targetDate:
          g.targetDate instanceof Date
            ? g.targetDate.toISOString()
            : g.targetDate,
        createdAt:
          g.createdAt instanceof Date ? g.createdAt.toISOString() : g.createdAt,
      }))
      localStorage.setItem("goals", JSON.stringify(toStore))
      localStorage.setItem("goals_fallback", "true")
    } catch (e) {
      console.error("localStorage 폴백도 실패:", e)
    }
  }
}

// 목표 로드
export async function loadGoals(): Promise<Goal[]> {
  try {
    const raw = await loadFromIndexedDB<any>(GOALS_STORE)
    console.log(`📂 IndexedDB에서 목표 ${raw.length}개 로드`)
    
    const goals = raw.map((g: any) => ({
      ...g,
      targetDate: g.targetDate ? new Date(g.targetDate) : new Date(),
      createdAt: g.createdAt ? new Date(g.createdAt) : new Date(),
    }))
    
    // 빈 배열이 아니면 반환
    if (goals.length > 0) {
      return goals
    }
    
    // IndexedDB가 비어있으면 localStorage에서 복구 시도
    const backup = localStorage.getItem("goals_backup")
    if (backup) {
      console.log("📦 localStorage 백업에서 복구 시도")
      const parsed = JSON.parse(backup)
      return parsed.map((g: any) => ({
        ...g,
        targetDate: g.targetDate ? new Date(g.targetDate) : new Date(),
        createdAt: g.createdAt ? new Date(g.createdAt) : new Date(),
      }))
    }
    
    return []
  } catch (error) {
    console.error("목표 로드 실패:", error)
    // localStorage에서 복구
    try {
      const backup = localStorage.getItem("goals_backup") || localStorage.getItem("goals")
      if (backup) {
        console.log("📦 localStorage에서 복구")
        const parsed = JSON.parse(backup)
        return parsed.map((g: any) => ({
          ...g,
          targetDate: g.targetDate ? new Date(g.targetDate) : new Date(),
          createdAt: g.createdAt ? new Date(g.createdAt) : new Date(),
        }))
      }
    } catch (e) {
      console.error("localStorage 복구 실패:", e)
    }
    return []
  }
}

// 모든 데이터 내보내기
export async function exportAllData(): Promise<{
  emotions: EmotionEntry[]
  goals: Goal[]
}> {
  const emotions = await loadEmotions()
  const goals = await loadGoals()
  return { emotions, goals }
}

// 모든 데이터 삭제
export async function deleteAllData(): Promise<void> {
  const db = await initIndexedDB()

  const emotionTx = db.transaction(EMOTIONS_STORE, "readwrite")
  emotionTx.objectStore(EMOTIONS_STORE).clear()

  const goalTx = db.transaction(GOALS_STORE, "readwrite")
  goalTx.objectStore(GOALS_STORE).clear()

  localStorage.removeItem("emotions_backup")
  localStorage.removeItem("goals_backup")
}

// 데이터베이스 상태 확인
export async function getDBStats(): Promise<{
  emotionsCount: number
  goalsCount: number
  lastUpdated: string
}> {
  const emotions = await loadEmotions()
  const goals = await loadGoals()

  return {
    emotionsCount: emotions.length,
    goalsCount: goals.length,
    lastUpdated: new Date().toISOString(),
  }
}
