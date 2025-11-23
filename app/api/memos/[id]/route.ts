import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs" // Edge Runtime이 아닌 Node.js Runtime 사용

// GET: 특정 메모 가져오기
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      )
    }

    const { id } = await params

    const memo = await prisma.memo.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!memo) {
      return NextResponse.json(
        { error: "메모를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    return NextResponse.json(memo)
  } catch (error) {
    console.error("Get memo error:", error)
    return NextResponse.json(
      { error: "메모를 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

// PUT: 메모 수정
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      )
    }

    const { id } = await params
    const { title, content } = await request.json()

    // 메모가 존재하고 사용자 소유인지 확인
    const existingMemo = await prisma.memo.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingMemo) {
      return NextResponse.json(
        { error: "메모를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    const memo = await prisma.memo.update({
      where: { id },
      data: {
        title: title ?? existingMemo.title,
        content: content ?? existingMemo.content,
      },
    })

    return NextResponse.json(memo)
  } catch (error) {
    console.error("Update memo error:", error)
    return NextResponse.json(
      { error: "메모 수정 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

// DELETE: 메모 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증이 필요합니다." },
        { status: 401 }
      )
    }

    const { id } = await params

    // 메모가 존재하고 사용자 소유인지 확인
    const existingMemo = await prisma.memo.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!existingMemo) {
      return NextResponse.json(
        { error: "메모를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    await prisma.memo.delete({
      where: { id },
    })

    return NextResponse.json({ message: "메모가 삭제되었습니다." })
  } catch (error) {
    console.error("Delete memo error:", error)
    return NextResponse.json(
      { error: "메모 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}

