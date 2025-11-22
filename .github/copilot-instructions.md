<!-- @format -->

# AI Coach Development Instructions

## Project Structure

- React 18 + TypeScript + Vite
- Emotion tracking with daily records
- Goal monitoring system
- AI-powered feedback generation
- Recharts for data visualization

## Key Features to Develop

- [x] Emotion Tracker Component
- [x] Goal Monitor Component
- [x] Mood Graph Component
- [x] AI Feedback Component
- [x] Analytics and AI Logic
- [x] Local Storage Integration
- [ ] Backend API (Future)
- [ ] Cloud Sync (Future)

## Development Guidelines

1. All data is stored locally in browser storage
2. Use TypeScript for type safety
3. Follow CSS naming conventions (BEM-like)
4. Components are functional with hooks
5. AI logic uses rule-based analysis (can be enhanced with ML)

## Build & Deployment

- `npm run dev` - Start development server
- `npm run build` - Build for production
- Deploy dist folder to Vercel, Netlify, or GitHub Pages

## Files Created

- Components: EmotionTracker, GoalMonitor, MoodGraph, AIFeedback
- Utils: aiAnalytics.ts (AI logic and storage)
- Types: index.ts (TypeScript definitions)
- Styles: Individual CSS files per component
- Config: vite.config.ts, tsconfig.json

## Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Test emotion tracking and feedback
4. Build and deploy to production
