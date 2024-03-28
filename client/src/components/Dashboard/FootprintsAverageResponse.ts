export interface FootprintResponse {
    consume: categoryFootprint;
    housing: categoryFootprint;
    mobility: categoryFootprint;
    nutrition: categoryFootprint;
}

export interface categoryFootprint {
    category: string;
    value: number;
}
