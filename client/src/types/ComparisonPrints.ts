type ValueType = {
    category: string;
    value: number;
};

export type DataType = {
    name: string;
    values: ValueType[];
};

export type ComparisonPrints = DataType[];
