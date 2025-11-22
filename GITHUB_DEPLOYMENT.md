# 🚀 GitHub 자동 배포 가이드

## 📋 개요

이 프로젝트는 GitHub Actions를 사용하여 자동으로 배포됩니다:
- **GitHub Pages**: 웹 앱 자동 배포
- **Android APK**: Android 앱 빌드 및 배포

---

## 🔧 설정 방법

### 1. GitHub Pages 활성화

1. GitHub 리포지토리로 이동
2. **Settings** → **Pages** 메뉴 클릭
3. **Source**에서 **GitHub Actions** 선택
4. 저장

### 2. 리포지토리 이름 확인

리포지토리 이름에 따라 base path가 자동으로 설정됩니다:
- 리포지토리 이름: `ai-co-v2` → base path: `/ai-co-v2/`
- 루트 도메인 사용 시: `/`

### 3. 자동 배포 트리거

다음 경우에 자동으로 배포됩니다:
- `main` 또는 `master` 브랜치에 push
- 수동 실행 (Actions 탭에서)

---

## 📱 배포 워크플로우

### GitHub Pages 배포

```yaml
파일: .github/workflows/deploy-pages.yml
```

**동작:**
1. 코드 체크아웃
2. Node.js 설정
3. 의존성 설치
4. 빌드 실행
5. 404.html 생성 (SPA 라우팅 문제 해결)
6. GitHub Pages에 배포

**배포 URL:**
```
https://[사용자명].github.io/[리포지토리명]/
```

### Android APK 빌드

```yaml
파일: .github/workflows/build-android.yml
```

**동작:**
1. 코드 체크아웃
2. Node.js 및 Java 설정
3. 웹 앱 빌드
4. Capacitor 설정
5. Android 프로젝트 빌드
6. APK 파일 생성
7. Artifact로 업로드

**APK 다운로드:**
- Actions 탭 → 최신 워크플로우 실행 → Artifacts

---

## 🐛 404 오류 해결

### 문제
GitHub Pages에서 SPA 라우팅 시 404 오류 발생

### 해결
1. **404.html 파일 생성**: `dist/404.html`이 `index.html`의 복사본으로 생성됨
2. **자동 리다이렉트**: 404 페이지에서 자동으로 index.html로 리다이렉트
3. **Base path 설정**: Vite 설정에서 자동으로 base path 설정

### 수동 설정 (필요시)

리포지토리 이름이 다른 경우 `vite.config.ts` 수정:

```typescript
export default defineConfig({
  base: '/your-repo-name/', // 리포지토리 이름으로 변경
  // ...
})
```

---

## 📦 로컬 빌드 및 테스트

### GitHub Pages용 빌드

```bash
# 기본 빌드
npm run build

# 특정 base path로 빌드
npm run build:pages
```

### 빌드 결과 확인

```bash
npm run preview
```

---

## 🔍 문제 해결

### 배포가 안 될 때

1. **Actions 탭 확인**
   - 워크플로우 실행 상태 확인
   - 에러 메시지 확인

2. **Pages 설정 확인**
   - Settings → Pages
   - Source가 "GitHub Actions"로 설정되어 있는지 확인

3. **권한 확인**
   - Settings → Actions → General
   - Workflow permissions가 "Read and write permissions"로 설정

### 404 오류가 계속 발생할 때

1. **404.html 파일 확인**
   ```bash
   ls dist/404.html
   ```

2. **Base path 확인**
   - 브라우저 개발자 도구 → Network 탭
   - 리소스 경로 확인

3. **수동으로 404.html 생성**
   ```bash
   cp dist/index.html dist/404.html
   ```

---

## 📝 커스터마이징

### Base Path 변경

`vite.config.ts`에서 수정:

```typescript
export default defineConfig({
  base: '/your-custom-path/',
  // ...
})
```

### 빌드 스크립트 수정

`package.json`에서 수정:

```json
{
  "scripts": {
    "build": "tsc -b && vite build && node scripts/fix-404.js"
  }
}
```

---

## 🎯 배포 체크리스트

### 배포 전 확인

- [ ] 코드가 main/master 브랜치에 push됨
- [ ] GitHub Pages 설정 완료
- [ ] Actions 권한 설정 완료
- [ ] 빌드가 성공적으로 완료됨

### 배포 후 확인

- [ ] GitHub Pages URL 접속 가능
- [ ] 모든 페이지가 정상 작동
- [ ] 404 오류 없음
- [ ] 모바일 반응형 정상 작동

---

## 💡 팁

1. **빠른 배포**: `workflow_dispatch`로 수동 실행 가능
2. **태그 배포**: Android APK는 태그(`v*`)로 릴리스 생성
3. **캐시 활용**: npm 캐시로 빌드 시간 단축
4. **Artifact 보관**: APK 파일은 30일간 보관

---

## 📚 참고 자료

- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

**Made with ❤️ by Mogle**

