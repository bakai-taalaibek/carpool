import { CommentCreateDto, CommentFullDto, CommentWithUserInfoDto } from "../types/comment";
import { api } from "./api";

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<CommentFullDto[], void>({
      query: () => "comments",
      providesTags: ["Comment"],
    }),
    getCommentsByRidePostId: build.query<CommentWithUserInfoDto[], number>({
      query: (ridePostId: number) => `comments/post/${ridePostId}`,
      providesTags: ["Comment"],
    }),
    createComment: build.mutation<CommentFullDto, CommentCreateDto>({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: build.mutation<CommentFullDto, CommentFullDto>({
      query: (body) => ({
        url: "comments",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: build.mutation<void, number>({
      query: (commentId: number) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentsByRidePostIdQuery,
  useLazyGetCommentsByRidePostIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
