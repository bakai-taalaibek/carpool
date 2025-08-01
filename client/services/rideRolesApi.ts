import { RideRoleFullDto } from "../types/rideRole";
import { api } from "./api";

export const rideRolesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRideRoles: build.query<RideRoleFullDto[], void>({
      query: () => "rideroles",
    }),
  }),
});

export const { useGetRideRolesQuery } = rideRolesApi;
