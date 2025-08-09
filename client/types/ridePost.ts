export type RidePostFullDto = RidePostCreateDto & {
  id: number;
  userId: string;
  guestId: string
  dateCreated: string;
  dateModified: string;
};

export type RidePostCreateDto = {
  rideRoleId?: number;
  sourceId?: number;
  destinationId?: number;
  departureDateTime?: string;
  seats?: number;
  pricePerSeat?: number;
  pricePerCar?: number;
  comment: string;
  anonName: string;
  anonPhone: string;
  anonCar: string;
};

export type RidePostQueryParameters = {
  ridePostAuthorRoleId?: number;
  onlyOwnRidePosts?: boolean;
  sourceId?: number;
  destinationId?: number;
  minPrice?: number;
  maxPrice?: number;
  departureStartDateTime?: string;
  departureEndDateTime?: string;
  minSeats?: number; // default is 1
  maxSeats?: number;
  authorName?: string;
  authorPhoneNumber?: string;
  authorComment?: string;
  sort?: string; // value should match one of the server-supported sort keys
  page?: number; // default is 1
  pageSize?: number; // default is 20
};

export type RidePostPagedResponse = {
  ridePosts: RidePostFullDto[];
  totalPages: number;
  currentPage: number;
};
