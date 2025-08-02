import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserFullDto } from "../types/user";

interface AuthState {
  token: string | null;
  user: UserFullDto | null;
  expiresAt: string | null;
  guestId: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  expiresAt: null,
  guestId: null
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
      state.guestId = null;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.expiresAt = null;
    },
    setGuest: (state, action) => {
      state.guestId = action.payload;
      state.token = null;
      state.user = null;
      state.expiresAt = null;
    },
  },
});

export const { setCredentials, clearCredentials, setGuest } = authSlice.actions;
export default authSlice.reducer;
