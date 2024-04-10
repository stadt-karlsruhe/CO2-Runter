export interface DistrictFootprint {
    name: string;
    total: number;
}

export interface FootprintResponse {
    consume: DistrictFootprint[];
    housing: DistrictFootprint[];
    mobility: DistrictFootprint[];
    nutrition: DistrictFootprint[];
}

export interface FootprintEmissionPerCategory {
    category: string;
    value: number;
}

export interface AverageCo2Emissions
    extends Array<FootprintEmissionPerCategory> {}

export interface GroupCo2FootprintEmissions {
    name: string;
    values: FootprintEmissionPerCategory[];
}

export interface Co2ComparisonFootprints
    extends Array<GroupCo2FootprintEmissions> {}
