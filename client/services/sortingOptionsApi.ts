import { SortingOptions } from "../types/sortingOptions";
import { api } from "./api";

export const sortingOptionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSortingOptions: build.query<SortingOptions, void>({
      query: () => "sortingoptions",
    }),
  }),
});

export const { useGetSortingOptionsQuery } = sortingOptionsApi;
