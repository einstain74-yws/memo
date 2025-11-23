# 데이터베이스 초기 설정 스크립트

Write-Host "🔧 Prisma 클라이언트 생성 중..." -ForegroundColor Cyan
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma 클라이언트 생성 완료" -ForegroundColor Green
    
    Write-Host "`n📦 데이터베이스 마이그레이션 실행 중..." -ForegroundColor Cyan
    npx prisma migrate dev --name init
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ 데이터베이스 설정이 완료되었습니다!" -ForegroundColor Green
        Write-Host "`n이제 'npm run dev' 명령으로 앱을 실행할 수 있습니다." -ForegroundColor Yellow
    } else {
        Write-Host "`n❌ 마이그레이션 실패" -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Prisma 클라이언트 생성 실패" -ForegroundColor Red
}


