import { ref, onMounted } from 'vue';
import { Questionnaire, Replies } from '@/types/Questionnaire';

export default function useQuestions() {
    const loading = ref(false);
    const questions = ref<Questionnaire>({
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
    });
    const error = ref<string | null>(null);

    const fetchQuestions = async () => {
        try {
            loading.value = true;
            const response = await fetch('/api/questions');

            if (!response.ok) {
                throw new Error('HTTP error, status ' + response.status);
            }

            const data: Questionnaire = await response.json();
            localStorage.setItem('CO2questions', JSON.stringify(data));
            questions.value = data;
            loading.value = false;
        } catch (err: unknown) {
            console.error('Fragen nicht gefunden!', err);
            error.value = 'Es ist ein Fehler aufgetreten!';
            loading.value = false;
        }
    };

    const updateSelectedValue = (
        categoryIndex: number,
        questionIndex: number,
        selectedValue: Replies
    ) => {
        const newText = selectedValue.text;
        const newValue = selectedValue.value;

        questions.value.category[categoryIndex].questions[
            questionIndex
        ].selected.text = newText;
        questions.value.category[categoryIndex].questions[
            questionIndex
        ].selected.value = newValue;
    };

    const calculateEmission = (currentValue: number) => {
        const categoryValues: number[] = [];
        questions.value.category.forEach((category) => {

            const questionValues: number[] = [];

            category.questions.forEach((question) => {

                let value = question.selected.value;

                // Formel von der Frage berechnen
                if(question.formula) {
                    const evalQuestionFormula = new Function('return ' + question.formula)();
                    value = evalQuestionFormula(value);
                }

                questionValues.push(value);
            });

            // Formel von der Kategorie berechnen
            const evalCategoryFormula = new Function('return ' + category.formula)();
            console.log(evalCategoryFormula(questionValues));
            categoryValues.push(evalCategoryFormula(questionValues));
        });

        // console.log(categoryValues)
        // Formel von allem Berechnen
        return categoryValues[0] * categoryValues[1] * categoryValues[2] * categoryValues[3]
    };

    onMounted(async () => {
        await fetchQuestions();
    });

    return {
        fetchQuestions,
        updateSelectedValue,
        loading: loading,
        questions: questions,
        error: error,
        calculateEmission,
    };
}
