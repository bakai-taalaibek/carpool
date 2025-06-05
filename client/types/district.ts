import { RegionFullDto } from "./region";

export type DistrictFullDto = {
    id: number,
    name: string,
    region: RegionFullDto | null,
}
