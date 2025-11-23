# 📝 메모 앱

Next.js, Prisma, SQLite로 만든 간단한 메모 관리 애플리케이션입니다.

## ✨ 주요 기능

- 🔐 회원가입 / 로그인 / 로그아웃
- 📝 메모 작성, 수정, 삭제, 조회 (CRUD)
- 🎨 Bubblegum 테마의 아름다운 UI
- 🔒 사용자별 메모 격리
- 💾 SQLite 데이터베이스

## 🚀 시작하기

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. 데이터베이스 초기화

다음 명령어로 데이터베이스를 설정합니다:

```bash
npm run setup
```

또는 개별 명령어:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 사용된 기술

- **프레임워크**: Next.js 16 (App Router)
- **데이터베이스**: SQLite + Prisma ORM
- **인증**: NextAuth v5
- **UI**: shadcn/ui + Tailwind CSS
- **테마**: Bubblegum 테마
- **언어**: TypeScript

## 🗂️ 프로젝트 구조

```
memo/
├── app/
│   ├── api/              # API 라우트
│   │   ├── auth/         # 인증 API
│   │   ├── memos/        # 메모 CRUD API
│   │   └── register/     # 회원가입 API
│   ├── login/            # 로그인 페이지
│   ├── register/         # 회원가입 페이지
│   ├── page.tsx          # 메인 페이지 (메모 목록)
│   ├── layout.tsx        # 레이아웃
│   └── globals.css       # 글로벌 스타일 (Bubblegum 테마)
├── components/
│   ├── ui/               # shadcn UI 컴포넌트
│   └── memo-list.tsx     # 메모 리스트 컴포넌트
├── lib/
│   ├── auth.ts           # NextAuth 설정
│   ├── prisma.ts         # Prisma 클라이언트
│   └── utils.ts          # 유틸리티 함수
├── prisma/
│   └── schema.prisma     # 데이터베이스 스키마
├── types/
│   └── next-auth.d.ts    # TypeScript 타입 정의
└── middleware.ts         # 라우트 보호 미들웨어
```

## 📝 데이터베이스 스키마

### User (사용자)
- id: UUID
- email: 이메일 (고유)
- password: 암호화된 비밀번호
- name: 이름 (선택)
- createdAt: 생성일
- updatedAt: 수정일

### Memo (메모)
- id: UUID
- title: 제목
- content: 내용
- userId: 사용자 ID (외래키)
- createdAt: 생성일
- updatedAt: 수정일

## 🛠️ 유용한 명령어

```bash
# 개발 서버 실행
npm run dev

# 데이터베이스 초기 설정
npm run setup

# Prisma Client 생성
npm run db:generate

# 데이터베이스 마이그레이션
npm run db:migrate

# Prisma Studio 실행 (데이터베이스 GUI)
npm run db:studio

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🎨 테마 커스터마이징

`app/globals.css` 파일에서 Bubblegum 테마의 색상을 수정할 수 있습니다.

## 📄 라이선스

MIT
