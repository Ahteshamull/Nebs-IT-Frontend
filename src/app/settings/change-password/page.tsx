"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle password change
      alert("Password changed successfully!")
      router.push("/settings")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:opacity-80">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold">Change Password</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card p-8 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Current Password */}
          <div className="space-y-3">
            <label htmlFor="current" className="text-lg font-medium text-foreground">
              Current Password
            </label>
            <div className="relative">
              <Input
                id="current"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value)
                  if (errors.currentPassword)
                    setErrors({ ...errors, currentPassword: undefined })
                }}
                className={errors.currentPassword ? "border-destructive pr-10 h-12" : "pr-10 h-12"}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-destructive">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-3">
            <label htmlFor="new" className="text-lg font-medium text-foreground">
              New Password
            </label>
            <div className="relative">
              <Input
                id="new"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  if (errors.newPassword) setErrors({ ...errors, newPassword: undefined })
                }}
                className={errors.newPassword ? "border-destructive pr-10 h-12" : "pr-10 h-12"}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-3">
            <label htmlFor="confirm" className="text-lg font-medium text-foreground">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (errors.confirmPassword)
                    setErrors({ ...errors, confirmPassword: undefined })
                }}
                className={errors.confirmPassword ? "border-destructive pr-10 h-12" : "pr-10 h-12"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
