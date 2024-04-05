export interface Questionnaire {
    category: Category[];
}

export interface Category {
    name: string;
    questions: Question[];
}

interface Question {
    text: string;
    replies: Replies[];
    selectedValue: number;
}

interface Replies {
    text: string;
    value: number;
}
