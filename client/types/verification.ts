export type VerificationRequestDto = {
  userId: string;
  token: string;
};

export type RequestEmailVerificationDto = {
  email?: string;
  userId?: string | null;
};
