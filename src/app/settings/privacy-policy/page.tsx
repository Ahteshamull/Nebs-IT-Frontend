"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import TiptapEditor from "@/components/ui/TiptapEditor"

export default function PrivacyPolicyPage() {
  const router = useRouter()
  const [content, setContent] = useState(
    "<p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.</p>"
  )

  const handleSave = () => {
    // Handle save logic
    alert("Privacy Policy saved!")
  }



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-card p-6">
        <TiptapEditor content={content} onChange={setContent} placeholder="Write privacy policy..." />
      </div>

      {/* Footer Actions */}
      <div className="bg-sidebar p-4 flex flex-col sm:flex-row items-center justify-center ">
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
