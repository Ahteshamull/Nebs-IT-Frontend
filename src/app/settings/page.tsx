"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const settingsOptions = [
  {
    id: "change-password",
    title: "Change Password",
    path: "/settings/change-password",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    path: "/settings/privacy-policy",
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    path: "/settings/terms-conditions",
  },
  {
    id: "about-us",
    title: "About Us",
    path: "/settings/about-us",
  },
]

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>

      {/* Settings Options */}
      <div className="bg-card">
        {settingsOptions.map((option, index) => (
          <div key={option.id}>
            <button
              onClick={() => router.push(option.path)}
              className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors text-left"
            >
              <span className="text-foreground font-medium text-lg">{option.title}</span>
              <ChevronRight className="h-7 w-7 text-muted-foreground" />
            </button>
            {index < settingsOptions.length - 1 && (
              <div className="border-b border-border mx-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
