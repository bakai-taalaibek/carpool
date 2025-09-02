import {
  RidePostCreateDto,
  RidePostFullDto,
  RidePostPagedResponse,
  RidePostQueryParameters,
} from "../types/ridePost";
import { api } from "./api";

export const ridePostsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRidePosts: build.query<RidePostPagedResponse, RidePostQueryParameters>({
      query: (params) => ({
        url: "rideposts",
        params,
      }),
      providesTags: ["RidePost"],
    }),
    getRidePostById: build.query<RidePostFullDto, number>({
      query: (id) => `rideposts/${id}`,
      providesTags: ["RidePost"],
    }),
    createRidePost: build.mutation<RidePostFullDto, RidePostCreateDto>({
      query: (body) => ({
        url: "rideposts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RidePost"],
    }),
    updateRidePost: build.mutation<RidePostFullDto, RidePostFullDto>({
      query: (body) => ({
        url: "rideposts",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RidePost"],
    }),
    deleteRidePost: build.mutation<void, number>({
      query: (id) => ({
        url: `rideposts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RidePost"],
    }),
  }),
});

export const {
  useGetRidePostsQuery,
  useGetRidePostByIdQuery,
  useCreateRidePostMutation,
  useUpdateRidePostMutation,
  useDeleteRidePostMutation,
} = ridePostsApi;
