import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Admin } from "../types.js";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/admin",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    // Create admin
    createAdmin: builder.mutation<Admin, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Admin"],
    }),

    // Get all admins
    getAllAdmins: builder.query<
      {
        data: Admin[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalAdmins: number;
          hasNext: boolean;
          hasPrev: boolean;
        };
      },
      {
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      query: (params) => ({
        url: "/all",
        params,
      }),
      providesTags: ["Admin"],
    }),

    // Get admin by ID
    getAdminById: builder.query<Admin, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),

    // Update admin
    updateAdmin: builder.mutation<Admin, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Admin", id }],
    }),

    // Delete admin
    deleteAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Admin", id }],
    }),
  }),
});

// Export hooks
export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
