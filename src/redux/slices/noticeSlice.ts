import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Attachment, Notice } from "../types.js";

export const noticeApi = createApi({
  reducerPath: "noticeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/notice",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Notice"],
  endpoints: (builder) => ({
    // Create notice
    createNotice: builder.mutation<Notice, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Notice"],
    }),

    // Get all notices
    getAllNotices: builder.query<
      {
        data: Notice[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalNotices: number;
          hasNext: boolean;
          hasPrev: boolean;
        };
      },
      {
        page?: number;
        limit?: number;
        status?: string;
        noticeType?: string;
        targetDepartments?: string;
        search?: string;
      }
    >({
      query: (params) => ({
        url: "/all",
        params,
      }),
      providesTags: ["Notice"],
    }),

    // Get notice by ID
    getNoticeById: builder.query<Notice, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Notice", id }],
    }),

    // Update notice
    updateNotice: builder.mutation<Notice, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Notice", id }],
    }),

    // Delete notice
    deleteNotice: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Notice", id }],
    }),

    // Update notice status
    updateNoticeStatus: builder.mutation<Notice, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/status/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Notice", id }],
    }),
  }),
});

// Export hooks
export const {
  useCreateNoticeMutation,
  useGetAllNoticesQuery,
  useGetNoticeByIdQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeStatusMutation,
} = noticeApi;
