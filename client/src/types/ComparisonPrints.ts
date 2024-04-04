type ValueType = {
    category: string;
    value: number;
};

type DataType = {
    name: string;
    values: ValueType[];
};

export type ComparisonPrints = DataType[];
