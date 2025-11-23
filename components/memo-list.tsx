"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Trash2, Plus, X } from "lucide-react"

interface Memo {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function MemoList() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", content: "" })

  useEffect(() => {
    fetchMemos()
  }, [])

  const fetchMemos = async () => {
    try {
      const response = await fetch("/api/memos")
      if (response.ok) {
        const data = await response.json()
        setMemos(data)
      }
    } catch (error) {
      console.error("Failed to fetch memos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ title: "", content: "" })
        setIsCreating(false)
        fetchMemos()
      }
    } catch (error) {
      console.error("Failed to create memo:", error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/memos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ title: "", content: "" })
        setEditingId(null)
        fetchMemos()
      }
    } catch (error) {
      console.error("Failed to update memo:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 메모를 삭제하시겠습니까?")) return

    try {
      const response = await fetch(`/api/memos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchMemos()
      }
    } catch (error) {
      console.error("Failed to delete memo:", error)
    }
  }

  const startEdit = (memo: Memo) => {
    setEditingId(memo.id)
    setFormData({ title: memo.title, content: memo.content })
    setIsCreating(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ title: "", content: "" })
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({ title: "", content: "" })
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">내 메모</h2>
        <Button onClick={startCreate} disabled={isCreating}>
          <Plus className="w-4 h-4 mr-2" />
          새 메모
        </Button>
      </div>

      {isCreating && (
        <Card className="border-primary">
          <form onSubmit={handleCreate}>
            <CardHeader>
              <CardTitle>새 메모 작성</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button type="submit">저장</Button>
              <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                취소
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {memos.map((memo) => (
          <Card key={memo.id}>
            {editingId === memo.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(memo.id); }}>
                <CardHeader>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    required
                  />
                </CardContent>
                <CardFooter className="gap-2">
                  <Button type="submit" size="sm">저장</Button>
                  <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                    취소
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{memo.title}</CardTitle>
                  <CardDescription>
                    {new Date(memo.updatedAt).toLocaleDateString("ko-KR")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3 whitespace-pre-wrap">{memo.content}</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(memo)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(memo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        ))}
      </div>

      {memos.length === 0 && !isCreating && (
        <div className="text-center py-12 text-muted-foreground">
          <p>아직 메모가 없습니다.</p>
          <p className="text-sm mt-2">새 메모를 작성해보세요!</p>
        </div>
      )}
    </div>
  )
}


