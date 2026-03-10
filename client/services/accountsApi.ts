import { LoginRequestDto, LoginResponseDto } from "../types/login";
import { ForgotPasswordRequest } from "../types/passwordReset";
import { RegisterRequestDto, RegisterResponseDto } from "../types/register";
import { VerificationRequestDto } from "../types/verification";
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
    verifyEmail: build.mutation<RegisterResponseDto, VerificationRequestDto>({
      query: (body) => ({
        url: "accounts/verify-email",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: build.mutation<void, ForgotPasswordRequest>({
      query: (body) => ({
        url: "accounts/forgot-email",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSentTokenMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
} = accountsApi;
