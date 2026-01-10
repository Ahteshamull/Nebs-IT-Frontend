"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TiptapEditor from "@/components/ui/TiptapEditor"

type CreateBlogModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (blog: {
    title: string
    author: string
    category: string
    content: string
  }) => void
}

export default function CreateBlogModal({
  open,
  onClose,
  onConfirm,
}: CreateBlogModalProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState<{
    title?: string
    author?: string
    category?: string
    content?: string
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!author.trim()) {
      newErrors.author = "Author is required"
    }

    if (!category.trim()) {
      newErrors.category = "Category is required"
    }

    if (!content.trim() || content === "<p></p>") {
      newErrors.content = "Content is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onConfirm({
        title,
        author,
        category,
        content,
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setTitle("")
    setAuthor("")
    setCategory("")
    setContent("")
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={false}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background">
        <DialogHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg sticky top-0 z-10">
          <DialogTitle className="text-xl font-semibold">Create Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({ ...errors, title: undefined })
              }}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Author and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium text-foreground">
                Author
              </label>
              <Input
                id="author"
                type="text"
                placeholder="Author name"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                  if (errors.author) setErrors({ ...errors, author: undefined })
                }}
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-xs text-destructive">{errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <Input
                id="category"
                type="text"
                placeholder="e.g., Technology, Lifestyle"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  if (errors.category) setErrors({ ...errors, category: undefined })
                }}
                className={errors.category ? "border-destructive" : ""}
              />
              {errors.category && (
                <p className="text-xs text-destructive">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Content</label>
            <TiptapEditor
              content={content}
              onChange={(newContent: string) => {
                setContent(newContent)
                if (errors.content) setErrors({ ...errors, content: undefined })
              }}
            />
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create Blog
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

