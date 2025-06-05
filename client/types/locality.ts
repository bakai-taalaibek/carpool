import { DistrictFullDto } from "./district";

export type LocalityFullDto = {
    id: number,
    name: string,
    oldName?: string | null,
    district: DistrictFullDto | null,
}
