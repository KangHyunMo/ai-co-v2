<!-- @format -->

# 🧠 나만의 AI 코치 (Personal AI Coach)

> Your personal psychological consultant powered by AI - Track emotions, monitor goals, and receive personalized feedback

## 📋 Features

### 1. 🎯 Emotion Tracking (감정 추적)

- Daily emotion recording with 5 levels (very sad → very happy)
- Emotion intensity rating (1-10)
- Mood state description
- Personal notes and reflections

### 2. 📊 Mood Graph (감정 변화 그래프)

- Real-time mood visualization over 7 days
- Emotion distribution analysis
- Intensity tracking
- Visual trend identification

### 3. 🎯 Goal Monitoring (목표 모니터링)

- Create and track personal goals
- 5 categories: Health, Work, Personal, Relationships, Learning
- Progress tracking with +/- 5% adjustments
- Deadline management

### 4. 🤖 AI Coach Feedback (AI 코치 피드백)

- Automatic emotional trend analysis
- Personalized insights and recommendations
- Mood pattern identification
- Encouragement and suggestions based on your data

### 5. 💾 Data Persistence

- All data stored locally in browser storage
- No external server required
- Private and secure

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/
│   ├── EmotionTracker.tsx      # Daily emotion recording
│   ├── GoalMonitor.tsx         # Goal management
│   ├── MoodGraph.tsx           # Emotion visualization
│   └── AIFeedback.tsx          # AI analysis and feedback
├── utils/
│   └── aiAnalytics.ts          # AI analysis logic
├── types/
│   └── index.ts                # TypeScript definitions
├── styles/
│   ├── EmotionTracker.css
│   ├── GoalMonitor.css
│   ├── MoodGraph.css
│   └── AIFeedback.css
├── App.tsx                     # Main component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 📱 App Deployment

### Deploy to Web

#### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

### Deploy as Native App

#### Using Electron (Windows/Mac/Linux)

```bash
npm install electron --save-dev
```

#### Using Tauri (Windows/Mac/Linux - Lightweight)

```bash
npm create tauri-app@latest
```

#### Using React Native (Mobile)

```bash
npx react-native init AICoach
```

#### Using Capacitor (iOS/Android)

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

## 🔧 Configuration

### Vite Config

- TypeScript support enabled
- React Fast Refresh for hot module replacement
- Optimized bundle splitting
- Source maps for production builds

### Environment Variables

Create `.env` file for future API integrations:

```
VITE_API_URL=your_api_url
VITE_APP_VERSION=1.0.0
```

## 📊 AI Analytics Features

The app includes a rule-based AI system that:

- Analyzes emotional trends using linear regression
- Identifies mood peaks and dips
- Generates personalized feedback
- Tracks goal progress and provides recommendations
- Stores all data locally for privacy

### Algorithm Details

- **Trend Detection**: 7-day moving average with linear regression
- **Pattern Recognition**: Mood clustering and categorization
- **Feedback Generation**: Context-aware recommendations based on patterns

## 🎨 UI/UX Design

- **Responsive**: Mobile, tablet, and desktop optimized
- **Modern Design**: Gradient backgrounds and smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation
- **Dark Mode Ready**: Can be extended with theme support

## 🔒 Privacy & Security

- ✅ **Local Storage Only**: No data sent to external servers
- ✅ **No Tracking**: Complete privacy
- ✅ **HTTPS Recommended**: For deployment
- ✅ **Encrypted localStorage**: Plan to add IndexedDB encryption

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Charting**: Recharts
- **Date Handling**: date-fns
- **Styling**: CSS3 with modern features
- **State Management**: React Hooks

## 🆕 최신 업데이트 (v2.1)

### ✨ 새로운 기능

- ✅ **경량화된 로컬 AI** - 모델 없이 작동하는 빠르고 가벼운 룰 기반 AI
- ✅ **모바일 앱 지원** - Capacitor 기반 Android/iOS 앱 (플레이스토어 배포 준비 완료)
- ✅ **UI 레이아웃 개선** - 헤더/사이드바 반응형 개선, 모바일 최적화
- ✅ **설치형 앱 지원** - Electron 기반 데스크톱 앱 (Windows, Mac, Linux)
- ✅ **강화된 로컬 AI 관리** - 모델 상태 모니터링, 상세 설정 패널
- ✅ **대시보드 통계 카드** - 실시간 통계 및 트렌드 표시
- ✅ **고급 패턴 분석** - 주간 패턴, 이상 징후 감지, 건강 점수
- ✅ **개선된 AI 피드백** - 더 스마트한 분석 및 개인화된 조언

### 🚀 설치형 앱 사용하기

```bash
# 개발 모드
npm run electron:dev

# Windows 빌드
npm run electron:build:win

# macOS 빌드
npm run electron:build:mac

# Linux 빌드
npm run electron:build:linux
```

### 📱 모바일 앱 빌드 (플레이스토어 배포)

```bash
# 의존성 설치
npm install

# Android 프로젝트 열기
npm run mobile:android

# iOS 프로젝트 열기 (Mac만)
npm run mobile:ios

# 빌드 및 동기화
npm run mobile:build:android
npm run mobile:build:ios
```

자세한 내용은 [INSTALLATION.md](./INSTALLATION.md)와 [MOBILE_DEPLOYMENT.md](./MOBILE_DEPLOYMENT.md)를 참고하세요.

### 🤖 경량화된 로컬 AI

- **모델 없이 작동**: 큰 모델 파일 없이도 룰 기반 AI로 완벽 작동
- **빠른 응답**: 모델 로딩 없이 즉시 응답
- **가벼운 용량**: 앱 크기 최소화 (약 5MB)
- **선택적 모델**: 필요시 모델 추가 가능 (선택 사항)

## 📈 Future Enhancements

- [ ] Backend API integration for cloud sync
- [ ] Machine Learning model for better predictions
- [ ] Export data as PDF reports
- [ ] Social sharing features
- [ ] Multi-language support
- [x] Dark mode theme ✅
- [ ] Notifications and reminders
- [ ] Integration with calendar apps
- [ ] Voice input for emotions
- [ ] Wearable device integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💬 Support

For issues, questions, or suggestions, please open an GitHub issue.

---

**Made with ❤️ for your wellbeing**

나만의 AI 코치 - Your personal journey to better emotional health starts here! 🌱
