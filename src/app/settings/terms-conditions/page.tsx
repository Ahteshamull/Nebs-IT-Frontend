"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import TiptapEditor from "@/components/ui/TiptapEditor"

export default function TermsConditionsPage() {
  const router = useRouter()
  const [content, setContent] = useState(
    "<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>"
  )

  const handleSave = () => {
    // Handle save logic
    alert("Terms & Conditions saved!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Terms & Condition</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        <TiptapEditor content={content} onChange={setContent} placeholder="Write terms and conditions..." />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar p-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          onClick={handleSave}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}
