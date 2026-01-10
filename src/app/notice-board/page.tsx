"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Pencil,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CalendarDays,
  CheckSquare,
  Square,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

/* ================= TYPES ================= */

type NoticeStatus = "Published" | "Unpublished" | "Draft";
type FilterStatus = NoticeStatus | "All";
type Notice = {
  id: string;
  title: string;
  noticeType: string;
  departmentsOrIndividuals: string;
  publishedOn: string;
  status: NoticeStatus;
  content: string;
};

/* ================= SEED DATA ================= */

const seedNotices: Notice[] = [
  {
    id: "1",
    title: "Office closed on Friday for maintenance.",
    noticeType: "General / Company-Wide",
    departmentsOrIndividuals: "All Department",
    publishedOn: "15-Jun-2025",
    status: "Published",
    content: "<p>The office will be closed for maintenance.</p>",
  },
  {
    id: "2",
    title: "Eid al-Fitr holiday schedule.",
    noticeType: "Holiday & Event",
    departmentsOrIndividuals: "Finance",
    publishedOn: "15-Jun-2025",
    status: "Published",
    content: "<p>Eid holidays schedule announced.</p>",
  },
  {
    id: "3",
    title: "Updated code of conduct policy",
    noticeType: "HR & Policy Update",
    departmentsOrIndividuals: "Sales Team",
    publishedOn: "15-Jun-2025",
    status: "Published",
    content: "<p>New code of conduct is now effective.</p>",
  },
  {
    id: "4",
    title: "Unauthorized absence recorded on 18 Oct 2025",
    noticeType: "Warning / Disciplinary",
    departmentsOrIndividuals: "Individual",
    publishedOn: "15-Jun-2025",
    status: "Unpublished",
    content: "<p>This notice is currently unpublished.</p>",
  },
  {
    id: "5",
    title: "Office closed today due to severe weather",
    noticeType: "Emergency / Urgent",
    departmentsOrIndividuals: "HR",
    publishedOn: "15-Jun-2025",
    status: "Draft",
    content: "<p>Weather emergency notice draft.</p>",
  },
];

/* ================= STATUS TOGGLE ================= */

function StatusToggle({
  status,
  onChange,
}: {
  status: NoticeStatus;
  onChange: (v: NoticeStatus) => void;
}) {
  if (status === "Draft") {
    return <span className="rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-700">Draft</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={status === "Published"}
        onCheckedChange={(v) => onChange(v ? "Published" : "Unpublished")}
      />
      <span className="text-xs">{status}</span>
    </div>
  );
}

/* ================= TABLE ================= */

