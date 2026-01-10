"use client"

import { useState } from "react"
import { ArrowLeft, Camera } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("Super Admin")
  const [email, setEmail] = useState("admin@example.com")
  const [phone, setPhone] = useState("+1 234 567 8900")
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin")
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
  }>({})

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format"
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Handle profile update
      alert("Profile updated successfully!")
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
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card p-8 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-3xl">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Click camera icon to change avatar</p>
          </div>

          {/* Name */}
          <div className="space-y-3">
            <label htmlFor="name" className="text-lg font-medium text-foreground">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              className={errors.name ? "border-destructive h-12" : "h-12"}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label htmlFor="email" className="text-lg font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              className={errors.email ? "border-destructive h-12" : "h-12"}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label htmlFor="phone" className="text-lg font-medium text-foreground">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (errors.phone) setErrors({ ...errors, phone: undefined })
              }}
              className={errors.phone ? "border-destructive h-12" : "h-12"}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
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
