"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Ban, ChevronLeft, ChevronRight } from "lucide-react";
import UserDetailsModal from "@/components/modals/UserDetailsModal";
import BlockUserModal from "@/components/modals/BlockUserModal";

const recentUsers = [
  {
    id: "S001",
    name: "DS",
    email: "ds@example.com",
    phone: "123-456-7890",
    userType: "Admin",
    joinedDate: "1/10/2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DS",
  },
  {
    id: "S002",
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "234-567-8901",
    userType: "User",
    joinedDate: "3/15/2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "S003",
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "345-678-9012",
    userType: "User",
    joinedDate: "5/22/2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "S004",
    name: "Alice Johnson",
    email: "alicej@example.com",
    phone: "456-789-0123",
    userType: "Moderator",
    joinedDate: "7/3/2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: "S005",
    name: "Bob Brown",
    email: "bobb@example.com",
    phone: "567-890-1234",
    userType: "User",
    joinedDate: "9/18/2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
];

type User = (typeof recentUsers)[0];

export default function RecentUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blockUser, setBlockUser] = useState<User | null>(null);
  const [users, setUsers] = useState(recentUsers);
  const totalPages = 3;

  const handleBlockConfirm = () => {
    if (blockUser) {
      setUsers(users.filter((u) => u.id !== blockUser.id));
      setBlockUser(null);
    }
  };

  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border dark:border-[#F4B057]">
      {/* Header */}
      <div className="border-border border-b p-3 sm:p-4">
        <h2 className="text-foreground text-base font-semibold sm:text-lg">Recent Users</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full">
          <thead className="bg-primary">
            <tr>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                S.ID
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Full Name
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Email
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Phone No
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                User Type
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Joined Date
              </th>
              <th className="text-primary-foreground px-6 py-3 text-left text-xs font-medium tracking-wider uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                  {user.email}
                </td>
                <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                  {user.phone}
                </td>
                <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                  {user.userType}
                </td>
                <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                      title="Block User"
                      onClick={() => setBlockUser(user)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                      title="View Details"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 p-3 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-muted/30 space-y-3 rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate text-sm font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground text-xs">{user.id}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  title="Block User"
                  onClick={() => setBlockUser(user)}
                >
                  <Ban className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  title="View Details"
                  onClick={() => setSelectedUser(user)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground truncate">{user.email}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{user.phone}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-foreground">{user.userType}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">{user.joinedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-border flex items-center justify-center gap-2 border-t p-3 sm:justify-end sm:p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className="h-7 w-7 text-xs sm:h-8 sm:w-8 sm:text-sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* View User Modal */}
      <UserDetailsModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
        onBlock={() => {
          if (selectedUser) {
            setBlockUser(selectedUser);
            setSelectedUser(null);
          }
        }}
      />

      {/* Block User Confirmation Modal */}
      <BlockUserModal
        open={!!blockUser}
        onClose={() => setBlockUser(null)}
        user={blockUser}
        onConfirm={handleBlockConfirm}
      />
    </div>
  );
}
