import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./authSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
