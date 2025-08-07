import { RideRoleFullDto, RideRoleName } from "../types/rideRole";
import { api } from "./api";

export const rideRolesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRideRoles: build.query<
      {
        rideRoles: RideRoleFullDto[];
        rideRoleIdToNameMap: Record<number, RideRoleName>;
        rideRoleNameToIdMap: Record<RideRoleName, number>;
      },
      void
    >({
      query: () => "rideroles",
      transformResponse: (rideRoles: RideRoleFullDto[]) => {
        const rideRoleIdToNameMap: Record<number, RideRoleName> = {};
        const rideRoleNameToIdMap: Record<RideRoleName, number> = {} as Record<
          RideRoleName,
          number
        >;

        for (const role of rideRoles) {
          rideRoleIdToNameMap[role.id] = role.name;
          rideRoleNameToIdMap[role.name] = role.id;
        }

        return { rideRoles, rideRoleIdToNameMap, rideRoleNameToIdMap };
      },
    }),
  }),
});

export const { useGetRideRolesQuery } = rideRolesApi;
