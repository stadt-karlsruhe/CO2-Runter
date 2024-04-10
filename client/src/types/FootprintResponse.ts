import { DistrictFootprint } from '@/types/DistrictFootprint';

export interface FootprintResponse {
    consume: DistrictFootprint[];
    housing: DistrictFootprint[];
    mobility: DistrictFootprint[];
    nutrition: DistrictFootprint[];
}
