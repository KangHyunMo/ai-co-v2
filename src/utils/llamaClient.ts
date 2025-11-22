/** @format */

// Lightweight wrapper for an on-device Llama-like model.
// This file does not include a model — it provides detection, init,
// and a `generateResponse(prompt)` API. Place model files under `public/models/`.

let initialized = false
// hasModelFiles: model files are present under public/models/...
let hasModelFiles = false
// available: runtime or model handle is ready for inference
let available = false
let mlcRuntime: any = null
let mlcModel: any = null
let lastError: any = null

export async function initLlamaClient(): Promise<boolean> {
  if (initialized) return available
  initialized = true

  try {
    // Try to detect a model folder in public
    const manifestPaths = [
      "/models/llama-3.2-1b/manifest.json",
      "/models/llama-3-2-1b/manifest.json",
      "/models/llama-3-2-1b.ggml",
    ]

    for (const p of manifestPaths) {
      try {
        const resp = await fetch(p, { method: "HEAD" })
        if (resp.ok) {
          hasModelFiles = true
          break
        }
      } catch (e) {
        // ignore
      }
    }

    // Try to dynamically import @mlc-ai/web-llm and use its pipeline API first
    if (hasModelFiles) {
      try {
        const mod = await import("@mlc-ai/web-llm").catch(() => null)
        if (mod) {
          const modAny: any = mod as any

          // Prefer pipeline API: pipeline(task, modelId, options)
          const pipeline =
            modAny.pipeline ||
            (modAny.default && modAny.default.pipeline) ||
            null
          if (typeof pipeline === "function") {
            try {
              const modelId = "Llama-3.2-1B-Instruct"
              // Create pipeline instance (may return a callable or an object)
              mlcModel = await pipeline("text-generation", modelId, {
                model_dir: "/models/llama-3.2-1b/",
              })
              mlcRuntime = modAny
              available = true
            } catch (e) {
              console.warn("web-llm pipeline init failed:", e)
              lastError = e
            }
          } else {
            // Fallback to previous runtime-style initialization
            mlcRuntime =
              modAny.WebLLM ||
              (modAny.default && modAny.default.WebLLM) ||
              modAny

            if (mlcRuntime && typeof mlcRuntime.init === "function") {
              try {
                await mlcRuntime.init({ path: "/models/llama-3.2-1b/" })
              } catch (e) {
                console.warn("mlcRuntime.init error:", e)
                lastError = e
              }
            }

            try {
              if (typeof mlcRuntime.createModel === "function") {
                mlcModel = await mlcRuntime.createModel({
                  model: "/models/llama-3.2-1b/",
                })
              } else if (typeof mlcRuntime.loadModel === "function") {
                mlcModel = await mlcRuntime.loadModel("/models/llama-3.2-1b/")
              }
            } catch (e) {
              console.warn("mlcRuntime model load failed:", e)
              lastError = e
            }

            if (mlcRuntime || mlcModel) available = true
          }
        }
      } catch (e) {
        console.warn("web-llm dynamic import failed:", e)
        lastError = e
      }
    }
  } catch (error) {
    console.warn("llamaClient init error:", error)
    lastError = error
  }

  return available
}

/**
 * 경량화된 로컬 AI - 모델 없이 작동
 * 룰 기반 AI를 사용하여 빠르고 가벼운 응답 생성
 */
