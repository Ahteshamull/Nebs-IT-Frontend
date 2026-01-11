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
import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";

/* ================= TYPES ================= */

type NoticeStatus = "Published" | "Unpublished" | "Draft";
type FilterStatus = NoticeStatus | "All";
type Notice = {
  _id: string;
  noticeTitle: string;
  noticeType: string;
  targetDepartments: string;
  publishDate: string;
  status: NoticeStatus;
  noticeBody: string;
  attachments?: any[];
};

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
  onDeleteNotice,
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
  onDeleteNotice: (id: string) => void;
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
            <tr key={notice._id} className="hover:bg-muted/30 border-t">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {isMounted && (
                    <button
                      onClick={() => onToggleNotice(notice._id)}
                      className="hover:text-primary"
                    >
                      {selectedNotices.has(notice._id) ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  <span className="text-sm font-medium">{notice.noticeTitle}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{notice.noticeType}</td>
              <td className="px-6 py-4 text-sm">{notice.targetDepartments}</td>
              <td className="px-6 py-4 text-sm">
                {new Date(notice.publishDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <StatusToggle
                  status={notice.status}
                  onChange={(s) => onStatusChange(notice._id, s)}
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
                    onClick={() => router.push(`/notice-board/update?id=${notice._id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDeleteNotice(notice._id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
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
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [publishedOnFilter, setPublishedOnFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Notice | null>(null);
  const [selectedNotices, setSelectedNotices] = useState<Set<string>>(new Set());

  const {
    data: allNoticesData,
    isLoading,
    error,
  } = useGetAllNoticesQuery({
    page,
    limit,
    search: query,
    status: statusFilter === "All" ? undefined : statusFilter,
    targetDepartments: departmentFilter === "All" ? undefined : departmentFilter,
  });

  const pagination = allNoticesData?.pagination;
  const [localNotices, setLocalNotices] = useState<Notice[]>([]);
  const notices = localNotices;
  const [isMounted, setIsMounted] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLocalNotices(allNoticesData?.data || []);
  }, [allNoticesData?.data]);

  // Get unique departments for filter dropdown
  const departments = ["All", ...Array.from(new Set(notices.map((n) => n.targetDepartments)))];

  const filtered = notices.filter((n) => {
    const matchesDepartment =
      departmentFilter === "All" || n.targetDepartments === departmentFilter;
    const matchesEmployee =
      employeeFilter === "" ||
      n.noticeTitle.toLowerCase().includes(employeeFilter.toLowerCase()) ||
      n.targetDepartments.toLowerCase().includes(employeeFilter.toLowerCase());
    const matchesStatus = statusFilter === "All" || n.status === statusFilter;
    const noticeDate = new Date(n.publishDate).toLocaleDateString();
    const matchesPublishedOn = publishedOnFilter === "All" || noticeDate === publishedOnFilter;
    const matchesSearch = query ? n.noticeTitle.toLowerCase().includes(query.toLowerCase()) : true;

    return (
      matchesSearch && matchesDepartment && matchesEmployee && matchesStatus && matchesPublishedOn
    );
  });

  const totalPages = pagination?.totalPages || 1;
  const data = filtered;

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
    if (
      selectedNotices.size === data.length &&
      data.every((notice) => selectedNotices.has(notice._id))
    ) {
      // If all current page items are selected, deselect all
      setSelectedNotices((prev) => {
        const newSet = new Set(prev);
        data.forEach((notice) => newSet.delete(notice._id));
        return newSet;
      });
    } else {
      // Select all current page items
      setSelectedNotices((prev) => {
        const newSet = new Set(prev);
        data.forEach((notice) => newSet.add(notice._id));
        return newSet;
      });
    }
  };

  const isAllSelected = data.length > 0 && data.every((notice) => selectedNotices.has(notice._id));

  const handleDeleteNotice = (id: string) => {
    const n = notices.find((x) => x._id === id);
    setDeleteConfirm({ id, title: n?.noticeTitle || "" });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setLocalNotices((prev) => prev.filter((n) => n._id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const draftNotices = notices.filter((n) => n.status === "Draft");

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
                  {Array.from(
                    new Set(notices.map((n) => new Date(n.publishDate).toLocaleDateString())),
                  ).map((date) => (
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
        {isLoading ? (
          <div className="flex items-center justify-center rounded-lg border bg-white p-10">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-gray-300 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-lg border bg-white p-6 text-sm text-red-600">
            Failed to load notices.
          </div>
        ) : (
          <NoticesTable
            notices={data}
            onView={setSelected}
            onStatusChange={(id, status) =>
              setLocalNotices((prev) => prev.map((n) => (n._id === id ? { ...n, status } : n)))
            }
            selectedNotices={selectedNotices}
            onToggleNotice={toggleNotice}
            onToggleAll={toggleAll}
            isAllSelected={isAllSelected}
            isMounted={isMounted}
            router={router}
            onDeleteNotice={handleDeleteNotice}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, pagination?.totalNotices || 0)} of{" "}
              {pagination?.totalNotices || 0} results
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={!pagination?.hasPrev}
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
                disabled={!pagination?.hasNext}
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

      {/* Draft Notices Modal */}
      <Dialog open={showDraftModal} onOpenChange={setShowDraftModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Draft Notices</DialogTitle>
          </DialogHeader>

          {draftNotices.length === 0 ? (
            <div className="rounded-md border bg-white p-6 text-sm text-gray-600">
              No draft notices found.
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto rounded-md border">
              <div className="bg-muted grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold text-gray-700">
                <div className="col-span-5">Title</div>
                <div className="col-span-3">Department</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              <div className="divide-y">
                {draftNotices.map((n) => (
                  <div key={n._id} className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                    <div className="col-span-5 truncate text-sm font-medium text-gray-900">
                      {n.noticeTitle}
                    </div>
                    <div className="col-span-3 truncate text-sm text-gray-700">
                      {n.targetDepartments}
                    </div>
                    <div className="col-span-2 truncate text-sm text-gray-700">{n.noticeType}</div>
                    <div className="col-span-2 flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(n);
                          setShowDraftModal(false);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      {selected && (
        <Dialog open onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-h-[90vh] w-[1800px] overflow-x-auto overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.noticeTitle}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              {/* Header with gradient background */}
              <div className="relative rounded-t-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{selected.noticeTitle}</h2>
                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          selected.status === "Published"
                            ? "bg-green-500 text-white"
                            : selected.status === "Draft"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-500 text-white"
                        }`}
                      >
                        {selected.status}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                        {new Date(selected.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6">
                {/* Info cards */}
                <div className="mb-2 grid grid-cols-2 gap-5">
                  <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-500 p-2">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Notice Type</p>
                        <p className="text-sm font-semibold text-gray-900">{selected.noticeType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-500 p-2">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Department</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {selected.targetDepartments}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-500 p-2">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Published</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(selected.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1 w-6 rounded bg-blue-600"></div>
                    <h3 className="text-lg font-semibold text-gray-900">Notice Content</h3>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: selected.noticeBody,
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/notice-board/update?id=${selected._id}`)}
                    className="flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Notice
                  </Button>
                  <Button
                    onClick={() => setSelected(null)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Dialog open onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Notice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Delete Notice?</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Are you sure you want to delete "<b>{deleteConfirm.title}</b>"? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
                  Delete Notice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
