import { LoginRequestDto, LoginResponseDto } from "../types/login";
import { RegisterRequestDto, RegisterResponseDto } from "../types/register";
import { api } from "./api";

export const gameApi = api.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: "accounts/login",
        method: "POST",
        body,
      }),
    }),
    postRegister: build.mutation<RegisterResponseDto, RegisterRequestDto>({
      query: (body) => ({
        url: "accounts/register",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { usePostLoginMutation, usePostRegisterMutation } = gameApi;
