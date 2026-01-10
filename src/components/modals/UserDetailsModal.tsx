"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate?: string;
  joinedAt?: string;
  userType?: string;
  avatar: string;
}

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onBlock?: () => void;
}

export default function UserDetailsModal({ open, onClose, user, onBlock }: UserDetailsModalProps) {
  if (!user) return null;

  const joinedDate = user.joinedDate || user.joinedAt;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()} modal={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Avatar and Name */}
          <div className="border-border flex items-center gap-4 border-b pb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-foreground text-lg font-semibold">{user.name}</h3>
              <p className="text-muted-foreground text-sm">ID: {user.id}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <Mail className="text-primary h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs">Email</p>
                <p className="text-foreground truncate text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <Phone className="text-primary h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs">Phone Number</p>
                <p className="text-foreground text-sm font-medium">{user.phone}</p>
              </div>
            </div>

            {user.userType && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <Shield className="text-primary h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">User Type</p>
                  <p className="text-foreground text-sm font-medium">{user.userType}</p>
                </div>
              </div>
            )}

            {joinedDate && (
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <Calendar className="text-primary h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground text-xs">Joined Date</p>
                  <p className="text-foreground text-sm font-medium">{joinedDate}</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            {onBlock && (
              <Button variant="default" className="flex-1" onClick={onBlock}>
                Block User
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
