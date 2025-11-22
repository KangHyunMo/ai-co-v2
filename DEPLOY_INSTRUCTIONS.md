<!-- @format -->

# GitHub Pages 배포 가이드

## 설정 완료 사항

1. ✅ GitHub Actions workflow 파일 생성 (`.github/workflows/deploy.yml`)
2. ✅ Vite base path 설정 (`/ai-co-v2/`)
3. ✅ Git 저장소 초기화 및 커밋 완료

## 다음 단계

### 1. GitHub 저장소 생성

GitHub에서 `ai-co-v2` 이름으로 새 저장소를 생성하세요.

### 2. 원격 저장소 추가 및 푸시

```bash
git remote add origin https://github.com/KangHyunMo/ai-co-v2.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 설정

1. GitHub 저장소로 이동
2. Settings → Pages 메뉴 클릭
3. Source에서 "GitHub Actions" 선택
4. 저장

### 4. 자동 배포

- `main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다
- 배포된 사이트: `https://YOUR_USERNAME.github.io/ai-co-v2/`

## 수동 배포 (빌드된 파일만 올리기)

만약 로컬에서 빌드한 파일만 올리고 싶다면:

```bash
# 1. 빌드
npm run build

# 2. dist 폴더를 커밋 (임시로 .gitignore 수정 필요)
# .gitignore에서 dist 제거 후
git add dist
git commit -m "Add built files"
git push
```

하지만 권장하는 방법은 GitHub Actions를 사용하는 것입니다.
