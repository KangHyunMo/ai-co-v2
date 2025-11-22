<!-- @format -->

# Deployment Guide for AI Coach App

## 🌐 Web Deployment Options

### 1. **Vercel** (Recommended - Easiest)

Best for: Fast deployment, automatic CI/CD

```bash
npm install -g vercel
vercel login
vercel
```

### 2. **Netlify**

Best for: Easy drag-and-drop deployment

```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

Or use their web interface:

1. Go to [netlify.com](https://netlify.com)
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### 3. **GitHub Pages**

Best for: Free hosting for GitHub repositories

```bash
npm run build
# Add to package.json: "homepage": "https://username.github.io/ai-coach"
# Deploy dist/ folder to gh-pages branch
```

### 4. **AWS Amplify**

Best for: Scalable production deployments

```bash
npm install -g @aws-amplify/cli
amplify init
amplify publish
```

---

## 📱 Native App Deployment

### **Windows/Mac/Linux Desktop App with Electron**

1. Install Electron:

```bash
npm install electron --save-dev
```

2. Create `public/electron.js`:

```javascript
const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, "../dist/index.html")}`
  win.loadURL(startUrl)
}

app.on("ready", createWindow)
```

3. Update package.json:

```json
{
  "main": "public/electron.js",
  "homepage": "./",
  "scripts": {
    "react-dev": "vite",
    "build": "tsc -b && vite build",
    "electron-dev": "concurrently \"npm run react-dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron-build": "npm run build && electron-builder"
  }
}
```

### **Mobile App with React Native**

```bash
npx create-expo-app AICoach
cd AICoach
# Copy components logic and adapt for React Native
```

### **Mobile App with Capacitor (iOS/Android)**

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npm run build
npx cap add android
npx cap add ios
npx cap open android  # or ios
```

### **Progressive Web App (PWA)**

Create `public/manifest.json`:

```json
{
  "name": "나만의 AI 코치",
  "short_name": "AI Coach",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🔧 Performance Optimization

### Build Optimization

- Code splitting enabled
- Tree shaking active
- CSS minification
- Asset compression

### Check build size:

```bash
npm install -g vite-plugin-visualizer
npm run build -- --analyzeBundle
```

---

## 📊 Monitor Deployment

### Add Analytics

```javascript
// src/utils/analytics.ts
export const trackEvent = (name: string, data?: any) => {
  if (process.env.VITE_ANALYTICS_ID) {
    // Add your analytics service
    console.log("Event:", name, data)
  }
}
```

---

## 🚀 Production Checklist

- [ ] Test all features thoroughly
- [ ] Optimize images and assets
- [ ] Remove console.log statements
- [ ] Enable GZIP compression
- [ ] Set up SSL/HTTPS
- [ ] Configure caching headers
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Create privacy policy
- [ ] Test on mobile devices
- [ ] Verify localStorage quota
- [ ] Set up automatic backups
- [ ] Plan scalability

---

## 💡 Environment Variables

Create `.env` for different environments:

```env
# .env.production
VITE_API_URL=https://api.yoursite.com
VITE_ENVIRONMENT=production
VITE_ANALYTICS_ID=your_analytics_id
```

---

## 📞 Support

For deployment issues:

- Check Vite documentation: https://vitejs.dev/guide/ssr.html
- React deployment: https://react.dev/learn/start-a-new-react-project
- GitHub Actions for CI/CD automation

---

**Deploy your AI Coach today and start your wellness journey! 🌱**
