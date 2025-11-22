/** @format */

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// GitHub Pages를 위한 base path 설정
// 리포지토리 이름에 따라 자동으로 설정
const getBasePath = () => {
  // 환경 변수에서 리포지토리 이름 가져오기
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
  const basePath = process.env.VITE_BASE_PATH
  
  // VITE_BASE_PATH 환경 변수가 있으면 사용
  if (basePath) {
    return basePath
  }
  
  // GitHub Actions 환경에서 리포지토리 이름 사용
  if (repoName && process.env.GITHUB_ACTIONS === 'true') {
    return `/${repoName}/`
  }
  
  // 로컬 개발 시 기본값
  return '/ai-co-v2/'
}

// https://vitejs.dev/config/
export default defineConfig({
  base: getBasePath(),
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          charts: ["recharts"],
        },
      },
    },
  },
})
