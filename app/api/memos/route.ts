import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs" // Edge Runtime이 아닌 Node.js Runtime 사용

// GET: 사용자의 모든 메모 가져오기
export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      )
    }

    const memos = await prisma.memo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(memos)
  } catch (error) {
    console.error("Get memos error:", error)
    return NextResponse.json(
      { error: "메모를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

// POST: 새 메모 생성
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      )
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다." },
        { status: 400 }
      )
    }

    const memo = await prisma.memo.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    })

    return NextResponse.json(memo, { status: 201 })
  } catch (error) {
    console.error("Create memo error:", error)
    return NextResponse.json(
      { error: "메모 생성 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

