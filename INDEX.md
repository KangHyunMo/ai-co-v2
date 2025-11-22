<!-- @format -->

# 📖 나만의 AI 코치 - 전체 문서 가이드

> 감정 추적, 목표 관리, AI 피드백을 한 곳에서! 🧠💡🎯

---

## 📚 문서 목차

### 🚀 빠른 시작

1. **[QUICKSTART.md](./QUICKSTART.md)** - 5분 안에 시작하기
   - 프로젝트 설치 및 실행
   - 기본 기능 가이드
   - 주요 명령어
   - 문제 해결

### 📘 상세 문서

2. **[README.md](./README.md)** - 전체 프로젝트 개요

   - 주요 기능 소개
   - 기술 스택
   - 프로젝트 구조
   - 설정 방법

3. **[UI_GUIDE.md](./UI_GUIDE.md)** - 사용자 인터페이스 가이드

   - 각 섹션별 상세 설명
   - 색상 팔레트
   - 반응형 디자인
   - 사용자 경험 흐름

4. **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** - 프로젝트 완성 보고서
   - 구현된 모든 기능
   - 프로젝트 구조
   - 기술 스택 상세
   - AI 알고리즘 설명
   - 향후 계획

### 🌐 배포 가이드

5. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 배포 전략
   - 웹 배포 옵션 (Vercel, Netlify, GitHub Pages, AWS)
   - 데스크톱 앱 (Electron)
   - 모바일 앱 (React Native, Capacitor)
   - PWA (Progressive Web App)
   - 성능 최적화

---

## 🎯 상황별 가이드

### 💻 개발자라면?

```
1. QUICKSTART.md 읽기
2. npm install && npm run dev 실행
3. src/components 폴더 탐색
4. 코드 수정 및 테스트
```

### 👤 일반 사용자라면?

```
1. QUICKSTART.md의 "시작하기" 섹션
2. 앱 실행 (npm run dev)
3. 기능 체험
4. 감정 기록 및 피드백 확인
```

### 🚀 배포하고 싶다면?

```
1. npm run build
2. DEPLOYMENT.md 참고
3. 선택한 플랫폼에 배포
4. 친구들과 공유!
```

### 🎨 커스터마이징하고 싶다면?

```
1. UI_GUIDE.md에서 색상 팔레트 확인
2. src/styles/*.css 수정
3. src/components 커스텀
4. npm run build로 확인
```

---

## 🔑 핵심 개념

### 감정 점수

- **1점**: 매우 슬픔 😢
- **2점**: 슬픔 😔
- **3점**: 보통 😐
- **4점**: 행복 😊
- **5점**: 매우 행복 😄

### 트렌드 판정

- **개선 중**: 감정이 점점 좋아지는 중 📈
- **안정적**: 감정이 일정한 수준 유지 ➡️
- **악화 중**: 감정이 점점 나빠지는 중 📉

### 데이터 저장

- ✅ 모든 데이터 브라우저에 저장
- ✅ 완전히 오프라인 작동
- ✅ 서버 통신 없음
- ✅ 개인정보 완벽 보호

---

## 📊 주요 기능

### 1. 감정 추적 (Emotion Tracker)

```
입력 → 감정 선택 → 강도 설정 → 기분 설명 → 저장 → 분석
```

### 2. 목표 모니터링 (Goal Monitor)

```
목표 생성 → 진행도 업데이트 → 상태 추적 → 달성
```

### 3. 감정 시각화 (Mood Graph)

```
데이터 수집 → 차트 생성 → 패턴 분석 → 인사이트
```

### 4. AI 피드백 (AI Feedback)

```
감정 분석 → 트렌드 감지 → 패턴 인식 → 맞춤형 조언
```

---

## 🛠️ 파일 구조 빠른 참고

```
src/
├── components/          # React 컴포넌트
│   ├── EmotionTracker   # 감정 기록
│   ├── GoalMonitor      # 목표 관리
│   ├── MoodGraph        # 그래프 표시
│   └── AIFeedback       # AI 분석
├── utils/
│   └── aiAnalytics.ts   # 분석 로직
├── types/
│   └── index.ts         # 타입 정의
├── styles/              # CSS 스타일
├── App.tsx              # 메인 컴포넌트
└── main.tsx             # 시작점
```

