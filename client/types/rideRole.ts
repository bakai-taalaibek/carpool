export type RideRoleFullDto = {
  id: number;
  name: RideRoleName;
};
export enum RideRoleName {
  Driver = "Driver",
  Passenger = "Passenger",
}
export enum RideRoleNameRu {
  Driver = "Водитель",
  Passenger = "Пассажир"
}
export const rideRoleNameToRuNameMap = {
  [RideRoleName.Driver]: "Водитель",
  [RideRoleName.Passenger]: "Пассажир",
};
