export type ReviewFullDto = {
    id: number,
    userId?: number,
    text: string,
    anonEmail?: string
}

export type ReviewCreateDto = {
    userId?: number,
    text: string,
    anonEmail?: string
}