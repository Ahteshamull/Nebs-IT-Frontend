import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types.js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/users",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query<
      {
        data: User[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalUsers: number;
          hasNext: boolean;
          hasPrev: boolean;
        };
      },
      {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
      }
    >({
      query: (params) => ({
        url: "/all",
        params,
      }),
      providesTags: ["User"],
    }),

    // Get user by ID
    getUserById: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Update user
    updateUser: builder.mutation<User, { id: string; userData: Partial<User> }>({
      query: ({ id, userData }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

// Export hooks
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
