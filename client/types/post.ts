import { LocalityFullDto } from "./locality";
import { RideRoleFullDto } from "./rideRole";

export type PostFullDto = {
  id: number;
  userId?: number | null;
  rideRoleId: number;
  sourceId: number;
  destinationId: number;
  departureDateTime: string; // ISO format date string
  seats: number;
  pricePerSeat?: number | null;
  pricePerCar?: number | null;
  comment?: string | null;
  dateCreated: string; // ISO format date string
  dateModified: string; // ISO format date string
  anonName?: string | null;
  anonPhone?: string | null;
  anonCar?: string | null;
  rideRole?: RideRoleFullDto | null;
  source?: LocalityFullDto | null;
  destination?: LocalityFullDto | null;
};

export type PostCreateDto = {
    userId?: number,
    text: string,
    anonEmail?: string
}
