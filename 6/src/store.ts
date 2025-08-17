import { configureStore } from "@reduxjs/toolkit";
import { staticsApi } from "./api";

export const store = configureStore({
  reducer: {
    [staticsApi.reducerPath]: staticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(staticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
