export interface Attachment {
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
}

export interface Notice {
  _id: string;
  noticeTitle: string;
  noticeType: string;
  targetDepartments: string;
  publishDate: string;
  noticeBody: string;
  attachments: Attachment[];
  status: "Draft" | "Published" | "Unpublished";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export interface RootState {
  noticeApi: any; // RTK Query API state
  auth: {
    user: AuthUser | null;
    token: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
  userApi: any; // RTK Query API state
  adminApi: any; // RTK Query API state
}

export type AppDispatch = any;
