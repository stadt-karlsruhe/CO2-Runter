export interface Questionnaire {
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
    selectedValue: number;
    formula: string;
}

interface Replies {
    text: string;
    value: number;
}
