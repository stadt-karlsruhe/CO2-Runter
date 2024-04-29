// example of a pinia store to handle your questions
import { defineStore } from 'pinia';
import { Questionnaire } from '@/types/Questionnaire';

export const useQuestionStore = defineStore({
    id: 'questions',
    // Der Store hat immer die aktuelle JSON-Struktur der Fragen
    state: () => ({
        baseline: 1.12,
        category: [
            {
                name: '',
                questions: [
                    {
                        text: '',
                        replies: [
                            {
                                text: '',
                                value: 0.0,
                            },
                        ],
                        selected: {
                            text: '',
                            value: 0.0,
                        },
                        formula: '',
                    },
                ],
                formula: '',
            },
        ],
        endFormula: '',
    }),
    actions: {
        setQuestions(newQuestions: Questionnaire) {
            this.baseline = newQuestions.baseline;
            this.category = newQuestions.category;
            this.endFormula = newQuestions.endFormula;
        },
    },
});
