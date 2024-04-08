export interface Questionnaire {
    baseline: number;
    category: Category[];
    endFormula: string;
}

export interface Category {
    name: string;
    questions: Question[];
    formula: '';
}

interface Question {
    text: string;
    replies: Replies[];
    selected: Replies;
    formula: string;
}

export interface Replies {
    text: string;
    value: number;
}