export async function generateResponse(prompt: string): Promise<string> {
  // 모델이 없어도 룰 기반 AI로 작동
  // 모델은 선택 사항이며, 있으면 사용하고 없으면 룰 기반 사용
  // If we have a loaded model handle, prefer that
  try {
    // If pipeline returned a callable function, call it
    if (typeof mlcModel === "function") {
      try {
        const out = await mlcModel(prompt)
        if (typeof out === "string") return out
        if (out && out.text) return out.text
        if (Array.isArray(out) && out.length > 0 && out[0].generated_text)
          return out[0].generated_text
        if (out && out.result) return String(out.result)
      } catch (e) {
        console.warn("mlcModel(call) failed:", e)
      }
    }
    if (mlcModel && typeof mlcModel.generate === "function") {
      const out = await mlcModel.generate(prompt)
      if (typeof out === "string") return out
      if (out && out.text) return out.text
      if (out && out.result) return String(out.result)
    }

    // Some runtimes expose a .generate on the runtime itself
    if (mlcRuntime && typeof mlcRuntime.generate === "function") {
      const out = await mlcRuntime.generate(prompt)
      if (typeof out === "string") return out
      if (out && out.text) return out.text
      if (out && out.result) return String(out.result)
    }

    // Some runtimes have a run/predict function
    if (mlcRuntime && typeof mlcRuntime.run === "function") {
      const out = await mlcRuntime.run(prompt)
      if (typeof out === "string") return out
      if (out && out.text) return out.text
      if (out && out.result) return String(out.result)
    }
  } catch (e) {
    console.warn("Local model generate failed:", e)
  }

  // 모델이 없어도 룰 기반 AI로 작동 (경량화)
  // 이 방식이 더 빠르고 가볍습니다
  try {
    // 프롬프트에서 키워드 추출
    const keywords = extractKeywords(prompt)
    return generateRuleBasedResponse(keywords, prompt)
  } catch (e) {
    return "AI 분석을 완료했습니다. 감정을 계속 기록해보세요."
  }
}

/**
 * 키워드 추출 (경량화)
 */
function extractKeywords(text: string): string[] {
  const keywords: string[] = []
  const positiveWords = ["좋", "행복", "기쁨", "즐거", "신남", "만족"]
  const negativeWords = ["슬픔", "우울", "불안", "스트레스", "힘듦", "피곤"]
  const neutralWords = ["보통", "평범", "안정", "차분"]

  const lowerText = text.toLowerCase()
  
  if (positiveWords.some(w => lowerText.includes(w))) keywords.push("positive")
  if (negativeWords.some(w => lowerText.includes(w))) keywords.push("negative")
  if (neutralWords.some(w => lowerText.includes(w))) keywords.push("neutral")
  
  return keywords
}

/**
 * 룰 기반 응답 생성 (경량화)
 */
function generateRuleBasedResponse(keywords: string[], prompt: string): string {
  const responses: string[] = []
  
  if (keywords.includes("positive")) {
    responses.push("좋은 기분이 느껴지네요! 이 긍정적인 에너지를 유지해보세요. ✨")
    responses.push("행복한 순간을 기록해주셔서 감사합니다. 계속해서 긍정적인 활동을 이어가세요. 🌟")
  } else if (keywords.includes("negative")) {
    responses.push("요즘 힘드시는 것 같아요. 자신을 아끼고 충분한 휴식을 취해보세요. 💙")
    responses.push("어려운 시기를 겪고 계시는군요. 작은 것부터 시작해서 점진적으로 개선해보세요. 🌱")
  } else {
    responses.push("감정을 꾸준히 기록하시는 모습이 훌륭합니다. 계속 관찰해보세요. 📊")
    responses.push("안정적인 감정 상태를 유지하고 계시네요. 현재의 균형을 유지하세요. 😌")
  }
  
  // 프롬프트 길이에 따라 추가 응답
  if (prompt.length > 100) {
    responses.push("상세한 기록을 해주셔서 감사합니다. 이런 정보들이 더 나은 분석을 도와줍니다.")
  }
  
  return responses[Math.floor(Math.random() * responses.length)]
}

export function isLlamaAvailable(): boolean {
  return available
}

export function getLlamaStatus(): {
  hasModelFiles: boolean
  runtimeAvailable: boolean
  modelLoaded: boolean
  lastError: any
} {
  return {
    hasModelFiles,
    runtimeAvailable: !!mlcRuntime,
    modelLoaded: !!mlcModel,
    lastError,
  }
}