---

## 🎓 학습 경로

### 초급 (사용법)

1. [QUICKSTART.md](./QUICKSTART.md) 읽기
2. 앱 실행 및 기본 사용법 학습
3. 3-4개 감정 기록해보기
4. 목표 1-2개 생성해보기

### 중급 (커스터마이징)

1. [README.md](./README.md)에서 기술 스택 이해
2. [UI_GUIDE.md](./UI_GUIDE.md)에서 디자인 학습
3. `src/` 폴더 구조 이해
4. 색상이나 텍스트 수정해보기

### 고급 (확장)

1. [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)에서 알고리즘 이해
2. AI 분석 로직 수정
3. 새로운 컴포넌트 추가
4. 백엔드 API 연결

### 전문 (배포)

1. [DEPLOYMENT.md](./DEPLOYMENT.md) 숙독
2. 프로덕션 빌드 생성
3. 선택한 플랫폼에 배포
4. 모니터링 및 유지보수

---

## ❓ FAQ

### Q: 내 데이터는 어디에 저장되나요?

**A:** 모든 데이터는 당신의 브라우저 내에만 저장됩니다. 서버로 전송되지 않습니다.

### Q: 인터넷이 없어도 사용 가능한가요?

**A:** 네! 완전히 오프라인으로 작동합니다.

### Q: 다른 기기에서 사용할 수 있나요?

**A:** 현재는 각 브라우저에서 독립적으로 저장됩니다. 향후 클라우드 동기화 예정입니다.

### Q: 배포는 어렵나요?

**A:** 아닙니다! [DEPLOYMENT.md](./DEPLOYMENT.md)에 따라 하면 5분 안에 배포 가능합니다.

### Q: 모바일에서도 사용 가능한가요?

**A:** 네! 반응형 디자인으로 모든 기기에서 최적화됩니다.

---

## 🚨 문제 해결

### 앱이 실행되지 않음

```bash
# 1. 의존성 재설치
npm install

# 2. 캐시 삭제
npm cache clean --force

# 3. 다시 실행
npm run dev
```

### 감정 데이터가 표시되지 않음

```javascript
// 브라우저 콘솔에서 확인
console.log(localStorage.getItem("emotions"))
```

### 빌드 오류 발생

```bash
# TypeScript 컴파일 확인
npm run build

# 구체적인 오류 메시지 확인 후
# PROJECT_COMPLETE.md의 트러블슈팅 섹션 참고
```

---

## 📞 지원

### 더 알아보기

- React 공식 문서: https://react.dev
- Vite 공식 문서: https://vitejs.dev
- TypeScript 문서: https://www.typescriptlang.org

### 버그 보고

프로젝트 폴더의 `.github` 이슈 섹션 이용

---

## 🎉 시작하기

### 지금 바로 시작하세요! 🚀

```bash
# 1. 프로젝트 폴더로 이동
cd c:\work_app\ai-co

# 2. 의존성 설치 (이미 완료됨)
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 실행
http://localhost:5173
```

---

## 📈 학습 곡선

```
시간    난이도
0분      🟢 초급
5분      🟢 초급 (기본 사용법)
15분     🟡 중급 (기능 이해)
1시간    🟡 중급 (커스터마이징)
1-3시간  🔴 고급 (확장 및 배포)
```

---

## 💡 팁과 트릭

### 데이터 내보내기

```javascript
// 브라우저 콘솔에서
const data = {
  emotions: JSON.parse(localStorage.getItem("emotions")),
  goals: JSON.parse(localStorage.getItem("goals")),
}
console.log(JSON.stringify(data, null, 2))
```

### 빠른 테스트

```bash
npm run dev  # 개발 서버
npm run build # 프로덕션 빌드 테스트
npm run preview # 빌드 결과 미리보기
```

---

## 🌟 다음 단계

1. ✅ **앱 실행** - `npm run dev`
2. ✅ **기능 체험** - 감정 기록 및 목표 추가
3. ✅ **배포** - [DEPLOYMENT.md](./DEPLOYMENT.md) 참고
4. ✅ **공유** - 친구들과 함께 시작!

---

**축하합니다! 이제 당신의 개인 AI 코치와 함께 성장 여정을 시작하세요! 🌱💪**

Made with ❤️ for your wellbeing
