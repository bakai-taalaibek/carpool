import { ReviewCreateDto, ReviewFullDto } from "../types/review";
import { api } from "./api";

export const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<ReviewFullDto[], void>({
      query: () => "reviews",
    }),
    postReview: build.mutation<ReviewFullDto, ReviewCreateDto>({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetReviewsQuery, usePostReviewMutation } = gameApi;
