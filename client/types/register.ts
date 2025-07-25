export type RegisterRequestDto = {
    email?: string;
    phoneNumber?: string;
    password: string;
};

export type RegisterResponseDto = {
    message: string;
};