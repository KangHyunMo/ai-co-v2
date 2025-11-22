<!-- @format -->

# 🚀 빠른 시작 가이드 (Quick Start Guide)

## 📌 프로젝트 구조 (Project Structure)

```
ai-co/
├── src/
│   ├── components/           # React 컴포넌트들
│   │   ├── EmotionTracker.tsx    # 감정 기록 페이지
│   │   ├── GoalMonitor.tsx       # 목표 관리 페이지
│   │   ├── MoodGraph.tsx         # 감정 그래프 차트
│   │   └── AIFeedback.tsx        # AI 코치 피드백
│   ├── utils/
│   │   └── aiAnalytics.ts    # AI 분석 로직
│   ├── types/
│   │   └── index.ts          # TypeScript 타입
│   ├── styles/               # CSS 스타일
│   ├── App.tsx               # 메인 앱 컴포넌트
│   └── main.tsx              # 진입점
├── README.md                 # 상세 문서
├── DEPLOYMENT.md             # 배포 가이드
├── package.json              # 의존성 관리
└── vite.config.ts            # Vite 설정
```

## 🎯 시작하기 (Getting Started)

### 1단계: 프로젝트 설치

```bash
# 의존성 설치
npm install

# 또는 yarn 사용
yarn install
```

### 2단계: 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하면 앱이 실행됩니다.

### 3단계: 기능 체험

#### 💭 감정 기록하기

1. 📱 **감정 선택** - 5가지 감정 중 선택
2. 📊 **강도 설정** - 1-10 스케일에서 강도 조정
3. 💬 **기분 설명** - 현재 기분을 한두 단어로 표현
4. 📝 **노트 추가** - 추가 생각이나 경험 기록
5. ✨ **저장** - "감정 기록하기" 버튼 클릭

#### 🎯 목표 추가하기

1. **+새 목표 추가** 버튼 클릭
2. 목표 제목과 설명 작성
3. 카테고리 선택 (건강, 업무, 개인, 관계, 학습)
4. 완료 기간 설정 (기본값: 30일)
5. 목표 등록

#### 📊 진행도 업데이트하기

- **+5%**: 진행도 5% 증가
- **-5%**: 진행도 5% 감소
- 100% 도달하면 자동으로 **완료** 상태 전환

#### 🤖 AI 피드백 받기

- AI가 자동으로 감정 트렌드 분석
- 개인 맞춤형 조언 제공
- 좋은 순간과 힘든 순간 식별
- **분석 새로고침** 버튼으로 언제든 재분석 가능

#### 📈 감정 변화 보기

- 최근 7일간의 감정 그래프
- 평균 감정 점수 확인
- 감정 분포도 분석
- 기분 변화 추이 시각화

## 🔧 주요 명령어 (Commands)

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 프로젝트 미리보기
npm run preview

# 린트 검사 (선택사항)
npm run lint
```

## 💾 데이터 저장 (Data Storage)

- 모든 데이터는 **브라우저 로컬 스토리지**에 저장
- 서버가 필요 없음 (100% 오프라인 작동)
- 완전한 개인정보 보호
- 브라우저 캐시 삭제 시 데이터 손실 가능

### 데이터 내보내기

```javascript
// 브라우저 콘솔에서 실행
const emotions = JSON.parse(localStorage.getItem("emotions"))
const goals = JSON.parse(localStorage.getItem("goals"))
console.log({ emotions, goals })
// 또는 JSON 파일로 다운로드하기
```

## 🎨 커스터마이징 (Customization)

### 색상 변경

`src/components/*.css` 파일에서 색상 코드 수정:

- EmotionTracker: `#667eea` → 다른 색상으로 변경
- GoalMonitor: `#f5576c` → 다른 색상으로 변경
- MoodGraph: `#a8edea` → 다른 색상으로 변경

### 감정 추가/제거

`src/components/EmotionTracker.tsx`의 `emotionOptions` 배열 수정

### 목표 카테고리 추가

`src/types/index.ts`의 `Goal` 타입 수정

## 🚀 배포하기 (Deployment)

### Vercel (추천)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
npm run build
# dist 폴더를 gh-pages 브랜치에 푸시
```

자세한 배포 가이드는 **DEPLOYMENT.md** 참고

## ⚠️ 문제 해결 (Troubleshooting)

### 1. "npm: 명령을 찾을 수 없음"

→ Node.js 재설치 필요: https://nodejs.org/

### 2. 포트 5173이 이미 사용 중

```bash
# 다른 포트 사용
npm run dev -- --port 3000
```

### 3. 데이터가 표시되지 않음

→ 브라우저 개발자 도구 > 응용 프로그램 > 로컬 스토리지 확인

### 4. 스타일이 적용되지 않음

```bash
# Vite 서버 재시작
npm run dev
```

## 📚 추가 리소스 (Resources)

- React 공식 문서: https://react.dev
- Vite 공식 문서: https://vitejs.dev
- TypeScript 공식 문서: https://www.typescriptlang.org
- Recharts (그래프 라이브러리): https://recharts.org

## 🤝 기여하기 (Contributing)

버그를 발견했거나 개선 아이디어가 있으신가요?
GitHub Issues에 보고해주세요!

## 📄 라이선스

MIT 라이선스 - 자유롭게 사용하세요!

---

**축하합니다! 🎉 이제 당신의 AI 코치 앱을 사용할 준비가 되었습니다!**

**매일 감정을 기록하고 자신의 변화를 관찰해보세요. 당신은 성장하고 있습니다! 🌱**
