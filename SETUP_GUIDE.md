# 📦 설치 가이드

## 시스템 요구사항

- Node.js 18.x 이상
- npm 9.x 이상
- Windows / macOS / Linux

## 단계별 설치

### 1. 의존성 설치

의존성은 이미 설치되어 있어야 합니다. 만약 `node_modules`가 없다면:

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

#### 보안 Secret 생성 (선택사항)

더 안전한 `NEXTAUTH_SECRET`을 생성하려면:

**Windows (PowerShell):**
```powershell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

**macOS/Linux:**
```bash
openssl rand -base64 32
```

### 3. 데이터베이스 설정

#### 방법 1: 자동 설정 (권장)

```bash
npm run setup
```

#### 방법 2: 수동 설정

```bash
# Prisma Client 생성
npm run db:generate

# 데이터베이스 마이그레이션
npm run db:migrate
```

#### 방법 3: PowerShell 스크립트 (Windows)

```powershell
.\scripts\setup-db.ps1
```

#### 방법 4: Bash 스크립트 (macOS/Linux)

```bash
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 브라우저에서 http://localhost:3000 을 열어주세요.

## 데이터베이스 확인

Prisma Studio를 사용하여 데이터베이스를 GUI로 확인할 수 있습니다:

```bash
npm run db:studio
```

브라우저에서 http://localhost:5555 가 자동으로 열립니다.

## 프로덕션 배포

### 1. 환경 변수 설정

프로덕션 환경에서는 반드시 안전한 값을 사용하세요:

```env
DATABASE_URL="file:./prod.db"  # 또는 PostgreSQL URL
NEXTAUTH_SECRET="[강력한-랜덤-문자열]"
NEXTAUTH_URL="https://yourdomain.com"
```

### 2. 빌드

```bash
npm run build
```

### 3. 서버 실행

```bash
npm start
```

## 트러블슈팅

### 네트워크 오류 (Prisma 바이너리 다운로드 실패)

네트워크 문제로 Prisma 바이너리를 다운로드할 수 없는 경우:

1. 안정적인 인터넷 연결을 확인하세요
2. VPN을 사용 중이라면 잠시 비활성화해보세요
3. 방화벽 설정을 확인하세요
4. 잠시 후 다시 시도하세요

### 포트 충돌

포트 3000이 이미 사용 중이라면:

```bash
# Windows (PowerShell)
$env:PORT=3001; npm run dev

# macOS/Linux
PORT=3001 npm run dev
```

### 데이터베이스 오류

데이터베이스가 손상되었다면:

```bash
# 데이터베이스 삭제 (모든 데이터 삭제됨!)
Remove-Item prisma\dev.db -ErrorAction SilentlyContinue  # Windows
rm -f prisma/dev.db  # macOS/Linux

# 재생성
npm run db:migrate
```

## 다음 단계

- [QUICKSTART.md](QUICKSTART.md) - 빠른 시작 가이드
- [README.md](README.md) - 전체 프로젝트 문서


