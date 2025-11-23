#!/bin/bash

# 데이터베이스 초기 설정 스크립트

echo "🔧 Prisma 클라이언트 생성 중..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma 클라이언트 생성 완료"
    
    echo ""
    echo "📦 데이터베이스 마이그레이션 실행 중..."
    npx prisma migrate dev --name init
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 데이터베이스 설정이 완료되었습니다!"
        echo ""
        echo "이제 'npm run dev' 명령으로 앱을 실행할 수 있습니다."
    else
        echo ""
        echo "❌ 마이그레이션 실패"
    fi
else
    echo ""
    echo "❌ Prisma 클라이언트 생성 실패"
fi


