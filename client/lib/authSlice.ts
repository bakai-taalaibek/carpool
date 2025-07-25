import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFullDto } from "../types/user";

interface AuthState {
  token: string | null;
  user: UserFullDto | null;
  expiresAt: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  expiresAt: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: UserFullDto; expiresAt?: string }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.expiresAt = action.payload.expiresAt ?? null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.expiresAt = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
