export type RidePostFullDto = RidePostCreateDto & {
  id: number;
  dateCreated: string;
  dateModified: string;
};

export type RidePostCreateDto = {
  userId?: string;
  rideRoleId: number;
  sourceId?: number;
  destinationId?: number;
  departureDateTime: string;
  seats?: number;
  pricePerSeat?: number;
  pricePerCar?: number;
  comment: string;
  anonName: string;
  anonPhone: string;
  anonCar: string;
};

export type RidePostQueryParameters = {
  postAuthorRoleId?: number;
  onlyOwnPosts?: boolean;
  sourceId?: number;
  destinationId?: number;
  minPrice?: number;
  maxPrice?: number;
  departureStartDateTime?: string; // ISO string
  departureEndDateTime?: string; // ISO string
  minSeats?: number; // default is 1
  maxSeats?: number;
  authorName?: string;
  authorPhoneNumber?: string;
  authorComment?: string;
  sort?: RidePostSortOption; // value should match one of the server-supported sort keys
  page?: number; // default is 1
  pageSize?: number; // default is 20
};
export type RidePostSortOption = "newest" | "oldest" | "cheapest" | "mostExpensive";

export type RidePostPagedResponse = {
  posts: RidePostFullDto[];
  totalPages: number;
  currentPage: number;
};
