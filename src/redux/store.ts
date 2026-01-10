import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "./types";
import { noticeApi } from "./slices/noticeSlice";
import authReducer from "./slices/authSlice";
import { userApi } from "./slices/userSlice";
import { adminApi } from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    noticeApi: noticeApi.reducer,
    auth: authReducer,
    userApi: userApi.reducer,
    adminApi: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    })
      .concat(noticeApi.middleware)
      .concat(userApi.middleware)
      .concat(adminApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
