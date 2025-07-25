import { UserFullDto } from "./user";

export interface LoginRequestDto {
  identifier: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserFullDto;
  expiresAt: string;
}
