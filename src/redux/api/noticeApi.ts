import { baseApi } from "./baseApi";
import type { Notice } from "../types";

type GetAllNoticesParams = {
  page?: number;
  limit?: number;
  status?: string;
  noticeType?: string;
  targetDepartments?: string;
  search?: string;
};

type UpdateNoticeArgs = {
  id: string;
  body: Partial<Notice> | FormData;
};

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNoticeById: builder.query<{ success: boolean; data: Notice }, string>({
      query: (id) => ({
        url: `/notice/${id}`,
        method: "GET",
      }),
      providesTags: ["Notice"],
    }),

    getAllNotices: builder.query<
      {
        success: boolean;
        data: Notice[];
        pagination?: {
          currentPage: number;
          totalPages: number;
          totalNotices: number;
          hasNext: boolean;
          hasPrev: boolean;
        };
      },
      GetAllNoticesParams | void
    >({
      query: (params) => ({
        url: "/notice/all",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: ["Notice"],
    }),

    createNotice: builder.mutation<{ success: boolean; message: string; data: Notice }, FormData>({
      query: (formData) => ({
        url: "/notice/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Notice"],
    }),

    createDraftNotice: builder.mutation<
      { success: boolean; message: string; data: Notice },
      FormData
    >({
      query: (formData) => ({
        url: "/notice/create-draft",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Notice"],
    }),

    deleteNotice: builder.mutation<{ success: boolean; message?: string }, string>({
      query: (id) => ({
        url: `/notice/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notice"],
    }),

    updateNotice: builder.mutation<
      { success: boolean; message?: string; data?: Notice },
      UpdateNoticeArgs
    >({
      query: ({ id, body }) => ({
        url: `/notice/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notice"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNoticeByIdQuery,
  useGetAllNoticesQuery,
  useCreateNoticeMutation,
  useCreateDraftNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeMutation,
} = noticeApi;
