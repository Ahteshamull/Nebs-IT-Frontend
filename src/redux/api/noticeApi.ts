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

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const { useGetAllNoticesQuery, useCreateNoticeMutation, useCreateDraftNoticeMutation } =
  noticeApi;
