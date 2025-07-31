import { ReviewCreateDto, ReviewFullDto } from "../types/review";
import { api } from "./api";

export const reviewsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<ReviewFullDto[], void>({
      query: () => "reviews",
    }),
    createReview: build.mutation<ReviewFullDto, ReviewCreateDto>({
      query: (body) => ({
        url: "reviews",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewsApi;
