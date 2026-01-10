"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Upload } from "lucide-react";

type CreateAdminModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (admin: { name: string; email: string; password: string; avatar?: string }) => void;
};

export default function CreateAdminModal({ open, onClose, onConfirm }: CreateAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onConfirm({
        name,
        email,
        password,
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAvatar("");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={false}>
      <DialogContent className="bg-background gap-0 p-0 sm:max-w-[600px]">
        <DialogHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
          <DialogTitle className="text-xl font-semibold">Create Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-foreground text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="jhon doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-foreground text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* New Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-foreground text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-foreground text-sm font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: undefined });
                  }}
                  className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive text-xs">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="space-y-2">
            <label className="text-foreground block text-sm font-medium">Profile Image</label>
            <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="avatar-upload"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                {avatar ? (
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="text-muted-foreground h-8 w-8" />
                    <span className="text-muted-foreground text-sm">Upload Image</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-base font-medium"
          >
            Create Admin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
