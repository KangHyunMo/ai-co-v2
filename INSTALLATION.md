# 🚀 Mogle AI Coach - 설치 가이드

## 📦 설치형 앱 빌드 및 배포

### 🎯 개요

Mogle AI Coach는 웹 앱과 설치형 데스크톱 앱 두 가지 형태로 사용할 수 있습니다.

- **웹 앱**: 브라우저에서 바로 사용
- **설치형 앱**: Electron 기반 데스크톱 앱 (Windows, Mac, Linux)

---

## 🔧 개발 환경 설정

### 1. 필수 요구사항

```bash
# Node.js 16 이상
node --version  # v16.0.0 이상

# npm 또는 yarn
npm --version
```

### 2. 의존성 설치

```bash
# 프로젝트 루트에서
npm install
```

---

## 🌐 웹 앱 실행

### 개발 모드

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 미리보기
npm run preview
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

---

## 💻 설치형 앱 (Electron)

### 개발 모드 실행

```bash
npm run electron:dev
```

이 명령어는:
1. Vite 개발 서버를 시작
2. Electron 앱을 실행

### 프로덕션 빌드

#### Windows

```bash
npm run electron:build:win
```

빌드된 설치 파일은 `release/` 폴더에 생성됩니다.

#### macOS

```bash
npm run electron:build:mac
```

#### Linux

```bash
npm run electron:build:linux
```

#### 모든 플랫폼

```bash
npm run electron:build
```

---

## 🤖 로컬 AI 모델 설정

### 모델 다운로드 및 설치

1. **모델 폴더 생성**

```bash
mkdir -p public/models/llama-3.2-1b
```

2. **모델 파일 다운로드**

Llama 모델을 다운로드하여 `public/models/llama-3.2-1b/` 폴더에 배치:

```
public/models/llama-3.2-1b/
├── manifest.json
├── tokenizer.json
└── ... (기타 모델 파일)
```

3. **모델 초기화**

앱 실행 후:
- 설정 패널 열기
- "모델 초기화" 버튼 클릭
- 모델 상태 확인

### 모델 없이 사용하기

모델이 없어도 룰 기반 AI가 작동합니다! 모델은 선택 사항입니다.

---

## 📱 배포 옵션

### 1. 웹 배포 (Vercel 추천)

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

### 2. 웹 배포 (Netlify)

1. Netlify 웹사이트 접속
2. `dist/` 폴더 드래그 앤 드롭
3. 배포 완료!

### 3. GitHub Pages

```bash
npm run build

# dist/ 폴더를 gh-pages 브랜치에 푸시
```

### 4. 설치형 앱 배포

빌드된 설치 파일을:
- 직접 배포
- GitHub Releases에 업로드
- 자체 웹사이트에서 다운로드 제공

---

## 🛠️ 문제 해결

### Electron 빌드 오류

```bash
# 캐시 정리
npm cache clean --force
rm -rf node_modules
npm install

# 다시 빌드
npm run electron:build
```

### 모델 로드 실패

1. 브라우저 콘솔 확인
2. 모델 파일 경로 확인
3. CORS 설정 확인 (웹 앱의 경우)

### 빌드 크기 최적화

```bash
# 불필요한 파일 제거
npm run build -- --mode production
```

---

## 📋 체크리스트

### 웹 앱 배포 전

- [ ] `npm run build` 성공
- [ ] `npm run preview`로 테스트
- [ ] 모든 기능 정상 작동 확인
- [ ] 반응형 디자인 확인

### 설치형 앱 배포 전

- [ ] 모든 플랫폼에서 테스트
- [ ] 아이콘 파일 준비
- [ ] 설치 파일 크기 확인
- [ ] 자동 업데이트 설정 (선택)

---

## 🎨 커스터마이징

### 앱 아이콘 변경

1. 아이콘 파일 준비:
   - Windows: `build/icon.ico`
   - macOS: `build/icon.icns`
   - Linux: `build/icon.png`

2. `package.json`의 `build` 섹션 확인

### 앱 이름 변경

`package.json`에서:
```json
{
  "name": "your-app-name",
  "build": {
    "productName": "Your App Name"
  }
}
```

---

## 📚 추가 리소스

- [Electron 문서](https://www.electronjs.org/docs)
- [Vite 문서](https://vitejs.dev/)
- [Web LLM 문서](https://mlc.ai/web-llm/)

---

## 💡 팁

1. **개발 중**: `npm run dev` 사용
2. **테스트**: `npm run preview`로 프로덕션 빌드 테스트
3. **배포**: 빌드 전 반드시 테스트
4. **모델**: 큰 파일이므로 CDN 사용 고려

---

**Made with ❤️ by Mogle**

