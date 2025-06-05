import { CountryFullDto } from "./country";

export type RegionFullDto = {
    id: number,
    name: string,
    country: CountryFullDto | null,
}
