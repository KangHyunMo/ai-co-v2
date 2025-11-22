# 📱 모바일 앱 배포 가이드 (플레이스토어)

## 🎯 개요

Mogle AI Coach를 Android/iOS 모바일 앱으로 배포하는 가이드입니다.

---

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
npx cap sync
```

### 2. Android 빌드

```bash
# Android 프로젝트 열기
npx cap open android

# 또는 직접 빌드
cd android
./gradlew assembleRelease
```

### 3. iOS 빌드 (Mac만 가능)

```bash
npx cap open ios
```

---

## 📦 Android 플레이스토어 배포

### 1. 프로젝트 빌드

```bash
# 웹 앱 빌드
npm run build

# Capacitor 동기화
npx cap sync android
```

### 2. Android Studio에서 작업

```bash
# Android Studio 열기
npx cap open android
```

### 3. 서명 키 생성 (처음 한 번만)

```bash
cd android/app
keytool -genkey -v -keystore mogle-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mogle
```

### 4. build.gradle 설정

`android/app/build.gradle` 파일에 서명 설정 추가:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../mogle-release-key.jks')
            storePassword 'YOUR_STORE_PASSWORD'
            keyAlias 'mogle'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

### 5. APK/AAB 빌드

Android Studio에서:
1. Build → Generate Signed Bundle / APK
2. Android App Bundle 선택
3. 서명 정보 입력
4. 빌드 완료

또는 명령줄에서:

```bash
cd android
./gradlew bundleRelease  # AAB 파일 생성
./gradlew assembleRelease  # APK 파일 생성
```

### 6. 플레이스토어 업로드

1. [Google Play Console](https://play.google.com/console) 접속
2. 새 앱 만들기
3. 앱 정보 입력:
   - 앱 이름: Mogle AI Coach
   - 짧은 설명: 개인 AI 코치
   - 전체 설명: 감정 추적과 목표 관리를 도와주는 AI 코치 앱
4. AAB 파일 업로드
5. 스크린샷 및 그래픽 자산 업로드
6. 개인정보 처리방침 URL 제공
7. 검토 제출

---

## 🍎 iOS 앱스토어 배포

### 1. 프로젝트 빌드

```bash
npm run build
npx cap sync ios
```

### 2. Xcode에서 작업

```bash
npx cap open ios
```

### 3. 앱 설정

1. Xcode에서 프로젝트 열기
2. Signing & Capabilities 설정
3. Bundle Identifier 설정: `com.mogle.aicoach`
4. Team 선택 (Apple Developer 계정 필요)

### 4. 앱스토어 연결

1. Product → Archive
2. Distribute App 선택
3. App Store Connect 선택
4. 업로드 완료

### 5. App Store Connect 설정

1. [App Store Connect](https://appstoreconnect.apple.com) 접속
2. 새 앱 만들기
3. 앱 정보 입력
4. 빌드 선택
5. 제출

---

## 🔧 환경 변수 설정

### Android

`android/app/src/main/AndroidManifest.xml`:

```xml
<application
    android:usesCleartextTraffic="true"
    ...>
</application>
```

### iOS

`ios/App/App/Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

---

## 📱 앱 아이콘 및 스플래시 화면

### 아이콘 생성

1. `resources/icon.png` 준비 (1024x1024)
2. `resources/splash.png` 준비 (2732x2732)

```bash
npx cap assets
```

### 수동 설정

- Android: `android/app/src/main/res/` 폴더에 아이콘 추가
- iOS: Xcode에서 Assets.xcassets 설정

---

## 🎨 앱 메타데이터

### 필수 정보

- **앱 이름**: Mogle AI Coach
- **패키지명**: com.mogle.aicoach
- **버전**: 1.0.0
- **카테고리**: 건강 및 피트니스
- **연령 등급**: 4+ (모든 연령)

### 설명 예시

**짧은 설명 (80자)**
```
개인 AI 코치로 감정을 추적하고 목표를 달성하세요
```

**전체 설명**
```
Mogle AI Coach는 당신의 감정과 목표를 함께 추적하는 개인 AI 코치입니다.

주요 기능:
• 일일 감정 기록 및 추적
• 목표 설정 및 진행도 관리
• AI 기반 감정 분석 및 피드백
• 주간/월간 감정 트렌드 시각화
• 완전한 오프라인 작동

모든 데이터는 로컬에 저장되어 완벽한 개인정보 보호를 제공합니다.
```

---

## 🔒 개인정보 처리방침

플레이스토어/앱스토어 배포 시 개인정보 처리방침 URL이 필요합니다.

예시 내용:
- 수집하는 데이터: 로컬 저장 데이터만 (감정 기록, 목표)
- 데이터 전송: 없음 (완전 오프라인)
- 서버 저장: 없음
- 제3자 공유: 없음

---

## 🐛 문제 해결

### Android 빌드 오류

```bash
# Gradle 캐시 정리
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

### iOS 빌드 오류

```bash
# CocoaPods 업데이트
cd ios/App
pod install --repo-update
```

### Capacitor 동기화 오류

```bash
# 완전 재동기화
npx cap sync --force
```

---

## 📊 빌드 체크리스트

### Android
- [ ] `npm run build` 성공
- [ ] `npx cap sync android` 성공
- [ ] Android Studio에서 빌드 성공
- [ ] 서명 키 설정 완료
- [ ] AAB 파일 생성 완료
- [ ] 플레이스토어 테스트 완료

### iOS
- [ ] `npm run build` 성공
- [ ] `npx cap sync ios` 성공
- [ ] Xcode에서 빌드 성공
- [ ] 서명 설정 완료
- [ ] Archive 생성 완료
- [ ] TestFlight 테스트 완료

---

## 🚀 배포 후

1. **모니터링**: 크래시 리포트 확인
2. **업데이트**: 사용자 피드백 반영
3. **마케팅**: 앱 설명 및 스크린샷 최적화

---

## 💡 팁

1. **테스트**: 실제 기기에서 충분히 테스트
2. **성능**: 앱 크기 최적화 (현재 ~5MB)
3. **권한**: 최소한의 권한만 요청
4. **오프라인**: 완전 오프라인 작동 확인

---

**Made with ❤️ by Mogle**

