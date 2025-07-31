import { LocalityFullDto } from "../types/locality";
import { api } from "./api";

export const localitiesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLocalities: build.query<LocalityFullDto[], void>({
      query: () => "localities",
    }),
  }),
});

export const { useGetLocalitiesQuery } = localitiesApi;
