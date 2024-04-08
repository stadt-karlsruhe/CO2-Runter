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

        console.log(newText);
        console.log(newValue);

        questions.value.category[categoryIndex].questions[
            questionIndex
        ].selected.text = newText;
        questions.value.category[categoryIndex].questions[
            questionIndex
        ].selected.value = newValue;

        console.log(
            questions.value.category[categoryIndex].questions[questionIndex]
        );
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
    };
}
