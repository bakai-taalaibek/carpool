import { LocalityFullDto } from "../types/locality";
import { api } from "./api";

export const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLocalities: build.query<LocalityFullDto[], void>({
      query: () => "localities",
    }),
  }),
  overrideExisting: false,
});

export const { useGetLocalitiesQuery } = gameApi;
