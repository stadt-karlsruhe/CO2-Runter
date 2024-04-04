export interface Questionnaire {
    baseline: number;
    category: Category[];
}

interface Category {
    name: string;
    questions: Question[];
}

interface Question {
    name: string;
    quick: Quick;
    detailed: Detailed;
}

interface Common {
    text: string;
    typ: string;
    defaultValue: number;
    selectedValue: string;
}

interface Quick extends Common {
    replies?: string[];
    values: number[];
}

interface Input extends Common {
    unit: string;
    formula: string;
    minInput?: number;
    maxInput: number;
}

interface Detailed {
    questions: Input[];
    formula: string;
}
