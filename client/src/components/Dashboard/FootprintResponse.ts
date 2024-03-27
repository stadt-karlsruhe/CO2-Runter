import { DistrictFootprint } from '@/components/Dashboard/DistrictFootprint';

export interface FootprintResponse {
    consume: DistrictFootprint[];
    housing: DistrictFootprint[];
    mobility: DistrictFootprint[];
    nutrition: DistrictFootprint[];
}
