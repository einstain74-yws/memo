# 🚀 빠른 시작 가이드

## 📋 준비사항

- Node.js 18 이상
- npm

## ⚡ 5분 만에 시작하기

### 1️⃣ 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하세요:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 2️⃣ 데이터베이스 설정

```bash
npm run setup
```

> 네트워크 문제가 발생할 경우, 잠시 후 다시 시도하세요.

### 3️⃣ 개발 서버 실행

```bash
npm run dev
```

### 4️⃣ 앱 사용하기

1. 브라우저에서 http://localhost:3000 열기
2. "회원가입" 클릭
3. 이메일과 비밀번호로 계정 생성
4. 로그인 후 메모 작성 시작!

## 🎯 주요 기능

- ✅ 메모 작성
- ✅ 메모 수정
- ✅ 메모 삭제
- ✅ 메모 목록 보기
- ✅ 사용자별 메모 격리

## 🐛 문제 해결

### Prisma 생성 오류

```bash
# 수동으로 실행
npx prisma generate
npx prisma migrate dev --name init
```

### 포트 3000이 이미 사용 중

```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

### 데이터베이스 초기화

```bash
# 데이터베이스 파일 삭제 후 재생성
rm prisma/dev.db
npm run db:migrate
```

## 📚 더 알아보기

자세한 내용은 [README.md](README.md)를 참고하세요.