function NoticesTable({
  notices,
  onView,
  onStatusChange,
  selectedNotices,
  onToggleNotice,
  onToggleAll,
  isAllSelected,
  isMounted,
  router,
}: {
  notices: Notice[];
  onView: (n: Notice) => void;
  onStatusChange: (id: string, status: NoticeStatus) => void;
  selectedNotices: Set<string>;
  onToggleNotice: (id: string) => void;
  onToggleAll: () => void;
  isAllSelected: boolean;
  isMounted: boolean;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border md:block">
      <table className="min-w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left">
              {isMounted && (
                <button
                  onClick={onToggleAll}
                  className="hover:text-primary flex items-center gap-2 text-xs font-semibold"
                >
                  {isAllSelected ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Title
                </button>
              )}
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold">Notice Type</th>
            <th className="px-6 py-3 text-left text-xs font-semibold">Department / Individual</th>
            <th className="px-6 py-3 text-left text-xs font-semibold">Published On</th>
            <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id} className="hover:bg-muted/30 border-t">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {isMounted && (
                    <button
                      onClick={() => onToggleNotice(notice.id)}
                      className="hover:text-primary"
                    >
                      {selectedNotices.has(notice.id) ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  <span className="text-sm font-medium">{notice.title}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{notice.noticeType}</td>
              <td className="px-6 py-4 text-sm">{notice.departmentsOrIndividuals}</td>
              <td className="px-6 py-4 text-sm">{notice.publishedOn}</td>
              <td className="px-6 py-4">
                <StatusToggle
                  status={notice.status}
                  onChange={(s) => onStatusChange(notice.id, s)}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => onView(notice)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push(`/notice-board/update?id=${notice.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= PAGE ================= */

export default function NoticeBoardPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>(seedNotices);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Notice | null>(null);
  const [selectedNotices, setSelectedNotices] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [publishedOnFilter, setPublishedOnFilter] = useState<string>("All");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter states
  const perPage = 5;

  // Get unique departments for filter dropdown
  const departments = [
    "All",
    ...Array.from(new Set(notices.map((n) => n.departmentsOrIndividuals))),
  ];

  const filtered = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.noticeType.toLowerCase().includes(query.toLowerCase()) ||
      n.departmentsOrIndividuals.toLowerCase().includes(query.toLowerCase());
    const matchesDepartment =
      departmentFilter === "All" || n.departmentsOrIndividuals === departmentFilter;
    const matchesEmployee =
      employeeFilter === "" ||
      n.title.toLowerCase().includes(employeeFilter.toLowerCase()) ||
      n.departmentsOrIndividuals.toLowerCase().includes(employeeFilter.toLowerCase());
    const matchesStatus = statusFilter === "All" || n.status === statusFilter;
    const matchesPublishedOn = publishedOnFilter === "All" || n.publishedOn === publishedOnFilter;

    return (
      matchesSearch && matchesDepartment && matchesEmployee && matchesStatus && matchesPublishedOn
    );
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    setPage(1);
  }, [query, departmentFilter, employeeFilter, statusFilter, publishedOnFilter]);

  const activeCount = notices.filter((n) => n.status === "Published").length;
  const draftCount = notices.filter((n) => n.status === "Draft").length;

  const resetFilters = () => {
    setDepartmentFilter("All");
    setEmployeeFilter("");
    setStatusFilter("All");
    setPublishedOnFilter("All");
    setQuery("");
  };

  const hasActiveFilters =
    departmentFilter !== "All" ||
    employeeFilter !== "" ||
    statusFilter !== "All" ||
    publishedOnFilter !== "All" ||
    query !== "";

  // Checkbox handlers
  const toggleNotice = (id: string) => {
    setSelectedNotices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    const currentPageIds = new Set(data.map((notice) => notice.id));
    if (
      selectedNotices.size === data.length &&
      data.every((notice) => selectedNotices.has(notice.id))
    ) {
      // If all current page items are selected, deselect all
      setSelectedNotices((prev) => {
        const newSet = new Set(prev);
        data.forEach((notice) => newSet.delete(notice.id));
        return newSet;
      });
    } else {
      // Select all current page items
      setSelectedNotices((prev) => {
        const newSet = new Set(prev);
        data.forEach((notice) => newSet.add(notice.id));
        return newSet;
      });
    }
  };

  const isAllSelected = data.length > 0 && data.every((notice) => selectedNotices.has(notice.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Notice Management</h1>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-green-600">Active Notices: {activeCount}</span> |{" "}
                <span className="font-medium text-orange-600">
                  Draft Notice: {String(draftCount).padStart(2, "0")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-orange-300 bg-orange-50 text-orange-600 hover:bg-orange-100"
                onClick={() => setShowDraftModal(true)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                All Draft Notice
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => router.push("/notice-board/create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Notice
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b bg-white">
        <div className="max-w-full px-4 py-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                className="border-gray-300 pl-10"
                placeholder="Search notice..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Departments/Individuals Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Departments or individuals
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-gray-300">
                    {departmentFilter}
                    <ChevronLeft className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Employee ID or Name Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Employee Id or Name
              </label>
              <Input
                className="border-gray-300"
                placeholder="Search employee..."
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-gray-300">
                    {statusFilter}
                    <ChevronLeft className="h-4 w-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Published")}>
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Unpublished")}>
                    Unpublished
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Draft")}>
                    Draft
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Published On Filter */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Published on</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between border-gray-300">
                    {publishedOnFilter}
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onClick={() => setPublishedOnFilter("All")}>
                    All
                  </DropdownMenuItem>
                  {Array.from(new Set(notices.map((n) => n.publishedOn))).map((date) => (
                    <DropdownMenuItem key={date} onClick={() => setPublishedOnFilter(date)}>
                      {date}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <NoticesTable
          notices={data}
          onView={setSelected}
          onStatusChange={(id, status) =>
            setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, status } : n)))
          }
          selectedNotices={selectedNotices}
          onToggleNotice={toggleNotice}
          onToggleAll={toggleAll}
          isAllSelected={isAllSelected}
          isMounted={isMounted}
          router={router}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of{" "}
              {filtered.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="border-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={page === pageNum ? "default" : "outline"}
                      onClick={() => setPage(pageNum)}
                      className={page === pageNum ? "bg-blue-600" : "border-gray-300"}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="border-gray-300"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{selected.title}</DialogTitle>
            </DialogHeader>
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: selected.content,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
