"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Upload, X, Plus } from "lucide-react";

import { useCreateDraftNoticeMutation, useCreateNoticeMutation } from "@/redux/api/noticeApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* ================= TYPES ================= */

interface CreateNoticeFormData {
  targetDepartments: string;
  noticeTitle: string;
  employeeId: string;
  employeeName: string;
  position: string;
  noticeType: string;
  publishDate: Date | null;
  noticeBody: string;
  attachments: File[];
}

/* ================= CONSTANTS ================= */

const noticeTypes = [
  "General / Company-Wide",
  "Holiday & Event",
  "HR & Policy Update",
  "Finance & Payroll",
  "Warning / Disciplinary",
  "Emergency / Urgent",
  "IT / System Maintenance",
  "Department / Team",
];

const departments = [
  "All Department",
  "Finance",
  "Sales Team",
  "HR",
  "Web Team",
  "Database Team",
  "Marketing",
  "Operations",
  "Individual",
];

/* ================= PAGE ================= */

export default function CreateNoticePage() {
  const router = useRouter();

  const [createNotice, { isLoading: isCreating }] = useCreateNoticeMutation();
  const [createDraftNotice, { isLoading: isCreatingDraft }] = useCreateDraftNoticeMutation();

  const isLoading = isCreating || isCreatingDraft;

  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState<CreateNoticeFormData>({
    targetDepartments: "",
    noticeTitle: "",
    employeeId: "",
    employeeName: "",
    position: "",
    noticeType: "",
    publishDate: null,
    noticeBody: "",
    attachments: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ================= HANDLERS ================= */

  const handleInputChange = (field: keyof CreateNoticeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (saveAsDraft: boolean) => {
    setIsSubmitting(true);
    try {
      alert(saveAsDraft ? "Draft save start..." : "Publishing notice... Please wait");

      console.log("[CreateNotice] submit clicked", {
        saveAsDraft,
        targetDepartments: formData.targetDepartments,
        noticeTitle: formData.noticeTitle,
        employeeId: formData.employeeId,
        employeeName: formData.employeeName,
        position: formData.position,
        noticeType: formData.noticeType,
        publishDate: formData.publishDate,
        noticeBodyLength: formData.noticeBody?.length,
        attachmentsCount: formData.attachments.length,
        attachments: formData.attachments.map((f) => ({
          name: f.name,
          type: f.type,
          size: f.size,
        })),
      });

      if (
        !formData.noticeTitle ||
        !formData.noticeType ||
        !formData.targetDepartments ||
        !formData.noticeBody
      ) {
        console.error("Missing required fields");
        alert("Required field missing.");
        return;
      }

      const apiFormData = new FormData();

      apiFormData.append("targetDepartments", formData.targetDepartments);
      apiFormData.append("noticeTitle", formData.noticeTitle);
      apiFormData.append("employeeId", formData.employeeId);
      apiFormData.append("employeeName", formData.employeeName);
      apiFormData.append("position", formData.position);
      apiFormData.append("noticeType", formData.noticeType);
      apiFormData.append("publishDate", formData.publishDate.toISOString());
      apiFormData.append("noticeBody", formData.noticeBody);
      apiFormData.append("status", saveAsDraft ? "Draft" : "Published");

      formData.attachments.forEach((file) => {
        apiFormData.append("attachments", file);
      });

      console.log("[CreateNotice] FormData preview:");
      apiFormData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(`  ${key}: [File]`, { name: value.name, type: value.type, size: value.size });
        } else {
          console.log(`  ${key}:`, value);
        }
      });

      if (saveAsDraft) {
        await createDraftNotice(apiFormData).unwrap();
        alert("Draft saved successfully ✅");
      } else {
        await createNotice(apiFormData).unwrap();
        alert("Notice published successfully ✅");
      }

      if (saveAsDraft) {
        router.push("/notice-board");
      } else {
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      const status = err?.status;
      const message = err?.data?.message || err?.error || err?.message || "Failed to create notice";
      console.error("Create notice failed:", { status, err });
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      targetDepartments: "",
      noticeTitle: "",
      employeeId: "",
      employeeName: "",
      position: "",
      noticeType: "",
      publishDate: null,
      noticeBody: "",
      attachments: [],
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      {isMounted ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">Create a Notice</h1>
              <p className="text-sm text-gray-500">Create and publish a new notice</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/notice-board")}>
              Cancel
            </Button>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="rounded-lg border bg-white p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* LEFT */}
                <div className="space-y-6">
                  <div>
                    <Label>Target Department / Individual *</Label>
                    <select
                      className="mt-2 h-12 w-full rounded border px-3"
                      value={formData.targetDepartments}
                      onChange={(e) => handleInputChange("targetDepartments", e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Notice Title *</Label>
                    <Input
                      className="mt-2 h-12"
                      value={formData.noticeTitle}
                      onChange={(e) => handleInputChange("noticeTitle", e.target.value)}
                      placeholder="Enter notice title..."
                      required
                    />
                  </div>

                  <div>
                    <Label>Employee ID *</Label>
                    <Input
                      className="mt-2 h-12"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      placeholder="Enter employee ID..."
                      required
                    />
                  </div>

                  <div>
                    <Label>Employee Name *</Label>
                    <Input
                      className="mt-2 h-12"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange("employeeName", e.target.value)}
                      placeholder="Enter employee name..."
                      required
                    />
                  </div>

                  <div>
                    <Label>Position *</Label>
                    <Input
                      className="mt-2 h-12"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="Enter position..."
                      required
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                  <div>
                    <Label>Notice Type *</Label>
                    <select
                      className="mt-2 h-12 w-full rounded border px-3"
                      value={formData.noticeType}
                      onChange={(e) => handleInputChange("noticeType", e.target.value)}
                      required
                    >
                      <option value="">Select Type</option>
                      {noticeTypes.map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Publish Date *</Label>
                    <button
                      type="button"
                      className="mt-2 flex h-12 w-full items-center rounded border px-4"
                      onClick={() => setShowCalendar(!showCalendar)}
                      required
                    >
                      <CalendarDays className="mr-2 h-5 w-5" />
                      {isMounted && formData.publishDate
                        ? formData.publishDate.toLocaleDateString()
                        : "Select date"}
                    </button>

                    {showCalendar && (
                      <div className="mt-2 rounded border bg-white">
                        <Calendar
                          mode="single"
                          selected={formData.publishDate}
                          onSelect={(d) => {
                            handleInputChange("publishDate", d);
                            setShowCalendar(false);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Notice Body *</Label>
                    <Textarea
                      className="mt-2 min-h-[200px]"
                      value={formData.noticeBody}
                      onChange={(e) => handleInputChange("noticeBody", e.target.value)}
                      placeholder="Enter notice content..."
                      required
                    />
                  </div>

                  <div>
                    <Label>Attachments</Label>
                    <div className="mt-2 rounded border-2 border-dashed p-6 text-center">
                      <input
                        id="upload"
                        type="file"
                        required
                        multiple
                        hidden
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="upload">
                        <Upload className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                        <span className="text-sm text-gray-600">Click to upload</span>
                      </label>
                    </div>

                    {formData.attachments.map((f, i) => (
                      <div key={i} className="mt-2 flex justify-between rounded bg-gray-50 p-2">
                        <span className="truncate text-sm">{f.name}</span>
                        <Button size="icon" variant="ghost" onClick={() => removeAttachment(i)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex justify-end gap-4 border-t pt-6">
                <Button variant="outline" onClick={() => router.push("/notice-board")}>
                  Cancel
                </Button>

                <Button
                  variant="outline"
                  disabled={isSubmitting || isLoading}
                  onClick={() => handleSubmit(true)}
                >
                  Save as Draft
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || isLoading}
                  onClick={() => handleSubmit(false)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Notice
                </Button>
              </div>
            </div>
          </div>

          {/* SUCCESS MODAL ONLY */}
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="max-w-lg p-8 text-center">
              <DialogHeader>
                <DialogTitle>Notice Published Successfully</DialogTitle>
              </DialogHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
                ✓
              </div>
              <h2 className="text-xl font-semibold">Notice Published Successfully</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Your notice <b>{formData.noticeTitle || "Untitled"}</b> has been published.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => router.push("/notice-board")}>
                  View Notice
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    setShowSuccessModal(false);
                    resetForm();
                  }}
                >
                  + Create Another
                </Button>
                <Button variant="outline" onClick={() => router.push("/notice-board")}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div
          suppressHydrationWarning
          className="flex min-h-screen items-center justify-center bg-gray-50"
        >
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-gray-300 border-t-transparent"></div>
          </div>
        </div>
      )}
    </div>
  );
}
