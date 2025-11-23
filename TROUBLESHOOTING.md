# 🔧 문제 해결 가이드

## ❌ Prisma Client 생성 실패 (EPERM 오류)

### 문제
```
EPERM: operation not permitted, rename ... query_engine-windows.dll.node
```

### 원인
- Windows에서 파일이 다른 프로세스에 의해 잠겨있음
- 바이러스 백신이 파일을 스캔 중
- 개발 서버가 실행 중

### 해결 방법

#### 방법 1: 개발 서버 종료 후 재시도
1. 실행 중인 모든 터미널을 닫기
2. VS Code/Cursor 재시작
3. 새 터미널에서 실행:
```bash
npx prisma generate
```

#### 방법 2: 관리자 권한으로 실행
1. PowerShell을 관리자 권한으로 실행
2. 프로젝트 디렉토리로 이동
3. 실행:
```bash
npx prisma generate
```

#### 방법 3: 바이러스 백신 일시 비활성화
1. Windows Defender 또는 사용 중인 백신 프로그램 일시 중지
2. Prisma 생성 시도:
```bash
npx prisma generate
```
3. 완료 후 백신 프로그램 다시 활성화

#### 방법 4: node_modules 재설치
```bash
# node_modules와 package-lock.json 삭제
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 재설치
npm install

# Prisma 생성
npx prisma generate
```

#### 방법 5: Prisma 캐시 삭제
```bash
# Prisma 캐시 삭제
Remove-Item -Recurse -Force "$env:TEMP\prisma*"
Remove-Item -Recurse -Force "node_modules\.prisma"
Remove-Item -Recurse -Force "node_modules\@prisma"

# 재설치 및 생성
npm install
npx prisma generate
```

## ❌ Module not found: .prisma/client/default

### 문제
```
Module not found: Can't resolve '.prisma/client/default'
```

### 해결 방법
위의 Prisma Client 생성 방법 중 하나를 시도하세요.

## ❌ Edge Runtime에서 Prisma 오류

### 문제
```
Prisma does not work in Edge Runtime
```

### 해결 완료
이미 코드에서 수정되었습니다:
- ✅ 모든 API 라우트에 `export const runtime = "nodejs"` 추가
- ✅ auth.ts를 Edge Runtime 호환 방식으로 수정

## ❌ 데이터베이스 연결 오류

### 문제
```
Can't reach database server
```

### 해결 방법
1. `.env.local` 파일이 존재하는지 확인
2. 내용 확인:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

3. 데이터베이스 마이그레이션 실행:
```bash
npx prisma migrate dev --name init
```

## ❌ 로그인 실패

### 문제
- "이메일 또는 비밀번호가 올바르지 않습니다" 오류

### 해결 방법
1. 데이터베이스가 생성되었는지 확인:
```bash
# prisma/dev.db 파일이 있어야 함
ls prisma
```

2. 없다면 마이그레이션 실행:
```bash
npx prisma migrate dev --name init
```

3. 새 계정으로 회원가입 시도

## ❌ 포트 3000 이미 사용 중

### 해결 방법
```bash
# 다른 포트 사용
$env:PORT=3001; npm run dev
```

## 🆘 모든 방법이 실패할 경우

### 완전 초기화
```bash
# 1. 모든 생성된 파일 삭제
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force prisma\dev.db*
Remove-Item package-lock.json

# 2. 재설치
npm install

# 3. Prisma 설정
npx prisma generate
npx prisma migrate dev --name init

# 4. 개발 서버 실행
npm run dev
```

## 💡 추가 팁

### Prisma Studio로 데이터 확인
```bash
npx prisma studio
```
- http://localhost:5555 에서 데이터베이스 내용 확인

### 빌드 전 확인사항
✅ Prisma Client 생성 완료
✅ 마이그레이션 실행 완료
✅ .env.local 파일 존재
✅ node_modules 설치 완료

### 도움이 필요하면
- GitHub Issues 확인
- Prisma 공식 문서: https://www.prisma.io/docs
- NextAuth 문서: https://authjs.dev


