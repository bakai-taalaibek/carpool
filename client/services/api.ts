import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../lib/store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5011/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      const guestId = (getState() as RootState).auth.guestId;
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (guestId) {
        headers.set("X-Guest-Id", guestId);
      }

      return headers;
    },
  }),
  tagTypes: ["RidePost", "Comment"],
  endpoints: () => ({}),
});
