import { LoginRequestDto, LoginResponseDto } from "../types/login";
import { RegisterRequestDto, RegisterResponseDto } from "../types/register";
import { api } from "./api";

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: "accounts/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: build.mutation<RegisterResponseDto, RegisterRequestDto>({
      query: (body) => ({
        url: "accounts/register",
        method: "POST",
        body,
      }),
    }),
    sentToken: build.mutation<LoginResponseDto, string>({
      query: (token) => ({
        url: "accounts/auth",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSentTokenMutation,
} = accountsApi;
