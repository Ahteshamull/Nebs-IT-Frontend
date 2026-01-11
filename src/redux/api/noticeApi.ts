import { baseApi } from "./baseApi";
import type { Notice } from "../types";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useCreateNoticeMutation, useCreateDraftNoticeMutation } = noticeApi;
